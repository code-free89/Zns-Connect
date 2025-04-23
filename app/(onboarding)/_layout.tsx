import React, { useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useAccount } from "wagmi";

export default function OnboardingLayout() {
  const { isConnected } = useAccount();

  useEffect(() => {
    const handleReferralStatus = async () => {
      const getStartedStatus = await AsyncStorage.getItem("get_started");
      if (getStartedStatus && isConnected) {
        router.replace("/(tabs)/home");
      }
    };

    handleReferralStatus();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="wallet-connect" options={{ headerShown: false }} />
    </Stack>
  );
}
