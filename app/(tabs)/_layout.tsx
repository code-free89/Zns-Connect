import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Tabs } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import React, { useEffect, useState } from "react";

import CustomBottomTabButton from "@/components/CustomBottomTabButton";
import ReferralCodeModal from "@/components/zns/referral-code/ReferralCodeModal";
import { CustomDarkTheme } from "@/constants/theme";

export default function TabsLayout() {
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
