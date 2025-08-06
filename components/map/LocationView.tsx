import { Linking, Platform, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ConnectorIcon from "../connector/ConnectorIcon";
import { LatLng } from "react-native-maps";
import { ThemedTextButton } from "../ThemedTextButton";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ConnectorType, Location } from "@/types/common";

interface LocationViewProps {
  location: Location | null;
}

function openNavigation(latLng: LatLng) {
  const destination = `${latLng.latitude},${latLng.longitude}`;

  const url =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?daddr=${destination}`
      : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  Linking.openURL(url).catch((err) =>
    console.error("Failed to open map:", err),
  );
}

function LocationView(props: LocationViewProps) {
  const router = useRouter();

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
    <View style={styles.container} collapsableChildren={false}>
      <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
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
              <MaterialCommunityIcons
                name="ev-station"
                size={48}
                color={"#1EE78D"}
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
            text="Navigate"
            onPress={() => openNavigation(props.location!.point)}
            lightColor={Colors.light.primaryGreen}
            darkColor={Colors.dark.primaryGreen}
            style={styles.buttonContainer}
            textStyle={styles.buttonText}
            rightSideIcon="arrow-right"
            rightSideIconColor="black"
            rightSideIconSize={24}
          />
        </ThemedView>
      </Animated.View>
    </View>
  );
}

export default LocationView;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardContainer: {
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
    color: "black",
    fontWeight: 600,
    fontSize: 18,
  },
});
