import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";
import { Platform, Text, View, Pressable } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

import TabBarBackground from "@/components/ui/TabBarBackground";
import ReferralCodeModal from "@/components/zns/referral-code/ReferralCodeModal";
import { CustomDarkTheme } from "@/constants/theme";
import CustomBottomTabButton from "@/components/CustomBottomTabButton";

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
      {/* <Tabs
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
              borderWidth: 0,
              shadowColor: "#000000",
              shadowOpacity: 0.07,
              shadowRadius: 10,
              justifyContent: "flex-start",
              paddingBottom: 8,
              marginBottom: 0,
              bottom: 0,
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
      </Tabs> */}
      <Tabs>
        <TabSlot />
        <TabList
          style={{
            paddingVertical: 17,
            backgroundColor: CustomDarkTheme.colors.grey3,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TabTrigger name="home" href="/home" asChild>
            <CustomBottomTabButton name="home" href="/home" label="Home" />
          </TabTrigger>
          <TabTrigger name="register" href="/register" asChild>
            <CustomBottomTabButton
              name="register"
              href="/register"
              label="Register"
            />
          </TabTrigger>
          <TabTrigger name="profile" href="/profile" asChild>
            <CustomBottomTabButton
              name="profile"
              href="/profile"
              label="Profile"
            />
          </TabTrigger>
          <TabTrigger name="cart" href="/cart" asChild>
            <CustomBottomTabButton name="cart" href="/cart" label="Cart" />
          </TabTrigger>
          <TabTrigger name="referrals" href="/referrals" asChild>
            <CustomBottomTabButton
              name="referrals"
              href="/referrals"
              label="Referrals"
            />
          </TabTrigger>
        </TabList>
      </Tabs>
    </>
  );
}
