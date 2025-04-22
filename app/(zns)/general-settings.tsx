import { useState } from "react";
import { StyleSheet } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import TabHeaders from "@/components/ui/TabHeaders";
import CreditsAndGiftCards from "@/components/zns/general-settings/Credits";
import EmailSettings from "@/components/zns/general-settings/Emails";
import { CustomDarkTheme } from "@/constants/theme";

type InfoTab = "credits" | "email";

export default function GeneralSettings() {
  const [selectedTab, setSelectedTab] = useState<InfoTab>("credits");
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

const styles = StyleSheet.create({
  creditsContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 10,
    marginTop: 24,
  },
  title: {
    fontSize: 16,
    color: CustomDarkTheme.colors.txtColor,
  },
  key: {
    fontSize: 14,
    color: CustomDarkTheme.colors.body,
  },
  creditButton: {
    borderRadius: 12,
    width: "auto",
    backgroundColor: "#05ABFF",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  creditText: {
    color: "#243300",
  },
});
