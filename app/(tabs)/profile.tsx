import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import ProfileAccounts from "@/components/zns/profile/ProfileAccounts";
import ProfileBio from "@/components/zns/profile/ProfileBio";
import ProfileHIP from "@/components/zns/profile/ProfileHIP";
import ProfileInfoTabs from "@/components/zns/profile/ProfileInfoTabs";
import ProfileType from "@/components/zns/profile/ProfileType";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import ProfileProvider from "@/lib/providers/ProfileProvider";

export default function HomeScreen() {
  const { domain } = useLocalSearchParams();

  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
          Profile
        </Text>
      </View>
      <ZnsScrollView style={{ paddingHorizontal: 0 }}>
        <View style={styles.container}>
          <View style={{ paddingHorizontal: 16, gap: 20 }}>
            <ProfileBio />

            <ProfileHIP />

            <ProfileType />

            <ProfileAccounts />
          </View>

          <ProfileInfoTabs />
        </View>

        <ProfileProvider domain="hello.ink" />
      </ZnsScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  pageTitle: {
    height: 42,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: CustomDarkTheme.colors.txtColor,
  },
});
