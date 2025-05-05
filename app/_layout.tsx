import "./polyfills";
import { ThemeProvider } from "@react-navigation/native";
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

import BackDropModal from "@/components/ui/BackDropModal";
import { wagmiConfig, Web3Modal } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";
import { toastConfig } from "@/constants/toast-config";
import AppProvider from "@/lib/providers/AppProvider";
import { StoreProvider } from "@/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const [loaded] = useFonts({
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
      <StoreProvider>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <AutocompleteDropdownContextProvider>
              <StatusBar style="dark" />
              <SafeAreaProvider>
                <SafeAreaView style={{ flex: 1 }}>
                  <Web3Modal />

                  <AppProvider />

                  <BackDropModal />

                  <Stack>
                    <Stack.Screen
                      name="(onboarding)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="(zns)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>

                  <ToastManager config={toastConfig} />
                </SafeAreaView>
              </SafeAreaProvider>
            </AutocompleteDropdownContextProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </StoreProvider>
    </ThemeProvider>
  );
}
