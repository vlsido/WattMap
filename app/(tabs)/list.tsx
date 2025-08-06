import LocationListItem from "@/components/list/LocationListItem";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useLocations } from "@/hooks/useLocations";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function List() {
  const locations = useLocations();

  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();

  return (
    <SafeAreaView style={[styles.container, { top: insets.top, bottom }]}>
      {locations.isLoading && <ActivityIndicator size={32} color={"white"} />}
      <FlatList
        data={locations.data}
        contentContainerStyle={styles.listContainer}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <LocationListItem item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  listContainer: {
    backgroundColor: "#639377",
    borderRadius: 30,
    padding: 8,
    gap: 10,
  },
});
