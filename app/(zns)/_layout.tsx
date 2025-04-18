import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import ReferralCodeModal from "@/components/zns/referral-code/ReferralCodeModal";
import {
  CartIcon,
  HomeIcon,
  SearchIcon,
  UserAddIcon,
  UserIcon,
} from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";

export default function ZnsLayout() {
  const [referralCodeModalVisible, setReferralCodeModalVisible] =
    useState(false);

  useEffect(() => {
    const handleReferralStatus = async () => {
      const referralStatus = await AsyncStorage.getItem("referral");
      if (!referralStatus) setReferralCodeModalVisible(true);
    };

    handleReferralStatus();
  }, []);

  return (
    <>
      <ReferralCodeModal
        isVisible={referralCodeModalVisible}
        onClose={() => {
          AsyncStorage.setItem("referral", "true");
          setReferralCodeModalVisible(false);
        }}
      />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: CustomDarkTheme.colors.primary,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              paddingVertical: 8,
            },
            default: {
              paddingVertical: 8,
            },
          }),
          headerStatusBarHeight: 0,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "black",
            shadowColor: "transparent",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            title: "Register",
            headerShown: true,
            headerTitle: "Register a domain",
            tabBarIcon: ({ color }) => <SearchIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: true,
            tabBarIcon: ({ color }) => <UserIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: "My Cart",
            headerShown: true,
            tabBarIcon: ({ color }) => <CartIcon color={color} />,
          }}
        />
        <Tabs.Screen
          name="referrals"
          options={{
            title: "Referrals",
            tabBarIcon: ({ color }) => <UserAddIcon color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}
