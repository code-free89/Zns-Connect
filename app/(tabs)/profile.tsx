import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
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
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ProfileScreen() {
  const { domain } = useLocalSearchParams();
  const { chainId } = useAccount();
  const tld = useTLD(chainId);
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const { userPrimaryDomain, isLoadingPrimaryDomainDB } = useAppSelector(
    (state) => state.user
  );
  const primaryDomain = useMemo(
    () =>
      userPrimaryDomain?.domainName
        ? `${userPrimaryDomain.domainName}.${tld}`
        : "",
    [userPrimaryDomain, tld]
  );

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => {
        router.setParams({});
        setIsFocused(false);
      };
    }, [])
  );

  if (!isFocused) return null;

  return (
    <ZnsScrollView style={{ paddingHorizontal: 0, paddingTop: 0 }}>
      {/* <View style={styles.pageTitle}>
        <Text style={styles.title}>Profile</Text>
      </View> */}

      {isLoadingPrimaryDomainDB ? null : primaryDomain || domain ? (
        <>
          <ProfileOverView />

          <View
            style={{
              paddingHorizontal: getWidthSize(16),
              gap: getHeightSize(12),
            }}
          >
            <ProfileBio />

            <ProfileHIP />

            <ProfileType />

            <ProfileAccounts />
          </View>

          <ProfileInfoTabs />
        </>
      ) : (
        <View style={styles.noPrimaryDomainContainer}>
          <Image
            source={require("@/assets/images/icons/empty/info.png")}
            style={styles.noPrimaryDomainImage}
          />
          <Text style={styles.noPrimaryDomainText}>
            You don't have primary domain yet
          </Text>
        </View>
      )}

      <ProfileProvider domain={(domain as string) || primaryDomain} />
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    height: getHeightSize(72),
    marginTop: getHeightSize(44),
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  noPrimaryDomainContainer: {
    paddingHorizontal: getWidthSize(16),
    gap: getHeightSize(12),
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  noPrimaryDomainImage: {
    width: getWidthSize(100),
    height: getWidthSize(100),
  },
  noPrimaryDomainText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    color: CustomDarkTheme.colors.body,
  },
});
