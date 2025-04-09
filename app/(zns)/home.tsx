import { StyleSheet, View } from "react-native";
import { useAccount, useBalance } from "wagmi";

import ZnsScrollView from "@/components/ui/ScrollView";
import AccountInfo from "@/components/zns/home/AccountInfo";
import AccountStatus from "@/components/zns/home/AccountStatus";
import NetworkSelect from "@/components/zns/home/NetworkSelect";
import SplitLine from "@/components/ui/SplitLine";

export default function HomeScreen() {
  const account = useAccount();
  const balance = useBalance({ address: account.address });

  return (
    <ZnsScrollView>
      <View style={styles.container}>
        <AccountInfo
          account={{
            address: account.address ?? "",
            balance: balance.data?.formatted ?? "0",
          }}
        />
        <SplitLine />
        <NetworkSelect />
        <AccountStatus />
        <SplitLine />
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 20,
  },
});
