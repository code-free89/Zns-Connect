import "./polyfills";
import { ThemeProvider } from "@react-navigation/native";
import { AppKit } from "@reown/appkit-wagmi-react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";
import "react-native-gesture-handler";
import "react-native-reanimated";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ToastManager from "toastify-react-native";
import { WagmiProvider } from "wagmi";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BackDropModal from "@/components/ui/BackDropModal";
import { wagmiConfig } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";
import { toastConfig } from "@/constants/toast-config";
import AppProvider from "@/lib/providers/AppProvider";
import { StoreProvider } from "@/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [fontsLoaded] = useFonts({
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),

    "Orbitron-Regular": require("../assets/fonts/Orbitron/Orbitron-Regular.ttf"),
    "Orbitron-Medium": require("../assets/fonts/Orbitron/Orbitron-Medium.ttf"),
    "Orbitron-SemiBold": require("../assets/fonts/Orbitron/Orbitron-SemiBold.ttf"),
    "Orbitron-Bold": require("../assets/fonts/Orbitron/Orbitron-Bold.ttf"),

    "SpaceGrotesk-Regular": require("../assets/fonts/Space_Grotesk/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Medium": require("../assets/fonts/Space_Grotesk/SpaceGrotesk-Medium.ttf"),
    "SpaceGrotesk-SemiBold": require("../assets/fonts/Space_Grotesk/SpaceGrotesk-SemiBold.ttf"),
    "SpaceGrotesk-Bold": require("../assets/fonts/Space_Grotesk/SpaceGrotesk-Bold.ttf"),

    "SpaceMono-Regular": require("../assets/fonts/Space_Mono/SpaceMono-Regular.ttf"),
    "SpaceMono-Bold": require("../assets/fonts/Space_Mono/SpaceMono-Bold.ttf"),

    "WorkSans-Regular": require("../assets/fonts/WorkSans/WorkSans-Regular.ttf"),
    "WorkSans-Medium": require("../assets/fonts/WorkSans/WorkSans-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hide();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={CustomDarkTheme}>
      <StoreProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AutocompleteDropdownContextProvider>
              <StatusBar style="light" backgroundColor="#000" />
              <SafeAreaProvider>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <SafeAreaView style={{ flex: 1 }}>
                    <AppKit />
                    <AppProvider />

                    <BackDropModal />

                    <Stack screenOptions={{ headerShown: false }}>
                      <Stack.Screen name="(onboarding)" />
                      <Stack.Screen name="(tabs)" />
                      <Stack.Screen name="(zns)" />
                      <Stack.Screen name="+not-found" />
                    </Stack>

                    <ToastManager config={toastConfig} />
                  </SafeAreaView>
                </GestureHandlerRootView>
              </SafeAreaProvider>
            </AutocompleteDropdownContextProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
