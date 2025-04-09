import React from "react";

import { Redirect, Stack } from "expo-router";
import { useAccount } from "wagmi";

export default function OnboardingLayout() {
  const { isConnected } = useAccount();
  console.log("isConnected", isConnected);

  if (isConnected) return <Redirect href={"/(zns)"} />;

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="wallet-connect" options={{ headerShown: false }} />
    </Stack>
  );
}
