import { StyleSheet, View } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import ConnectorIcon from "../connector/ConnectorIcon";
import { Colors } from "@/constants/Colors";
import { IconSymbol } from "../ui/IconSymbol";
import { ConnectorType, Location } from "@/types/common";
import { ThemedPressable } from "../ThemedPressable";
import { openNavigation } from "@/helpers/helperFunctions";
import { useRouter } from "expo-router";

interface LocationListItemProps {
  item: Location;
}

function LocationListItem(props: LocationListItemProps) {
  const router = useRouter();

  const availableByType = props.item.chargers.reduce(
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
    <ThemedPressable
      style={[styles.container, styles.shadowMedium]}
      onPress={() =>
        router.navigate({
          pathname: "/location-details",
          params: { location: JSON.stringify(props.item), r: "LIST" },
        })
      }
    >
      <View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <ThemedText type="defaultSemiBold">{props.item.name}</ThemedText>
        </View>
        <View style={[styles.row, { gap: 8 }]}>
          <ThemedText type="small" style={{ opacity: 0.5 }}>
            CHARGERS
          </ThemedText>
          <ThemedText type="small">{props.item.chargers.length}</ThemedText>
        </View>
        <View style={[styles.row, { gap: 8, alignItems: "center" }]}>
          <ThemedText type="small" style={{ opacity: 0.5 }}>
            CONNECTORS
          </ThemedText>
          {availableByType.map((connector, index) => (
            <View key={index} style={styles.connectorsContainer}>
              <View style={[styles.row, { alignItems: "center" }]}>
                <ConnectorIcon
                  type={connector.connectorType}
                  status={
                    connector.available === 0 ? "UNAVAILABLE" : "AVAILABLE"
                  }
                  size={24}
                />
                <ThemedText type="small">
                  {connector.available}/{connector.total}
                </ThemedText>
              </View>
              {index !== availableByType.length - 1 && (
                <ThemedView style={styles.separator} type="border" />
              )}
            </View>
          ))}
        </View>
      </View>
      <View
        style={[
          styles.row,
          { justifyContent: "flex-end", alignItems: "center" },
        ]}
      >
        <ThemedPressable
          style={styles.mapLinkContainer}
          darkColor={Colors.dark.search}
          lightColor={Colors.light.search}
          type="background"
          onPress={() => openNavigation(props.item.point)}
        >
          <IconSymbol name="location.fill" size={24} color="black" />
        </ThemedPressable>
      </View>
    </ThemedPressable>
  );
}

export default LocationListItem;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 10,
    borderRadius: 20,
  },
  row: {
    flexDirection: "row",
  },
  connectorsContainer: {
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  separator: {
    height: 8,
    width: 1,
  },
  detailsLinkContainer: {
    backgroundColor: Colors.dark.primaryGreen,
    borderRadius: 60,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  mapLinkContainer: {
    borderRadius: 60,
    padding: 5,
  },
  linkText: {
    fontSize: 16,
  },
  shadowMedium: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
});
