// Fallback for using MaterialIcons on Android and web.

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<
  SymbolViewProps["name"],
  ComponentProps<typeof MaterialCommunityIcons>["name"]
>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "map.fill": "map",
  "list.bullet": "format-list-bulleted",
  "person.crop.circle.fill": "account-circle",
  "location.fill": "navigation-variant",
  "banknote.fill": "cash",
  "chevron.right": "chevron-right",
  checkmark: "check",
  magnifyingglass: "magnify",
  pencil: "pencil",
  "exclamationmark.triangle": "alert-outline",
  "questionmark.circle": "crosshairs-question",
  "rectangle.portrait.and.arrow.right": "logout",
  "ev.charger.fill": "ev-station",
  "ev.plug.ac.type.2.fill": "ev-plug-type2",
  "ev.plug.dc.chademo.fill": "ev-plug-chademo",
  "ev.plug.dc.ccs2.fill": "ev-plug-ccs2",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <MaterialCommunityIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
