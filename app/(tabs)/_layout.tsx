import AsyncStorage from "@react-native-async-storage/async-storage";
import { Tabs, usePathname } from "expo-router";
import React, { useEffect, useState } from "react";

import ReferralCodeModal from "@/components/zns/referral-code/ReferralCodeModal";
import { fontStyles } from "@/constants/fonts";
import {
  CartIcon,
  HomeIcon,
  SearchIcon,
  UserAddIcon,
  UserIcon,
} from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getHeightSize } from "@/utils/size";

export default function TabsLayout() {
  const pathname = usePathname();
  const { carts } = useAppSelector((state) => state.setting);
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
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: CustomDarkTheme.colors.primary,
          tabBarInactiveTintColor: CustomDarkTheme.colors.body,
          tabBarStyle: {
            backgroundColor: CustomDarkTheme.colors.grey3,
            paddingVertical: getHeightSize(17),
            height: getHeightSize(64),
          },
          tabBarItemStyle: {
            paddingTop: 4,
          },
          freezeOnBlur: true,
          popToTopOnBlur: true,
          headerStyle: {
            backgroundColor: "black",
          },
          animation: "shift",
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <HomeIcon color={color} />
            ),
            tabBarLabel: "Home",
            tabBarLabelStyle: [
              pathname === "/home"
                ? fontStyles["Poppins-SemiBold"]
                : fontStyles["Poppins-Regular"],
            ],
          }}
        />
        <Tabs.Screen
          name="register"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <SearchIcon color={color} />
            ),
            title: "Register a domain",
            tabBarLabel: "Register",
            tabBarLabelStyle: [
              pathname === "/register"
                ? fontStyles["Poppins-SemiBold"]
                : fontStyles["Poppins-Regular"],
            ],
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <UserIcon color={color} />
            ),
            title: "Profile",
            tabBarLabelStyle: [
              pathname === "/profile"
                ? fontStyles["Poppins-SemiBold"]
                : fontStyles["Poppins-Regular"],
            ],
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <CartIcon color={color} />
            ),
            title: "My Cart",
            tabBarBadge: carts.length > 0 ? carts.length : undefined,
            tabBarBadgeStyle: {
              backgroundColor: CustomDarkTheme.colors.primary,
              color: "black",
            },
            tabBarLabelStyle: [
              pathname === "/cart"
                ? fontStyles["Poppins-SemiBold"]
                : fontStyles["Poppins-Regular"],
            ],
          }}
        />
        <Tabs.Screen
          name="referrals"
          options={{
            tabBarIcon: ({ color }: { color: string }) => (
              <UserAddIcon color={color} />
            ),
            title: "Affiliate for users",
            tabBarLabel: "Referrals",
            tabBarLabelStyle: [
              pathname === "/referrals"
                ? fontStyles["Poppins-SemiBold"]
                : fontStyles["Poppins-Regular"],
            ],
          }}
        />
      </Tabs>
      {/* <Tabs
        options={{
          unmountOnBlur: true,
          detachInactiveScreens: true,
          tabBarHideOnKeyboard: true,
        }}
      >
        <TabSlot />
        <TabList
          style={{
            paddingVertical: getHeightSize(17),
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
            <CustomBottomTabButton name="cart" href="/cart" label="My Cart" />
          </TabTrigger>
          <TabTrigger name="referrals" href="/referrals" asChild>
            <CustomBottomTabButton
              name="referrals"
              href="/referrals"
              label="Referrals"
            />
          </TabTrigger>
        </TabList>
      </Tabs> */}
    </>
  );
}
