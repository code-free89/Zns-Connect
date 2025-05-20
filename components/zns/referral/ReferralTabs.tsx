import { useState } from "react";
import { View } from "react-native";

import TabHeaders from "@/components/ui/TabHeaders";
import LeaderBoard from "@/components/zns/referral/LeaderBoard";
import MyReferrals from "@/components/zns/referral/MyReferrals";
import { getHeightSize } from "@/utils/size";

export default function ReferralTabs() {
  const [selectedTab, setSelectedTab] = useState("referrals");

  const tabs = [
    {
      label: "My Referrals",
      value: "referrals",
      onSelectTab: () => {
        setSelectedTab("referrals");
      },
    },
    {
      label: "Leaderboard",
      value: "leaderboard",
      onSelectTab: () => {
        setSelectedTab("leaderboard");
      },
    },
  ];

  return (
    <View style={{ marginTop: getHeightSize(16) }}>
      <TabHeaders selectedTab={selectedTab} tabs={tabs} fullWidth />

      {selectedTab === "referrals" && <MyReferrals />}
      {selectedTab === "leaderboard" && <LeaderBoard />}
    </View>
  );
}
