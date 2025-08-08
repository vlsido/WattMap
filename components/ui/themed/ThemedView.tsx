import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "background" | "border";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, type);

  return (
    <View
      style={[
        type === "background" ? { backgroundColor: color } : undefined,
        type === "border"
          ? { borderWidth: 0.5, borderColor: color }
          : undefined,
        style,
      ]}
      {...otherProps}
    />
  );
}
