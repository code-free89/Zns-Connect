import { useState } from "react";
import { StyleSheet, View } from "react-native";

import TabHeaders from "@/components/ui/TabHeaders";
import BadgeList from "@/components/zns/profile/BadgeList";
import SocialAccounts from "@/components/zns/profile/SocialAccounts";
import ProfileFollowers from "@/components/zns/profile/Followers";

type InfoTab = "socials" | "badges" | "followers";

export default function ProfileInfoTabs() {
  const [selectedTab, setSelectedTab] = useState<InfoTab>("socials");
  const tabs = [
    {
      label: "Socials",
      value: "socials",
      onSelectTab: () => setSelectedTab("socials"),
    },
    {
      label: "Badges",
      value: "badges",
      onSelectTab: () => setSelectedTab("badges"),
    },
    {
      label: "Followers",
      value: "followers",
      onSelectTab: () => setSelectedTab("followers"),
    },
  ];

  return (
    <View>
      <TabHeaders selectedTab={selectedTab} tabs={tabs} />
      <View style={styles.tabContent}>
        {selectedTab === "socials" && <SocialAccounts />}
        {selectedTab === "badges" && <BadgeList />}
        {selectedTab === "followers" && <ProfileFollowers />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
});
