import { AnimatedPressable } from "@/constants/AnimatedComponents";
import { useEffect } from "react";
import {
  DimensionValue,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { NotificationMessage } from "../../types";

export interface ErrorCardProps extends NotificationMessage {
  onClose: (id: string) => void;
}

function ErrorCard(props: ErrorCardProps) {
  const width = useSharedValue<DimensionValue>("100%");

  useEffect(() => {
    runOnUI(() => {
      width.value = withTiming("0%", { duration: props.ms });
    })();
  }, []);

  const sliderAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      width: width.value,
    };
  });

  return (
    <AnimatedPressable
      entering={FadeInRight}
      exiting={FadeOutRight}
      style={styles.container}
      accessibilityRole={"button"}
      accessibilityLabel={"Close the notification"}
      onPress={() => props.onClose(props.id)}
    >
      <View style={{ padding: 10 }}>
        <Text
          style={[styles.defaultBoldText, styles.whiteText, styles.centerText]}
        >
          An error has occured
        </Text>
        <Text style={[styles.defaultText, styles.whiteText, styles.centerText]}>
          {props.text}
        </Text>
      </View>
      <Animated.View
        testID={"error-slider"}
        style={[sliderAnimatedStyle, styles.slider]}
      />
    </AnimatedPressable>
  );
}

export default ErrorCard;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "#ED060C",
    maxWidth: 200,
    borderRadius: 10,
    top: "10%",
    right: 10,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    zIndex: 1,
  },
  slider: {
    backgroundColor: "white",
    height: 5,
  },
  defaultText: {
    fontSize: 16,
  },
  defaultBoldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  centerText: {
    textAlign: "center",
  },
  whiteText: {
    color: "white",
  },
});
