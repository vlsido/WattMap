import ChargerView from "@/components/location-details/ChargerView";
import SwipeAction from "@/components/ui/SwipeAction";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Connector, Location } from "@/types/common";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LocationDetails() {
  const { location, r } = useLocalSearchParams();

  const insets = useSafeAreaInsets();

  const router = useRouter();

  const [selectedData, setSelectedData] = useState<{
    chargerId: string;
    connector: Connector;
  } | null>(null);

  const [reservedHeight, setReservedHeight] = useState<number>(36);

  const locationObject: Location = useMemo(() => {
    return JSON.parse(location as string);
  }, [location]);

  function handleConnect() {
    if (selectedData === null) return;

    router.navigate({
      pathname: "/charging",
      params: {
        locationName: locationObject.name,
        chargerId: selectedData.chargerId,
        connector: JSON.stringify(selectedData.connector),
      },
    });
  }

  const onSwipeLayout = useCallback((event: LayoutChangeEvent) => {
    setReservedHeight(event.nativeEvent.layout.height + 20);
  }, []);

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFill,
        { top: insets.top, bottom: insets.bottom },
      ]}
    >
      <ThemedView style={styles.container}>
        <View style={styles.screenActionsContainer}>
          <ThemedView style={[styles.row, styles.gap]}>
            <IconSymbol
              name={r === "LIST" ? "list.bullet" : "map.fill"}
              size={28}
              color={Colors.dark.primaryGreen}
            />
            <Link href={r === "LIST" ? "/list" : "/"}>
              <ThemedText>
                {r === "LIST" ? "Back to List" : "Back to Map"}
              </ThemedText>
            </Link>
          </ThemedView>
          <View style={[styles.row, styles.gap]}>
            <IconSymbol
              name={r === "LIST" ? "map.fill" : "list.bullet"}
              size={28}
              color={Colors.dark.primaryGreen}
            />
            <Link href={r === "LIST" ? "/" : "/list"}>
              <ThemedText>{r === "LIST" ? "Open Map" : "Open List"}</ThemedText>
            </Link>
          </View>
        </View>
        <ScrollView contentContainerStyle={[styles.gap, { padding: 10 }]}>
          <View style={styles.header}>
            <ThemedText type="defaultSemiBold">
              {locationObject.name}
            </ThemedText>
          </View>
          {locationObject.chargers.map((charger) => (
            <ChargerView
              key={charger.id}
              id={charger.id}
              connectors={charger.connectors}
              selectedChargerId={selectedData?.chargerId}
              selectedConnectorId={selectedData?.connector.id}
              onSelectConnector={(connector: Connector) =>
                setSelectedData({ chargerId: charger.id, connector: connector })
              }
            />
          ))}

          <View style={{ height: reservedHeight }} />
        </ScrollView>
        <SwipeAction
          text="Swipe and Connect"
          backgroundColor={Colors.dark.primaryGreen}
          thumbColor="white"
          disabled={selectedData === null}
          containerStyle={styles.swipeContainer}
          onLayout={onSwipeLayout}
          onSwipeEnd={handleConnect}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  gap: {
    gap: 10,
  },
  header: {
    paddingVertical: 10,
    alignItems: "center",
  },
  swipeContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
});
