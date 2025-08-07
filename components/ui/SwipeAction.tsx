import { useCallback, useEffect, useMemo, useRef } from "react";
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
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { IconSymbol } from "./IconSymbol";
import { runOnJS } from "react-native-worklets";
import { AnimatedPressable } from "@/constants/AnimatedComponents";

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
  const opacity = useSharedValue<number>(1);
  const containerWidth = useSharedValue<number>(0);

  const timeoutId = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutId.current);
    };
  }, []);

  const showActivity = useCallback(() => {
    "worklet";

    offsetX.value = withSpring(thumbSize * 1.5, { duration: 50 }, () => {
      offsetX.value = withSpring(0, {
        duration: 500,
        dampingRatio: 0.2,
        energyThreshold: 6e-9,
        reduceMotion: ReduceMotion.Never,
      });
    });
  }, []);

  const handleSwipeEnd = useCallback(() => {
    props.onSwipeEnd();
    timeoutId.current = setTimeout(() => {
      offsetX.value = 0;
      opacity.value = 1;
    }, 1000);
  }, [props.onSwipeEnd]);

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
          if (offsetX.value >= limit - thumbSize) {
            offsetX.value = withTiming(limit, { duration: 100 }, () => {
              opacity.value = 0;
              offsetX.value = withTiming(limit / 2, { duration: 500 }, () => {
                runOnJS(handleSwipeEnd)();
              });
            });
          } else {
            offsetX.value = withSpring(0, {
              duration: 500,
              dampingRatio: 0.2,
              energyThreshold: 6e-9,
              reduceMotion: ReduceMotion.Never,
            });
          }
        }),
    [handleSwipeEnd],
  );

  const tapGesture = useMemo(() => Gesture.Tap().onEnd(showActivity), []);

  const composedGesture = Gesture.Exclusive(swipePanGesture, tapGesture);

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
      transform: [{ translateX: offsetX.value }],
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
      <AnimatedPressable
        style={[
          containerAnimatedStyle,
          styles.fill,
          {
            backgroundColor: props.backgroundColor,
            height: thumbSize + 4,
          },
        ]}
        onPress={showActivity}
      >
        <Animated.Text style={[textAnimatedStyle, styles.text]}>
          {props.text}
        </Animated.Text>
      </AnimatedPressable>
      <View style={[styles.thumb]}>
        <Animated.View
          style={[
            activityIndicatorAnimatedStyle,
            styles.thumb,
            {
              backgroundColor: "white",
              borderWidth: 0.5,
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
      </View>
      <GestureDetector gesture={composedGesture}>
        <View
          style={[
            styles.thumb,
            {
              width: thumbSize * 2,
              height: thumbSize,
            },
          ]}
        >
          <Animated.View
            style={[
              thumbAnimatedStyle,
              styles.thumb,
              !props.disabled && styles.shadowMedium,
              {
                backgroundColor: props.thumbColor,
                width: thumbSize,
                height: thumbSize,
              },
            ]}
          >
            <IconSymbol name="chevron.right" size={32} color="black" />
          </Animated.View>
        </View>
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
    fontWeight: "600",
  },
  thumb: {
    position: "absolute",
    left: 0,
    marginHorizontal: 1,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowMedium: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
});
