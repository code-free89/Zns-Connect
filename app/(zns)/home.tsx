import { StyleSheet, Text, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import AccountInfo from "@/components/zns/home/AccountInfo";
import { useAccount, useBalance } from "wagmi";

export default function HomeScreen() {
  const account = useAccount();
  const balance = useBalance({ address: account.address });

  return (
    <ZnsScrollView>
      <AccountInfo
        account={{
          address: account.address ?? "",
          balance: balance.data?.formatted ?? "0",
        }}
      />
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
