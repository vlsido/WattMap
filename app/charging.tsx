import { ThemedText } from "@/components/ThemedText";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BackHandler,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import SwipeAction from "@/components/ui/SwipeAction";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { LightningIcon } from "@/components/ui/svgs/LightningIcon";
import { Connector, Session } from "@/types/common";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSessionState, startCharging, stopCharging, user } from "@/api/api";
import { notificationManager } from "@/managers/NotificationManager";
import { AnimatedLinearGradient } from "@/constants/AnimatedComponents";
import { useThemeColors } from "@/hooks/useThemeColors";

export default function Charging() {
  const themeColors = useThemeColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { height: windowHeight } = useWindowDimensions();

  const { locationName, chargerId, connector } = useLocalSearchParams();

  const connectorObject: Connector = useMemo(() => {
    return JSON.parse(connector as string);
  }, [connector]);

  const [sessionId, setSessionId] = useState<string | null>(null);

  const startMutation = useMutation({
    mutationFn: () =>
      startCharging(
        "my-vehicle-id",
        chargerId as string,
        connectorObject.id,
        user.vehicle.initialSoC,
      ),
    onSuccess: (id) => setSessionId(id),
  });

  useEffect(() => {
    startMutation.mutate();

    return () => {
      stopCharging(sessionId);
    };
  }, []);

  const backAction = useCallback(() => {}, []);

  useEffect(() => {
    function backAction() {
      notificationManager.showUserMessage(
        "You need to disconnect first!",
        "INFO",
        5000,
      );
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => {
      console.log("undermount");
      backHandler.remove();
    };
  }, []);

  const session = useQuery<Session>({
    queryKey: ["charging-session", sessionId],
    queryFn: () => getSessionState(sessionId),
    enabled: !!sessionId,
    refetchInterval: 1000,
  });

  const currentEnergyKWh = session.data
    ? user.vehicle.batteryCapacityKWh * (session.data.socCurrent / 100)
    : user.vehicle.batteryCapacityKWh * (user.vehicle.initialSoC / 100);
  const distanceKm =
    currentEnergyKWh / (user.vehicle.consumptionKWhPer100Km / 100);
  const energyNeededKWh = session.data
    ? user.vehicle.batteryCapacityKWh * ((100 - session.data.socCurrent) / 100)
    : user.vehicle.batteryCapacityKWh * ((100 - user.vehicle.initialSoC) / 100);
  const chargingPowerKW = Math.min(
    connectorObject.maxPowerOutputKW,
    user.vehicle.maxChargeKW,
  );
  const timeRemainingHours = energyNeededKWh / chargingPowerKW;

  const batteryLevelHeight = useSharedValue<number>(user.vehicle.initialSoC);

  useEffect(() => {
    batteryLevelHeight.value = session.data
      ? (session.data.socCurrent / 100) * (windowHeight / 3.5)
      : user.vehicle.initialSoC;
  }, [session.data]);

  const batteryLevelAnimatedStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      height: batteryLevelHeight.value,
    };
  }, []);

  function formatTimeRemaining(hours: number): string {
    if (hours <= 0) return "Done";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h > 0 && m > 0) return `${h} h ${m} min`;
    if (h > 0) return `${h} h`;
    return `${m} min`;
  }

  const handleDisconnect = useCallback(() => {
    stopCharging(sessionId);
    router.dismiss();
  }, [sessionId]);

  return (
    <SafeAreaView
      style={[
        StyleSheet.absoluteFill,
        { top: insets.top, bottom: insets.bottom },
      ]}
    >
      <LinearGradient
        style={styles.container}
        colors={[themeColors.alternateGreen, "#161719"]}
      >
        <Image
          style={styles.carImage}
          source={require("../assets/images/ev-car.png")}
        />
        <View style={styles.header}>
          <ThemedText
            lightColor={themeColors.text}
            type="defaultSemiBold"
            style={styles.centerText}
          >
            {locationName}
          </ThemedText>
          <ThemedText
            lightColor={themeColors.text}
            type="default"
            style={styles.centerText}
          >
            {chargerId}
          </ThemedText>
        </View>
        <View style={styles.center}>
          <View style={[styles.batteryHead, { width: windowHeight / 14 }]} />
          <View
            style={[
              styles.batteryBody,
              styles.shadowMedium,
              { height: windowHeight / 5, width: windowHeight / 8 },
            ]}
          >
            <AnimatedLinearGradient
              style={[batteryLevelAnimatedStyle, styles.batteryLevel]}
              colors={["#1EE78D", "#85ED06"]}
            />
            <View style={styles.lightningIconContainer}>
              <LightningIcon width={48} height={48} />
            </View>
            <View style={[styles.gap]}>
              <Text style={[styles.largeMediumText, styles.centerText]}>
                {session.data && session.data.socCurrent.toFixed(0) + "%"}
              </Text>
              <Text style={(styles.defaultText, styles.centerText)}>
                {session.data?.charging ? "Charging" : "Charged"}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.information}>
          <View style={styles.row}>
            <View style={[styles.infoBox, styles.shadowMedium]}>
              <Text style={[styles.text, styles.smallLightText]}>
                Remaining Distance
              </Text>
              <Text style={[styles.text, styles.defaultPlusText]}>
                {distanceKm.toFixed(0)} km
              </Text>
            </View>
            <View style={[styles.infoBox, styles.shadowMedium]}>
              <Text style={[styles.text, styles.smallLightText]}>Energy</Text>
              <Text style={[styles.text, styles.defaultPlusText]}>
                {currentEnergyKWh.toFixed(1)} kwh
              </Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={[styles.infoBox, styles.shadowMedium]}>
              <Text style={[styles.text, styles.smallLightText]}>Port</Text>
              <Text style={[styles.text, styles.defaultPlusText]}>
                {connectorObject.connectorType}
              </Text>
            </View>
            <View style={[styles.infoBox, styles.shadowMedium]}>
              <Text style={[styles.text, styles.smallLightText]}>
                Time Remaining
              </Text>
              <Text style={[styles.text, styles.defaultPlusText]}>
                {formatTimeRemaining(timeRemainingHours)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.text, styles.bigText]}>Total</Text>
          <Text style={[styles.text, styles.largeSemiboldText]}>
            €{session.data ? session.data.price.toFixed(2) : "--"}
          </Text>
        </View>
        <View style={styles.swipeContainer}>
          <SwipeAction
            text="Swipe & Disconnect"
            backgroundColor={"#E7751E"}
            thumbColor="white"
            containerStyle={styles.swipe}
            onSwipeEnd={handleDisconnect}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    gap: 10,
  },
  gap: {
    gap: 10,
  },
  carImage: {
    position: "absolute",
    left: "-5%",
    top: "15%",
    bottom: 0,
    right: 0,
  },
  header: {
    paddingVertical: 10,
    gap: 10,
  },
  centerText: {
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  batteryHead: {
    height: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 0.5,
    backgroundColor: "#E2E2E2",
  },
  batteryBody: {
    borderRadius: 20,
    borderWidth: 0,
    backgroundColor: "#E3E3E3",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 10,
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
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lightningIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  information: {
    gap: 10,
    width: "100%",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  infoBox: {
    flex: 1,
    gap: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#2C6042",
    opacity: 0.99,
  },
  text: {
    color: "white",
  },
  priceContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  swipe: {
    width: "100%",
  },
  smallLightText: {
    fontSize: 14,
    fontWeight: "light",
  },
  defaultText: {
    fontSize: 16,
  },
  defaultPlusText: {
    fontSize: 18,
  },
  bigText: {
    fontSize: 24,
  },
  largeMediumText: {
    fontSize: 28,
    fontWeight: "400",
  },
  largeSemiboldText: {
    fontSize: 36,
    fontWeight: "semibold",
  },
});
