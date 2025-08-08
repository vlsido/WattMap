import LocationListItem from "@/components/list/LocationListItem";
import { ThemedText } from "@/components/ui/themed/ThemedText";
import { ThemedView } from "@/components/ui/themed/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useLocations } from "@/hooks/useLocations";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function List() {
  const locations = useLocations();

  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();
  const [search, setSearch] = useState<string>("");

  const filteredLocations = useMemo(() => {
    if (!locations.data) return [];
    if (!search.trim()) return locations.data;
    return locations.data.filter((loc) =>
      loc.name.toLowerCase().includes(search.trim().toLowerCase()),
    );
  }, [locations.data, search]);

  return (
    <SafeAreaView
      style={[StyleSheet.absoluteFill, { top: insets.top, bottom }]}
    >
      <ThemedView style={styles.container}>
        <ThemedView
          style={styles.searchBarContainer}
          lightColor={Colors.light.search}
          darkColor={Colors.dark.search}
        >
          <IconSymbol name="magnifyingglass" size={28} color="black" />
          <TextInput
            style={styles.searchBar}
            placeholder="Search locations..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </ThemedView>
        {locations.isLoading && <ActivityIndicator size={32} color={"white"} />}
        {filteredLocations.length > 0 ? (
          <FlatList
            data={filteredLocations}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <LocationListItem item={item} />}
          />
        ) : (
          <ThemedText type="defaultSemiBold" style={{ textAlign: "center" }}>
            No locations found!
          </ThemedText>
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    gap: 10,
  },
  searchBarContainer: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 60,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  searchBar: {
    flex: 1,
    color: "black",
    fontSize: 16,
  },
  listContainer: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    backgroundColor: "#639377",
    borderRadius: 30,
    padding: 8,
    gap: 10,
  },
});
