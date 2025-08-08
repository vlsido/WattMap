import { ThemedText } from "@/components/ui/themed/ThemedText";
import { ThemedView } from "@/components/ui/themed/ThemedView";
import {
  AnimatedThemedPressable,
  AnimatedThemedText,
} from "@/constants/AnimatedComponents";
import { Colors } from "@/constants/Colors";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { FadeIn, FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ThankYou() {
  const { cost } = useLocalSearchParams();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFill,
        { top: insets.top, bottom: insets.bottom },
      ]}
    >
      <ThemedView style={[styles.container, styles.center]}>
        <View>
          <AnimatedThemedText
            style={styles.centerText}
            type={"defaultBold"}
            entering={FadeIn.duration(500)}
          >
            Thank you for using our service!
          </AnimatedThemedText>
          <AnimatedThemedText
            style={styles.centerText}
            type={"default"}
            entering={FadeIn.delay(500).duration(500)}
          >
            You will be charged with the total amount of...
          </AnimatedThemedText>
        </View>
        <AnimatedThemedText
          style={styles.centerText}
          entering={FadeIn.delay(1000).duration(500)}
          type={"title"}
        >
          €{cost}
        </AnimatedThemedText>
        <AnimatedThemedPressable
          accessibilityLabel="Navigate to location details"
          lightColor={Colors.light.buttonBackground}
          darkColor={Colors.dark.buttonBackground}
          style={[styles.button, styles.shadowMedium]}
          entering={FadeInDown.delay(2000).duration(500)}
          onPress={() => router.dismissTo("/")}
        >
          <ThemedText type="subtitle" colorType="buttonText">
            Go Back
          </ThemedText>
        </AnimatedThemedPressable>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 30,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 60,
  },
  shadowMedium: {
    elevation: 2,
    shadowColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
});
