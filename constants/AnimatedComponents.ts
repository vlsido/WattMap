import { LinearGradient } from "expo-linear-gradient";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";

export const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const AnimatedLinearGradient =
  Animated.createAnimatedComponent(LinearGradient);
