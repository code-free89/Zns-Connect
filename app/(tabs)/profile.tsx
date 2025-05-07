import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import ZnsScrollView from "@/components/ui/ScrollView";
import ProfileAccounts from "@/components/zns/profile/ProfileAccounts";
import ProfileBio from "@/components/zns/profile/ProfileBio";
import ProfileHIP from "@/components/zns/profile/ProfileHIP";
import ProfileInfoTabs from "@/components/zns/profile/ProfileInfoTabs";
import ProfileOverView from "@/components/zns/profile/ProfileOverView";
import ProfileType from "@/components/zns/profile/ProfileType";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useTLD } from "@/hooks/web3/useTLD";
import ProfileProvider from "@/lib/providers/ProfileProvider";
import { useAppSelector } from "@/store";

export default function ProfileScreen() {
  const { domain } = useLocalSearchParams();
  const { chainId } = useAccount();
  const tld = useTLD(chainId);
  const { userPrimaryDomain } = useAppSelector((state) => state.user);
  const primaryDomain = useMemo(
    () =>
      userPrimaryDomain?.domainName
        ? `${userPrimaryDomain.domainName}.${tld}`
        : "",
    [userPrimaryDomain, tld]
  );

  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
          Profile
        </Text>
      </View>
      <ZnsScrollView style={{ padding: 0 }}>
        <View style={styles.container}>
          <ProfileOverView />

          <View style={{ paddingHorizontal: 16, gap: 20 }}>
            <ProfileBio />

            <ProfileHIP />

            <ProfileType />

            <ProfileAccounts />
          </View>

          <ProfileInfoTabs />
        </View>

        <ProfileProvider domain={(domain as string) || primaryDomain} />
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
