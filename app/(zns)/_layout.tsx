import { router, Stack } from "expo-router";
import React from "react";

import { fontStyles } from "@/constants/fonts";
import { NavigationBackIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ZnsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "black",
        },
        headerShown: false,
        headerTitleStyle: {
          ...fontStyles["Poppins-Medium"],
          fontSize: getFontSize(18),
          lineHeight: getFontSize(18) * 1.5,
          color: CustomDarkTheme.colors.txtColor,
        },
        headerLeft: () => (
          <Pressable
            onPress={() => {
              if (router.canGoBack()) router.back();
              else router.replace("/(tabs)/home");
            }}
          >
            <NavigationBackIcon />
          </Pressable>
        ),
      }}
    >
      <Stack.Screen
        name="general-settings"
        options={{
          title: "General settings",
          headerShown: true,
          header: ({ options }: any) => {
            return (
              <View style={styles.headerContainer}>
                {options.headerLeft()}
                <Text style={options.headerTitleStyle}>{options.title}</Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="badges"
        options={{
          title: "My badges",
          headerShown: true,
          header: ({ options }: any) => {
            return (
              <View style={styles.headerContainer}>
                {options.headerLeft()}
                <Text style={options.headerTitleStyle}>{options.title}</Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="hip"
        options={{
          title: "Human Identity Pass",
          headerShown: true,
          header: ({ options }: any) => {
            return (
              <View style={styles.headerContainer}>
                {options.headerLeft()}
                <Text style={options.headerTitleStyle}>{options.title}</Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="my-domains"
        options={{
          title: "My domains",
          headerShown: true,
          header: ({ options }: any) => {
            return (
              <View style={styles.headerContainer}>
                {options.headerLeft()}
                <Text style={options.headerTitleStyle}>{options.title}</Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="manage-profile"
        options={{
          title: "Manage profile",
          headerShown: true,
          header: ({ options }: any) => {
            return (
              <View style={styles.headerContainer}>
                {options.headerLeft()}
                <Text style={options.headerTitleStyle}>{options.title}</Text>
              </View>
            );
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: getHeightSize(42),
    flexDirection: "row",
    paddingHorizontal: getWidthSize(16),
    gap: getWidthSize(12),
    alignItems: "center",
  },
});
