import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import ZnsScrollView from "@/components/ui/ScrollView";
import SplitLine from "@/components/ui/SplitLine";
import AccountInfo from "@/components/zns/home/AccountInfo";
import AccountStatus from "@/components/zns/home/AccountStatus";
import ActionButtons from "@/components/zns/home/ActionButtons";
import NetworkSelect from "@/components/zns/home/NetworkSelect";
import { useTLD } from "@/hooks/web3/useTLD";
import ProfileProvider from "@/lib/providers/ProfileProvider";
import { useAppSelector } from "@/store";
import { getHeightSize } from "@/utils/size";

export default function HomeScreen() {
  const { chainId } = useAccount();
  const tld = useTLD(chainId);
  const { userPrimaryDomain } = useAppSelector((state) => state.user);
  const primaryDomain = useMemo(
    () =>
      userPrimaryDomain?.domainName
        ? `${userPrimaryDomain.domainName}.${tld}`
        : "",
    [userPrimaryDomain, tld]
  );

  return (
    <ZnsScrollView>
      {!!primaryDomain && <ProfileProvider domain={primaryDomain} />}
      <View style={styles.container}>
        <AccountInfo />

        <NetworkSelect />

        <ActionButtons />

        <AccountStatus />

        <SplitLine />

        {/* <AccountDomains /> */}
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getHeightSize(20),
  },
});
