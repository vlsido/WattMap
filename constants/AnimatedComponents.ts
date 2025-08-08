import { ThemedPressable } from "@/components/ui/themed/ThemedPressable";
import { ThemedText } from "@/components/ui/themed/ThemedText";
import { ThemedView } from "@/components/ui/themed/ThemedView";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);

export const AnimatedThemedView = Animated.createAnimatedComponent(ThemedView);

export const AnimatedThemedText = Animated.createAnimatedComponent(ThemedText);

export const AnimatedThemedPressable =
  Animated.createAnimatedComponent(ThemedPressable);
