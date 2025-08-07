import { serverIp, user } from "@/api/api";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { LightningIcon } from "@/components/ui/svgs/LightningIcon";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useThemeColors } from "@/hooks/useThemeColors";
import { notificationManager } from "@/managers/NotificationManager";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BATTERY_WIDTH = 40;
const BATTERY_HEIGHT = 60;

export default function Profile() {
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const bottom = useBottomTabOverflow();

  function getTimeOfDay(date = new Date()) {
    const hour = date.getHours();
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 17) {
      return "afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "evening";
    } else {
      return "night";
    }
  }

  const onEdit = useCallback(() => {
    notificationManager.showUserMessage(
      "Can't edit car in development",
      "ERROR",
    );
  }, []);

  const onReport = useCallback(() => {
    notificationManager.showUserMessage("Can't report in development", "ERROR");
  }, []);

  const onAbout = useCallback(() => {
    notificationManager.showUserMessage(
      "This is a simple EV charging app!",
      "INFO",
    );
  }, []);

  const onLogout = useCallback(() => {
    notificationManager.showUserMessage("Can't logout in development", "ERROR");
  }, []);

  return (
    <SafeAreaView
      style={[StyleSheet.absoluteFill, { top: insets.top, bottom }]}
    >
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">
          Good {getTimeOfDay()}{" "}
          <Text style={{ color: themeColors.primaryGreen }}>
            {user.firstName}
          </Text>
        </ThemedText>
        <View style={[styles.row, styles.gap]}>
          <Image
            source={{ uri: `http://${serverIp}:4000/api/v1/avatar/${user.id}` }}
            style={[styles.avatar, styles.roundedLarge]}
          />
          <ThemedView
            style={[styles.carInfoContainer, styles.roundedLarge, styles.gap]}
            lightColor="#F5F5F5"
            darkColor="#212221"
          >
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <ThemedText type="defaultSemiBold">
                {user.vehicle.name}
              </ThemedText>
              <ThemedPressable
                onPress={onEdit}
                type="transparent"
                style={styles.pencilContainer}
              >
                <IconSymbol name="pencil" size={18} color={themeColors.text} />
              </ThemedPressable>
            </View>
            <View
              style={[
                styles.row,
                { alignItems: "center", justifyContent: "space-between" },
              ]}
            >
              <ThemedText type="defaultSemiBold">Charge Level</ThemedText>
              <View style={styles.center}>
                <View style={[styles.batteryHead]} />
                <View style={[styles.batteryBody, styles.shadowMedium]}>
                  <LinearGradient
                    style={[styles.batteryLevel]}
                    colors={["#1EE78D", "#85ED06"]}
                  />
                  <View style={styles.lightningIconContainer}>
                    <LightningIcon width={18} height={18} />
                  </View>
                  <View style={[styles.gap]}>
                    <Text style={[styles.batteryText]}>
                      {user.vehicle.initialSoC.toFixed(0) + "%"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ThemedView>
        </View>
        <View style={[styles.actionsContainer, styles.gap]}>
          <ThemedPressable
            onPress={onReport}
            style={[styles.row, styles.gap, styles.action]}
          >
            <IconSymbol
              name="exclamationmark.triangle"
              size={28}
              color={themeColors.primaryGreen}
            />
            <ThemedText>Report an issue</ThemedText>
          </ThemedPressable>

          <ThemedPressable
            onPress={onAbout}
            style={[styles.row, styles.gap, styles.action]}
          >
            <IconSymbol
              name="questionmark.circle"
              size={28}
              color={themeColors.primaryGreen}
            />
            <ThemedText>About</ThemedText>
          </ThemedPressable>
          <ThemedPressable
            onPress={onLogout}
            style={[styles.row, styles.gap, styles.action]}
          >
            <IconSymbol
              name="rectangle.portrait.and.arrow.right"
              size={28}
              color={themeColors.primaryGreen}
            />
            <ThemedText>Logout</ThemedText>
          </ThemedPressable>
        </View>
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
  defaultBoldText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
  },
  avatar: {
    width: 128,
    height: 128,
    borderWidth: 0.5,
    borderColor: "white",
  },
  roundedLarge: {
    borderRadius: 30,
  },
  gap: {
    gap: 10,
  },
  carInfoContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxWidth: 300,
  },
  pencilContainer: {
    width: BATTERY_WIDTH,
    alignItems: "center",
  },
  actionsContainer: {
    padding: 10,
  },
  action: {
    padding: 8,
    alignItems: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  batteryHead: {
    height: 4,
    width: BATTERY_WIDTH / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.5,
    backgroundColor: "#E2E2E2",
  },
  batteryBody: {
    borderRadius: 10,
    borderWidth: 0,
    backgroundColor: "#E3E3E3",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
    height: BATTERY_HEIGHT,
    width: BATTERY_WIDTH,
    overflow: "hidden",
  },
  shadowMedium: {
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  batteryLevel: {
    position: "absolute",
    height: (user.vehicle.initialSoC / 100) * 64,
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  batteryText: {
    fontSize: 12,
  },
  lightningIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
