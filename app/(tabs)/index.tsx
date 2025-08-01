import { locationList } from "@/LocationList";
import { StyleSheet } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <MapView
          style={[StyleSheet.absoluteFill, { top: insets.top }]}
          initialRegion={{
            latitude: 59.441466,
            longitude: 24.751405,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locationList.map((location, index) => (
            <Marker
              key={index}
              coordinate={location.point}
              title={location.name}
              description={location.address}
              image={require("../../assets/images/marker.png")}
              onSelect={() => console.log("select")}
              onDeselect={() => console.log("deselect")}
            />
          ))}
        </MapView>
      </SafeAreaView>
    </>
  );
}
