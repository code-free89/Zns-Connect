import React from "react";

import ZnsScrollView from "@/components/ui/ScrollView";
import AccountDomains from "@/components/zns/home/AccountDomains";
import { getHeightSize } from "@/utils/size";

export default function MyDomainsPage() {
  return (
    <ZnsScrollView style={{ paddingTop: getHeightSize(12) }}>
      <AccountDomains />
    </ZnsScrollView>
  );
}
