import { useThemeColor } from "@/hooks/useThemeColor";
import TextButton, { TextButtonProps } from "./ui/TextButton/TextButton";

export type ThemedViewProps = TextButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "background" | "border";
};

export function ThemedTextButton({
  style,
  lightColor,
  darkColor,
  type = "background",
  ...otherProps
}: ThemedViewProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, type);

  return (
    <TextButton
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
