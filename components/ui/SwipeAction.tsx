import { useCallback, useMemo } from "react";
import {
  ActivityIndicator,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IconSymbol } from "./IconSymbol";
import { runOnJS } from "react-native-worklets";

interface SwipeActionProps {
  text: string;
  backgroundColor: string;
  thumbColor: string;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  thumbSize?: number;
  onSwipeEnd: () => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const DEFAULT_THUMB_SIZE = 58;

function SwipeAction(props: SwipeActionProps) {
  const { thumbSize = DEFAULT_THUMB_SIZE } = props;

  const offsetX = useSharedValue<number>(0);
  const rotate = useSharedValue<number>(0);
  const containerWidth = useSharedValue<number>(0);
  const opacity = useSharedValue<number>(1);

  const swipePanGesture = useMemo(
    () =>
      Gesture.Pan()
        .onChange((event) => {
          if (offsetX.value < 0) {
            offsetX.value = 0;
            return;
          }

          const limit = containerWidth.value - thumbSize - 4;

          if (offsetX.value > limit) {
            offsetX.value = limit;
            return;
          }

          const next = offsetX.value + event.changeX;

          if (next <= 0) {
            offsetX.value = 0;
            return;
          }

          if (next <= limit) {
            offsetX.value += event.changeX;
            return;
          }

          offsetX.value = limit;
        })
        .onEnd(() => {
          const limit = containerWidth.value - thumbSize - 4;
          if (offsetX.value >= limit) {
            opacity.value = 0;
            offsetX.value = withTiming(limit / 2, { duration: 500 }, () => {
              runOnJS(props.onSwipeEnd)();
            });
          } else {
            offsetX.value = withTiming(0, { duration: 250 });
          }
        }),
    [props.onSwipeEnd],
  );

  const containerAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      left: offsetX.value,
      opacity: opacity.value,
    };
  }, []);

  const textAnimatedStyle = useAnimatedStyle<TextStyle>(() => {
    return {
      transform: [{ translateX: offsetX.value / -2 }],
    };
  }, []);

  const thumbAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { rotate: `${rotate.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const activityIndicatorAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      transform: [{ translateX: offsetX.value }],
    };
  }, []);

  const onContainerLayout = useCallback((event: LayoutChangeEvent) => {
    containerWidth.value = event.nativeEvent.layout.width;
    if (props.onLayout) {
      props.onLayout(event);
    }
  }, []);

  return (
    <View
      pointerEvents={props.disabled ? "none" : "auto"}
      style={[
        styles.container,
        props.containerStyle,
        {
          opacity: props.disabled ? 0.5 : 1,
          height: thumbSize + 4,
        },
      ]}
      onLayout={onContainerLayout}
    >
      <Animated.View
        style={[
          containerAnimatedStyle,
          styles.fill,
          {
            backgroundColor: props.backgroundColor,
            height: thumbSize + 4,
          },
        ]}
      >
        <Animated.Text style={[textAnimatedStyle, styles.text]}>
          {props.text}
        </Animated.Text>
      </Animated.View>

      <Animated.View
        style={[
          activityIndicatorAnimatedStyle,
          styles.thumb,
          {
            backgroundColor: props.thumbColor,
            width: thumbSize,
            height: thumbSize,
          },
        ]}
      >
        <ActivityIndicator
          size={32}
          color="black"
          animating={!props.disabled}
        />
      </Animated.View>
      <GestureDetector gesture={swipePanGesture}>
        <Animated.View
          style={[
            thumbAnimatedStyle,
            styles.thumb,
            {
              backgroundColor: props.thumbColor,
              width: thumbSize,
              height: thumbSize,
            },
          ]}
        >
          <IconSymbol name="chevron.right" size={32} color="black" />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default SwipeAction;

const styles = StyleSheet.create({
  container: {
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  fill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
  },
  centerWrapper: {
    position: "absolute",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  thumb: {
    position: "absolute",
    left: 0,
    marginHorizontal: 2,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
