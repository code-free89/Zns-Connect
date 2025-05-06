import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import TabHeaders from "@/components/ui/TabHeaders";
import SocialAccounts from "@/components/zns/profile/accounts";
import BadgeList from "@/components/zns/profile/badges";
import ProfileFollowers from "@/components/zns/profile/followers";
import ProfileFollowingList from "@/components/zns/profile/following";
import { useAppSelector } from "@/store";

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
        label: `Followers(${profile?.followers?.length || 0})`,
        value: "followers",
        onSelectTab: () => setSelectedTab("followers"),
      },
      {
        label: `Following(${profile?.following?.length || 0})`,
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
        {selectedTab === "following" && <ProfileFollowingList />}
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
