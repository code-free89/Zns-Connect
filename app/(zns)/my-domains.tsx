import React from "react";

import ZnsScrollView from "@/components/ui/ScrollView";
import AccountDomains from "@/components/zns/home/AccountDomains";

export default function MyDomainsPage() {
  return (
    <ZnsScrollView>
      <AccountDomains />
    </ZnsScrollView>
  );
}
