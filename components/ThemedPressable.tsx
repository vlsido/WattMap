import { Pressable, PressableProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedPressableProps = PressableProps & {
  lightColor?: string;
  darkColor?: string;
  onPress: () => void;
  type?: "background" | "border";
};

export function ThemedPressable({
  style,
  lightColor,
  darkColor,
  type = "background",
  ...otherProps
}: ThemedPressableProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, type);

  return (
    <Pressable
      style={(state) => {
        let baseStyle = {};

        if (type === "background") baseStyle = { backgroundColor: color };
        else if (type === "border")
          baseStyle = { borderWidth: 0.5, borderColor: color };

        // If style is a function, call it with state; else just use it
        const resolvedStyle =
          typeof style === "function" ? style(state) : style;

        return [baseStyle, resolvedStyle];
      }}
      {...otherProps}
    />
  );
}
