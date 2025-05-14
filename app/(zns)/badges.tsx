import { useState } from "react";
import { StyleSheet, View } from "react-native";

import TabHeaders from "@/components/ui/TabHeaders";
import BadgeView from "@/components/zns/badges/BadgeView";
import { fontStyles } from "@/constants/fonts";
import BadgeProvider from "@/lib/providers/BadgeProvider";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type InfoTab = "all" | "unclaimed" | "claimed" | "not_available";

export default function Badges() {
  const [selectedTab, setSelectedTab] = useState<InfoTab>("all");

  const tabs = [
    {
      label: "All",
      value: "all",
      onSelectTab: () => setSelectedTab("all"),
    },
    {
      label: "Unclaimed",
      value: "unclaimed",
      onSelectTab: () => setSelectedTab("unclaimed"),
    },
    {
      label: "Claimed",
      value: "claimed",
      onSelectTab: () => setSelectedTab("claimed"),
    },
    {
      label: "Not available",
      value: "not_available",
      onSelectTab: () => setSelectedTab("not_available"),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <BadgeProvider />
      <TabHeaders
        selectedTab={selectedTab}
        tabs={tabs}
        tabStyle={{
          paddingHorizontal: getWidthSize(20),
        }}
        tabTextStyle={styles.tabTextStyle}
        containerStyle={{
          height: getHeightSize(50),
        }}
      />
      <BadgeView selectedTab={selectedTab} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabTextStyle: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
  },
});
