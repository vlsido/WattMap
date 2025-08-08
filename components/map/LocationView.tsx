import { Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { ThemedText } from "../ui/themed/ThemedText";
import { ThemedView } from "../ui/themed/ThemedView";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ConnectorIcon from "../connector/ConnectorIcon/ConnectorIcon";
import { ThemedTextButton } from "../ui/themed/ThemedTextButton";
import { useRouter } from "expo-router";
import { ConnectorType, Location } from "@/types/common";
import { openNavigation } from "@/helpers/helperFunctions";
import { useThemeColors } from "@/hooks/useThemeColors";

interface LocationViewProps {
  location: Location | null;
}

function LocationView(props: LocationViewProps) {
  const router = useRouter();
  const themeColors = useThemeColors();

  if (props.location === null) return null;

  const availableByType = props.location.chargers.reduce(
    (acc, value) => {
      value.connectors.forEach((connector) => {
        const existing = acc.find(
          (item) => item.connectorType === connector.connectorType,
        );

        if (existing) {
          existing.total++;
          if (connector.status === "AVAILABLE") {
            existing.available++;
          }
        } else {
          acc.push({
            connectorType: connector.connectorType,
            total: 1,
            available: connector.status === "AVAILABLE" ? 1 : 0,
          });
        }
      });

      return acc;
    },
    [] as { connectorType: ConnectorType; total: number; available: number }[],
  );

  return (
    <Animated.View
      style={styles.container}
      entering={FadeInDown}
      exiting={FadeOutDown}
    >
      <ThemedView style={styles.cardContainer}>
        <Pressable
          style={({ pressed }) => [
            { opacity: pressed ? 0.75 : 1 },
            styles.bodyContainer,
          ]}
          onPress={() =>
            router.navigate({
              pathname: "/location-details",
              params: { location: JSON.stringify(props.location) },
            })
          }
        >
          <View style={styles.row}>
            <ThemedText type="small">
              {props.location.chargers.length}x
            </ThemedText>
            <MaterialCommunityIcons
              name="ev-station"
              size={48}
              color={themeColors.primaryGreen}
            />
            <View style={{ flexShrink: 1 }}>
              <ThemedText type="subtitle">{props.location.name}</ThemedText>
              <ThemedText type="default">{props.location.address}</ThemedText>
            </View>
          </View>
          <ThemedView style={[styles.connectorsContainer]} type="border">
            {availableByType.map((connector, index) => (
              <View key={index}>
                <View style={[styles.connector, styles.row]}>
                  <ThemedText type="small">
                    {connector.available} / {connector.total}
                  </ThemedText>
                  <ConnectorIcon
                    type={connector.connectorType}
                    status={
                      connector.available === 0 ? "UNAVAILABLE" : "AVAILABLE"
                    }
                    size={28}
                  />
                  <View>
                    <ThemedText>{connector.connectorType}</ThemedText>
                    <ThemedText style={{ opacity: 0.5 }} type="small">
                      CONNECTOR TYPE
                    </ThemedText>
                  </View>
                </View>
                {index !== availableByType.length - 1 && (
                  <ThemedView style={styles.separator} type="border" />
                )}
              </View>
            ))}
          </ThemedView>
          <ThemedText
            style={{ opacity: 0.5, alignSelf: "center" }}
            type="smallSemiBold"
          >
            press to open details
          </ThemedText>
        </Pressable>
        <ThemedTextButton
          label="Navigate to location details"
          text="Navigate"
          onPress={() => openNavigation(props.location!.point)}
          lightColor={themeColors.primaryGreen}
          darkColor={themeColors.primaryGreen}
          style={styles.buttonContainer}
          textStyle={[styles.buttonText, { color: themeColors.background }]}
          rightSideIcon="arrow-right"
          rightSideIconColor={themeColors.background}
          rightSideIconSize={24}
        />
      </ThemedView>
    </Animated.View>
  );
}

export default LocationView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: "auto",
    right: "auto",
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  cardContainer: {
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    borderRadius: 30,
    overflow: "hidden",
    bottom: 0,
  },
  bodyContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    color: "white",
  },
  connectorsContainer: {
    borderRadius: 20,
  },
  connector: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: "center",
    gap: 10,
  },
  separator: {
    height: 1,
    width: "90%",
    opacity: 0.5,
    alignSelf: "center",
  },
  buttonContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: 18,
  },
});
