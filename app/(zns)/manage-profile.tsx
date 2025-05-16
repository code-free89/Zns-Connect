import React, { useState } from "react";

import ZnsScrollView from "@/components/ui/ScrollView";
import TabHeaders from "@/components/ui/TabHeaders";
import ManageDomain from "@/components/zns/manage-profile/Domain";
import PersonalInfo from "@/components/zns/manage-profile/PersonalInfo";
import ProfileLinks from "@/components/zns/manage-profile/links";
import DomainSwitcher from "@/components/zns/modules/domain-switcher";
import { useAppSelector } from "@/store";
import { getHeightSize, getWidthSize } from "@/utils/size";

type InfoTab = "personal_info" | "links" | "domains";

export default function ManageProfile() {
  const [selectedTab, setSelectedTab] = useState<InfoTab>("personal_info");
  const { profile, ownerStore, domain, tld } = useAppSelector(
    (state) => state.profile
  );

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
        containerStyle={{
          width: getWidthSize(130),
          height: getHeightSize(32),
        }}
      />
      <TabHeaders selectedTab={selectedTab} tabs={tabs} fullWidth />

      {selectedTab === "personal_info" && <PersonalInfo />}
      {selectedTab === "links" && <ProfileLinks />}
      {selectedTab === "domains" && <ManageDomain />}
    </ZnsScrollView>
  );
}
