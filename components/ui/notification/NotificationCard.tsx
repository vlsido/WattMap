import Animated, {
  FadeInDown,
  FadeInRight,
  FadeOutDown,
  FadeOutRight,
} from "react-native-reanimated";
import { NotificationMessage } from "./types";
import { StyleSheet, Text, View } from "react-native";
import { useCallback, useState } from "react";
import { AnimatedPressable } from "@/constants/AnimatedComponents";

export interface NotificationCardProps extends NotificationMessage {
  onClose: (id: string) => void;
}

function NotificationCard(props: NotificationCardProps) {
  const [isTriggered, setIsTriggered] = useState<boolean>(false);

  const onLayout = useCallback(() => {
    setIsTriggered(true);
  }, []);

  switch (props.type) {
    case "INFO":
      return (
        <AnimatedPressable
          style={styles.infoContainer}
          entering={FadeInDown}
          exiting={FadeOutDown}
          onPress={() => props.onClose(props.id)}
        >
          <Text style={[styles.defaultText, styles.centerText]}>
            {props.text}
          </Text>
        </AnimatedPressable>
      );
    case "ERROR":
      return (
        <AnimatedPressable
          entering={FadeInRight}
          exiting={FadeOutRight}
          style={styles.errorContainer}
          onPress={() => props.onClose(props.id)}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={[
                styles.defaultBoldText,
                styles.whiteText,
                styles.centerText,
              ]}
            >
              An error has occured
            </Text>
            <Text
              style={[styles.defaultText, styles.whiteText, styles.centerText]}
            >
              {props.text}
            </Text>
          </View>
          <Animated.View
            onLayout={onLayout}
            style={[
              styles.errorSlider,
              {
                width: isTriggered ? "0%" : "100%",
                transitionProperty: ["width"],
                transitionDuration: `${props.ms / 1000}s`,
              },
            ]}
          />
        </AnimatedPressable>
      );
  }
}

export default NotificationCard;

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
  },
  defaultBoldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  smallText: {
    fontSize: 14,
  },
  centerText: {
    textAlign: "center",
  },
  whiteText: {
    color: "white",
  },
  infoContainer: {
    position: "absolute",
    backgroundColor: "white",
    maxWidth: 200,
    borderRadius: 20,
    bottom: "10%",
    alignSelf: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    zIndex: 1,
  },
  errorContainer: {
    position: "absolute",
    backgroundColor: "#ED060C",
    maxWidth: 200,
    borderRadius: 20,
    top: "10%",
    right: 10,
    alignSelf: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "black",
    zIndex: 1,
  },
  errorSlider: {
    backgroundColor: "white",
    height: 5,
  },
});
