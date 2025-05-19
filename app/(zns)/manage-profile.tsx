import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import TabHeaders from "@/components/ui/TabHeaders";
import ManageDomain from "@/components/zns/manage-profile/Domain";
import PersonalInfo from "@/components/zns/manage-profile/PersonalInfo";
import ProfileLinks from "@/components/zns/manage-profile/links";
import DomainSwitcher from "@/components/zns/modules/domain-switcher";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import ProfileProvider from "@/lib/providers/ProfileProvider";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type InfoTab = "personal_info" | "links" | "domains";

export default function ManageProfile() {
  const { domain } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState<InfoTab>("personal_info");

  const tabs = [
    {
      label: "Personal info",
      value: "personal_info",
      onSelectTab: () => setSelectedTab("personal_info"),
    },
    {
      label: "Links",
      value: "links",
      onSelectTab: () => setSelectedTab("links"),
    },
    {
      label: "Domains",
      value: "domains",
      onSelectTab: () => setSelectedTab("domains"),
    },
  ];

  return (
    <ZnsScrollView>
      <DomainSwitcher
        containerStyle={styles.domainSwitcherContainer}
        dropdownContainerStyle={styles.dropdownContainerStyle}
        textStyle={styles.domainName}
      />

      <TabHeaders
        selectedTab={selectedTab}
        tabs={tabs}
        fullWidth
        containerStyle={{ marginTop: getHeightSize(8) }}
      />

      {selectedTab === "personal_info" && <PersonalInfo />}
      {selectedTab === "links" && <ProfileLinks />}
      {selectedTab === "domains" && <ManageDomain />}

      <ProfileProvider domain={domain as string} />
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  domainSwitcherContainer: {
    width: "100%",
    height: getHeightSize(50),
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(12),
  },
  dropdownContainerStyle: {
    top: getHeightSize(54),
    left: 0,
    width: "100%",
  },
  domainName: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
  },
});
