import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import GetLinkCarousel from "@/components/zns/referral/GetLinkCarousel";
import ReferralStatus from "@/components/zns/referral/ReferralStatus";
import ReferralTabs from "@/components/zns/referral/ReferralTabs";
import RewardGraph from "@/components/zns/RewardGraph";
import { fontStyles } from "@/constants/fonts";
import { REWARDS } from "@/constants/profile";
import { CustomDarkTheme } from "@/constants/theme";
import ReferralProvider from "@/lib/providers/ReferralProvider";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ReferralsScreen() {
  const { numberOfReferrals } = useAppSelector((state) => state.referral);
  const { currentLevel, nextLevel } = useMemo(() => {
    let index = REWARDS.length;
    while (index > 0 && REWARDS[--index].refer > numberOfReferrals);
    const currentLevel =
      index === 0
        ? REWARDS[0].refer <= numberOfReferrals
          ? REWARDS[0]
          : { level: 0, refer: 0, reward: 0, color: "", percent: 0 }
        : REWARDS[index];
    const nextLevel =
      REWARDS[currentLevel.level === 5 ? 4 : currentLevel.level];
    return {
      currentLevel,
      nextLevel,
    };
  }, [numberOfReferrals]);

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

        <RewardGraph
          currentLevel={currentLevel}
          nextLevel={nextLevel}
          totalReferrals={numberOfReferrals}
        />

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
