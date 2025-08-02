import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export interface TextButtonProps {
  testID: string;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
  disabledBool?: boolean;
  customActivityIndicator?: React.ReactNode;
  isActivityIndicatorVisible?: boolean;
  activityIndicatorViewStyle?: StyleProp<ViewStyle>;
  activityIndicatorColor?: string;
  activityIndicatorSize?: number | "small" | "large";
  label: string;
  leftSideIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  leftSideIconSize?: number;
  leftSideIconColor?: string;
  rightSideIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  rightSideIconSize?: number;
  rightSideIconColor?: string;
  numberOfLines?: number;
}

function TextButton(props: TextButtonProps) {
  if (props.isActivityIndicatorVisible === true) {
    if (props.customActivityIndicator) {
      return props.customActivityIndicator;
    }

    return (
      <View style={props.style}>
        <ActivityIndicator
          style={props.activityIndicatorViewStyle}
          color={props.activityIndicatorColor ?? "white"}
          size={props.activityIndicatorSize ?? "small"}
        />
      </View>
    );
  }

  return (
    <Pressable
      testID={props.testID}
      style={({ pressed }) => [
        props.style,
        { paddingRight: props.leftSideIconSize },
        { paddingLeft: props.rightSideIconSize },
        { opacity: pressed ? 0.75 : 1 },
      ]}
      onPress={props.onPress}
      disabled={props.disabledBool}
      hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      accessibilityLabel={props.label}
    >
      {props.leftSideIcon && (
        <MaterialCommunityIcons
          name={props.leftSideIcon}
          size={props.leftSideIconSize}
          color={props.leftSideIconColor}
        />
      )}
      <Text
        numberOfLines={props.numberOfLines}
        ellipsizeMode="tail"
        style={props.textStyle}
      >
        {props.text}
      </Text>

      {props.rightSideIcon && (
        <MaterialCommunityIcons
          name={props.rightSideIcon}
          size={props.rightSideIconSize}
          color={props.rightSideIconColor}
        />
      )}
    </Pressable>
  );
}

export default TextButton;
