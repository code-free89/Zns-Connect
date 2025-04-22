import { router, Stack } from "expo-router";
import React from "react";

import { NavigationBackIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { Pressable } from "react-native";
import ZnsText from "@/components/ui/Text";

export default function ZnsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 18,
          color: CustomDarkTheme.colors.txtColor,
        },
        headerLeft: () => (
          <Pressable onPress={() => router.dismiss()}>
            <NavigationBackIcon />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="general-settings"
        options={{
          title: "General settings",
          headerTitle: (props: any) => (
            <ZnsText
              {...props}
              type="medium"
              style={{
                fontSize: 18,
                color: "white",
                marginTop: 4,
                marginLeft: 12,
              }}
            >
              General settings
            </ZnsText>
          ),
        }}
      />
    </Stack>
  );
}
