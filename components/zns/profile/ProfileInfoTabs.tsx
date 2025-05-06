import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import TabHeaders from "@/components/ui/TabHeaders";
import SocialAccounts from "@/components/zns/profile/accounts";
import BadgeList from "@/components/zns/profile/BadgeList";
import ProfileFollowers from "@/components/zns/profile/Followers";
import { useAppSelector } from "@/store";
import React from "react";

type InfoTab = "socials" | "badges" | "followers" | "following";

export default function ProfileInfoTabs() {
  const { profile, ownerStore } = useAppSelector((state) => state.profile);
  const [selectedTab, setSelectedTab] = useState<InfoTab>("socials");
  const tabs = useMemo(
    () => [
      {
        label: "Socials",
        value: "socials",
        onSelectTab: () => setSelectedTab("socials"),
      },
      {
        label: `Badges(${ownerStore?.badges?.length || 0})`,
        value: "badges",
        onSelectTab: () => setSelectedTab("badges"),
      },
      {
        label: `Followers(${ownerStore?.followers?.length || 0})`,
        value: "followers",
        onSelectTab: () => setSelectedTab("followers"),
      },
      {
        label: `Following(${ownerStore?.following?.length || 0})`,
        value: "following",
        onSelectTab: () => setSelectedTab("following"),
      },
    ],
    [profile, ownerStore]
  );

  return (
    <React.Fragment>
      <TabHeaders
        selectedTab={selectedTab}
        tabs={tabs}
        tabStyle={{
          paddingHorizontal: 40,
        }}
      />
      <View style={styles.tabContent}>
        {selectedTab === "socials" && <SocialAccounts />}
        {selectedTab === "badges" && <BadgeList />}
        {selectedTab === "followers" && <ProfileFollowers />}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 40,
  },
});
