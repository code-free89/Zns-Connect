import { useLocalSearchParams } from "expo-router";
import { useState } from "react";

import ZnsScrollView from "@/components/ui/ScrollView";
import TabHeaders from "@/components/ui/TabHeaders";
import CreditsAndGiftCards from "@/components/zns/general-settings/Credits";
import EmailSettings from "@/components/zns/general-settings/Emails";

type InfoTab = "credits" | "email";

export default function GeneralSettings() {
  const { source } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<InfoTab>(
    (source as InfoTab) ?? "credits"
  );
  const tabs = [
    {
      label: "Credits & Gift cards",
      value: "credits",
      onSelectTab: () => setSelectedTab("credits"),
    },
    {
      label: "Email",
      value: "email",
      onSelectTab: () => setSelectedTab("email"),
    },
  ];

  return (
    <ZnsScrollView>
      <TabHeaders selectedTab={selectedTab} tabs={tabs} fullWidth />

      {selectedTab === "credits" && <CreditsAndGiftCards />}
      {selectedTab === "email" && <EmailSettings />}
    </ZnsScrollView>
  );
}
