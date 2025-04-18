import "./polyfills";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { WagmiConfig } from "wagmi";

import { wagmiConfig, Web3Modal } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <WagmiConfig config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
              <Web3Modal />
              <Stack>
                <Stack.Screen
                  name="(onboarding)"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="(zns)" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
              </Stack>
            </SafeAreaView>
          </SafeAreaProvider>
        </QueryClientProvider>
      </WagmiConfig>
    </ThemeProvider>
  );
}
