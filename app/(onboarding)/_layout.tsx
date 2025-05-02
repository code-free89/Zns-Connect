import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";

import { getOrCreateUserIdByAddress } from "@/lib/api/user";
import { useAppDispatch } from "@/store";
import { setUserSession } from "@/store/slices/user";

export default function OnboardingLayout() {
  const dispatch = useAppDispatch();
  const { isConnected, address } = useAccount();

  useEffect(() => {
    const handleReferralStatus = async () => {
      const getStartedStatus = await AsyncStorage.getItem("get_started");
      if (getStartedStatus && isConnected) {
        router.replace("/(tabs)/home");
      }
    };

    handleReferralStatus();

    const handleGetOrCreateUserIdByAddress = async () => {
      if (isConnected && address) {
        const { data } = await getOrCreateUserIdByAddress(address);
        const session = { id: data.id, address };
        dispatch(setUserSession(session));
      }
    };

    handleGetOrCreateUserIdByAddress();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="wallet-connect" options={{ headerShown: false }} />
    </Stack>
  );
}
