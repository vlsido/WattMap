import { notificationManager } from "@/managers/NotificationManager";
import { Linking, Platform } from "react-native";
import { LatLng } from "react-native-maps";

export function openNavigation(latLng: LatLng) {
  const destination = `${latLng.latitude},${latLng.longitude}`;

  const url =
    Platform.OS === "ios"
      ? `http://maps.apple.com/?daddr=${destination}`
      : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

  Linking.openURL(url).catch((err) => {
    console.error("Failed to open map:", err);
    notificationManager.showUserMessage(`Failed to open map: ${err}`, "ERROR");
  });
}
