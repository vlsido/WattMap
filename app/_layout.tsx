import NotificationHelper from "@/components/ui/notification/NotificationHelper";
import { useThemeColor } from "@/hooks/useThemeColor";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NotificationHelper />
        <GestureHandlerRootView>
          <MainStack />
        </GestureHandlerRootView>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function MainStack() {
  const background = useThemeColor({}, "background");

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: background,
      }}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="location-details" />
      </Stack>
      <StatusBar style="auto" />
    </View>
  );
}
