import ChargerView from "@/components/location-details/ChargerView";
import SwipeAction from "@/components/ui/SwipeAction";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { Connector, Location } from "@/types/common";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LocationDetails() {
  const { location, r } = useLocalSearchParams();
  const router = useRouter();

  const [selectedData, setSelectedData] = useState<{
    chargerId: string;
    connector: Connector;
  } | null>(null);

  useEffect(() => {
    console.log(selectedData);
  }, [selectedData]);

  const locationObject: Location = useMemo(() => {
    return JSON.parse(location as string);
  }, [location]);

  const insets = useSafeAreaInsets();

  function handleConnect() {
    console.log("selectedData", selectedData);
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

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFill,
        { top: insets.top, bottom: insets.bottom },
      ]}
    >
      <ThemedView style={styles.container}>
        <View style={styles.screenActionsContainer}>
          <View style={[styles.row, styles.gap]}>
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
          </View>
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
        <View style={styles.header}>
          <ThemedText>{locationObject.name}</ThemedText>
        </View>
        <ScrollView contentContainerStyle={[styles.gap, { padding: 10 }]}>
          {locationObject.chargers.map((charger) => (
            <ChargerView
              key={charger.id}
              id={charger.id}
              connectors={charger.connectors}
              onSelectConnector={(connector: Connector) =>
                setSelectedData({ chargerId: charger.id, connector: connector })
              }
            />
          ))}
        </ScrollView>
        <SwipeAction
          text="Swipe and Connect"
          backgroundColor={Colors.dark.primaryGreen}
          thumbColor="white"
          paddingHorizontal={20}
          disabled={selectedData === null}
          onSwipeEnd={handleConnect}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
  },
  screenActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
});
