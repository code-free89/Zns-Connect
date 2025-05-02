import { router, Stack } from "expo-router";
import React from "react";

import { NavigationBackIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { Pressable, Text, StyleSheet } from "react-native";
import ZnsText from "@/components/ui/Text";
import { fontStyles } from "@/constants/fonts";

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
      <Stack.Screen
        name="badges"
        options={{
          title: "My badges",
          headerTitle: (props: any) => (
            <Text
              style={[fontStyles["Poppins-Medium"], styles.headerTitle]}
              {...props}
            >
              My badges
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name="hip"
        options={{
          title: "Human Identity Pass",
          headerTitle: (props: any) => (
            <Text
              style={[fontStyles["Poppins-Medium"], styles.headerTitle]}
              {...props}
            >
              Human Identity Pass
            </Text>
          ),
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 18,
    color: "white",
    marginTop: 4,
    marginLeft: 12,
  },
});
