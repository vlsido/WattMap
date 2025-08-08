import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MapView, { Marker, Region } from "react-native-maps";
import LocationView from "@/components/map/LocationView";
import { useEffect, useState } from "react";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useLocations } from "@/hooks/useLocations";
import { Location } from "@/types/common";
import { notificationManager } from "@/managers/NotificationManager";

const INITIAL_REGION: Region = {
  latitude: 59.441466,
  longitude: 24.751405,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export default function Index() {
  const locations = useLocations();

  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  useEffect(() => {
    if (locations.error) {
      notificationManager.showUserMessage(
        "Couldn't fetch EV charging locations: " + locations.error.message,
        "ERROR",
        5000,
      );
    }
  }, [locations.error]);

  return (
    <SafeAreaView
      style={[StyleSheet.absoluteFill, { top: insets.top, bottom }]}
    >
      <MapView
        style={[StyleSheet.absoluteFill]}
        region={INITIAL_REGION}
        toolbarEnabled={false}
        onPress={() => setSelectedLocation(null)}
      >
        {locations.isSuccess &&
          locations.data.map((location, index) => (
            <Marker
              key={index}
              coordinate={location.point}
              title={location.name}
              description={location.address}
              image={require("../../assets/images/marker.png")}
              onSelect={() => setSelectedLocation(location)}
              onDeselect={() => setSelectedLocation(null)}
            />
          ))}
      </MapView>
      <LocationView location={selectedLocation} />
    </SafeAreaView>
  );
}
