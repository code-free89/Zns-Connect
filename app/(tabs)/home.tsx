import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import ZnsScrollView from "@/components/ui/ScrollView";
import SplitLine from "@/components/ui/SplitLine";
import AccountDomains from "@/components/zns/home/AccountDomains";
import AccountInfo from "@/components/zns/home/AccountInfo";
import AccountStatus from "@/components/zns/home/AccountStatus";
import ActionButtons from "@/components/zns/home/ActionButtons";
import NetworkSelect from "@/components/zns/home/NetworkSelect";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useTLD } from "@/hooks/web3/useTLD";
import ProfileProvider from "@/lib/providers/ProfileProvider";
import { useAppSelector } from "@/store";
import { getHeightSize } from "@/utils/size";

export default function HomeScreen() {
  const { chainId } = useAccount();
  const tld = useTLD(chainId);
  const { userPrimaryDomain } = useAppSelector((state) => state.user);
  const domains = useAppSelector((state) => state.userDomains.domains);
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

        <ActionButtons />

        <AccountStatus />

        <NetworkSelect />

        <Text style={styles.myDomainsTitle}>
          MY DOMAINS ({domains?.length || 0})
        </Text>
      </View>

      <View style={{ marginVertical: getHeightSize(12) }}>
        <SplitLine />
      </View>

      <AccountDomains />
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getHeightSize(20),
  },
  myDomainsTitle: {
    ...fontStyles["Poppins-Medium"],
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "center",
    fontSize: getHeightSize(20),
    letterSpacing: -1.2,
  },
});
