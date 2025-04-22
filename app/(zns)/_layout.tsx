import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Platform, Text, View, Pressable } from "react-native";
import { usePathname } from "expo-router";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";

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
import CustomBottomTabButton from "@/components/CustomBottomTabButton";

export default function ZnsLayout() {
  const [referralCodeModalVisible, setReferralCodeModalVisible] =
    useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleReferralStatus = async () => {
      const referralStatus = await AsyncStorage.getItem("referral");
      if (!referralStatus) setReferralCodeModalVisible(true);
    };

    handleReferralStatus();
  }, []);

  // Get the current tab name from the pathname
  const getTabName = () => {
    const parts = pathname.split("/");
    const lastPart = parts[parts.length - 1];
    if (!lastPart) return "Home";
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1);
  };

  return (
    <>
      <ReferralCodeModal
        isVisible={referralCodeModalVisible}
        onClose={() => {
          AsyncStorage.setItem("referral", "true");
          setReferralCodeModalVisible(false);
        }}
      />
      <Tabs>
        <TabSlot />
        <View
          style={{
            backgroundColor: CustomDarkTheme.colors.background,
            paddingTop: Platform.OS === "ios" ? 50 : 20,
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: CustomDarkTheme.colors.grey4,
          }}
        >
          <Text
            style={{
              color: CustomDarkTheme.colors.text,
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {getTabName()}
          </Text>
        </View>
        <TabList
          style={{
            paddingVertical: 17,
            backgroundColor: CustomDarkTheme.colors.grey3,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TabTrigger name="home" href="/home" asChild>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={{
                    height: 80,
                    width: 80,
                    backgroundColor:
                      pathname === "/home"
                        ? CustomDarkTheme.colors.primary
                        : pressed
                        ? CustomDarkTheme.colors.grey4
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        pathname === "/home"
                          ? "white"
                          : CustomDarkTheme.colors.text,
                    }}
                  >
                    Home
                  </Text>
                </View>
              )}
            </Pressable>
          </TabTrigger>
          <TabTrigger name="register" href="/register">
            <Text>Register</Text>
          </TabTrigger>
          <TabTrigger name="profile" href="/profile">
            <Text>Profile</Text>
          </TabTrigger>
          <TabTrigger name="cart" href="/cart">
            <Text>Cart</Text>
          </TabTrigger>
          <TabTrigger name="referrals" href="/referrals">
            <Text>Referrals</Text>
          </TabTrigger>
        </TabList>
      </Tabs>
    </>
  );
}
