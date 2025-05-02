import { useState } from "react";
import { View } from "react-native";

import TabHeaders from "@/components/ui/TabHeaders";
import BadgeView from "@/components/zns/badges/BadgeView";
import BadgeProvider from "@/lib/providers/BadgeProvider";

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
          paddingHorizontal: 40,
        }}
        containerStyle={{ height: 60 }}
      />
      <BadgeView selectedTab={selectedTab} />
    </View>
  );
}
