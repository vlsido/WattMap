import { AnimatedPressable } from "@/constants/AnimatedComponents";
import { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { NotificationMessage } from "../../types";
import { StyleSheet, Text } from "react-native";

export interface InfoCardProps extends NotificationMessage {
  onClose: (id: string) => void;
}

function InfoCard(props: InfoCardProps) {
  return (
    <AnimatedPressable
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutDown}
      accessibilityRole={"button"}
      accessibilityLabel={"Close the notification"}
      onPress={() => props.onClose(props.id)}
    >
      <Text style={[styles.defaultText, styles.centerText]}>{props.text}</Text>
    </AnimatedPressable>
  );
}

export default InfoCard;

const styles = StyleSheet.create({
  container: {
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
  defaultText: {
    fontSize: 16,
  },
  centerText: {
    textAlign: "center",
  },
});
