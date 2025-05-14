import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import ZnsScrollView from "@/components/ui/ScrollView";
import TabHeaders from "@/components/ui/TabHeaders";
import CreditsAndGiftCards from "@/components/zns/general-settings/Credits";
import EmailSettings from "@/components/zns/general-settings/Emails";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { getHeightSize } from "@/utils/size";

type InfoTab = "credits" | "email";

export default function GeneralSettings() {
  const { source } = useLocalSearchParams();
  const { updateStoreGift } = useFetchGiftCard();
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

  useEffect(() => {
    updateStoreGift();
  }, [updateStoreGift]);

  return (
    <ZnsScrollView style={{ paddingTop: getHeightSize(4) }}>
      <TabHeaders selectedTab={selectedTab} tabs={tabs} fullWidth />

      {selectedTab === "credits" && <CreditsAndGiftCards />}
      {selectedTab === "email" && <EmailSettings />}
    </ZnsScrollView>
  );
}
