import { serverIp, user } from "@/api/api";
import { ThemedPressable } from "@/components/ThemedPressable";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { notificationManager } from "@/managers/NotificationManager";
import { useCallback } from "react";
import { Image, SafeAreaView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
          <View
            style={[
              styles.carInfoContainer,
              styles.roundedLarge,
              { backgroundColor: themeColors.primaryGreen },
            ]}
          >
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              <ThemedText type="smallSemiBold">{user.vehicle.name}</ThemedText>
              <ThemedPressable onPress={onEdit} type="transparent">
                <IconSymbol name="pencil" size={18} color="white" />
              </ThemedPressable>
            </View>
          </View>
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
  },
  actionsContainer: {
    padding: 10,
  },
  action: {
    padding: 8,
    alignItems: "center",
  },
});
