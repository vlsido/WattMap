import Animated, {
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import ConnectorIcon from "../connector/ConnectorIcon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { IconSymbol } from "../ui/IconSymbol";
import { ThemedPressable } from "../ThemedPressable";
import { Connector, ConnectorStatus, ConnectorType } from "@/types/common";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";

interface ConnectorProps {
  id: number;
  connectorType: ConnectorType;
  status: ConnectorStatus;
  priceInCentsPerKWh: number;
  maxPowerOutputKW: number;
  isSelected: boolean;
  onSelect: (connector: Connector) => void;
}

function ConnectorView(props: ConnectorProps) {
  const scale = useSharedValue<number>(1);
  const opacity = useSharedValue<number>(1);

  const themeColors = useThemeColors();

  let statusColor = themeColors.primaryGreen;

  if (props.status === "IN USE") {
    statusColor = themeColors.inUse;
  } else if (props.status === "UNAVAILABLE") {
    statusColor = themeColors.primaryRed;
  }

  useEffect(() => {
    if (props.status === "AVAILABLE") {
      runOnUI(() => {
        scale.value = withRepeat(withTiming(0.9, { duration: 1000 }), 0, true);
        opacity.value = withRepeat(
          withTiming(0.5, { duration: 1000 }),
          0,
          true,
        );
      })();
    }
  }, []);

  const pingAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <ThemedPressable
      style={[
        styles.connector,
        styles.gap,
        styles.shadowMedium,
        props.status !== "AVAILABLE" && { opacity: 0.75 },
        props.isSelected && {
          borderWidth: 0.5,
          borderColor: themeColors.border,
        },
      ]}
      accessibilityRole="button"
      disabled={props.status !== "AVAILABLE"}
      onPress={() =>
        props.onSelect({
          id: props.id,
          connectorType: props.connectorType,
          status: props.status,
          priceInCentsPerKWh: props.priceInCentsPerKWh,
          maxPowerOutputKW: props.maxPowerOutputKW,
        })
      }
    >
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View style={[styles.row, styles.gap]}>
          <View
            style={{
              height: 24,
              width: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Animated.View
              style={[
                styles.ellipse,
                pingAnimatedStyle,
                {
                  backgroundColor: statusColor,
                },
              ]}
            />
          </View>
          <ThemedText type="small">{props.status}</ThemedText>
        </View>
        <View
          style={[styles.row, styles.gap, !props.isSelected && { opacity: 0 }]}
        >
          <IconSymbol name="checkmark" size={24} color={themeColors.text} />
          <ThemedText type="small">SELECTED</ThemedText>
        </View>
      </View>
      <View style={[styles.row, styles.gap]}>
        <ConnectorIcon
          type={props.connectorType}
          status={props.status}
          size={24}
        />
        <ThemedText type="defaultSemiBold">{props.connectorType}</ThemedText>
      </View>
      <View style={[styles.row, styles.gap]}>
        <MaterialCommunityIcons
          name="lightning-bolt"
          color={themeColors.primaryYellow}
          size={24}
        />
        <ThemedText>Up to {props.maxPowerOutputKW}kW</ThemedText>
      </View>
      <View style={[styles.row, styles.gap]}>
        <IconSymbol name="banknote.fill" size={24} color={themeColors.text} />
        <ThemedText>€{props.priceInCentsPerKWh / 100}/kWh</ThemedText>
      </View>
    </ThemedPressable>
  );
}

export default ConnectorView;

const styles = StyleSheet.create({
  connector: {
    padding: 10,
    borderRadius: 20,
  },
  ellipse: {
    height: 7,
    width: 7,
    borderRadius: 60,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap: {
    gap: 10,
  },
  shadowMedium: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
});
