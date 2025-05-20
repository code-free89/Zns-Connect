import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GetLinkCarousel from "@/components/zns/referral/GetLinkCarousel";
import ReferralStatus from "@/components/zns/referral/ReferralStatus";
import ReferralTabs from "@/components/zns/referral/ReferralTabs";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import ReferralProvider from "@/lib/providers/ReferralProvider";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import ZnsScrollView from "@/components/ui/ScrollView";

export default function ReferralsScreen() {
  return (
    <ZnsScrollView style={{ padding: 0 }}>
      <View style={styles.pageTitle}>
        <Text style={styles.title}>Affiliate for users</Text>
      </View>
      <View style={{ flex: 1, padding: getWidthSize(16) }}>
        <Text style={styles.getRewardTitle}>
          {"Get rewarded for bringing\nfriends on board!"}
        </Text>

        <GetLinkCarousel />

        <ReferralStatus />

        <ReferralTabs />
      </View>

      <ReferralProvider />
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
  getRewardTitle: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    letterSpacing: 0.28,
    color: "#DFE5F3",
    textAlign: "center",
    marginVertical: getHeightSize(12),
  },
});
