import { useWeb3Modal, W3mButton } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

// import AnimatedCarousel from "@/components/ui/AnimatedCarousel";

export default function WalletConnectScreen() {
  const { isConnected } = useAccount();
  console.log("isConnected", isConnected);

  return (
    <View style={styles.container}>
      {/* <AnimatedCarousel /> */}
      <W3mButton
        connectStyle={{
          backgroundColor: CustomDarkTheme.colors.primary,
          borderRadius: 11,
          height: 50,
        }}
        label="Connect Wallet"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
