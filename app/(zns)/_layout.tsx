import React from "react";

import { Stack } from "expo-router";

export default function ZnsLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="general-settings" />
    </Stack>
  );
}
