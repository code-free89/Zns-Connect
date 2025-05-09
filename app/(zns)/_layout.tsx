import { router, Stack } from "expo-router";
import React from "react";

import ZnsText from "@/components/ui/Text";
import { fontStyles } from "@/constants/fonts";
import { NavigationBackIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

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
          fontSize: getHeightSize(18),
          lineHeight: getHeightSize(18 * 1.5),
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
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: getHeightSize(72),
    flexDirection: "row",
    paddingHorizontal: getWidthSize(16),
    gap: getWidthSize(12),
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "white",
    marginTop: 4,
    marginLeft: 12,
  },
});
