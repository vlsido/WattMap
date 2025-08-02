import { Location, locationList } from "@/LocationList";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";
import LocationView from "@/components/map/LocationView";
import { useState } from "react";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";

export default function Index() {
  const insets = useSafeAreaInsets();

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const bottom = useBottomTabOverflow();

  return (
    <SafeAreaView
      style={[StyleSheet.absoluteFill, { top: insets.top, bottom }]}
    >
      <MapView
        style={[StyleSheet.absoluteFill]}
        initialRegion={{
          latitude: 59.441466,
          longitude: 24.751405,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        toolbarEnabled={false}
        loadingEnabled={true}
      >
        {locationList.map((location, index) => (
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
