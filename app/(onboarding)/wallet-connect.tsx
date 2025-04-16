import GetStartedModal from "@/components/zns/get-started/GetStartedModal";
import { W3mButton } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";
import { useWalletInfo } from "@web3modal/wagmi-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

// import AnimatedCarousel from "@/components/ui/AnimatedCarousel";

export default function WalletConnectScreen() {
  const router = useRouter();
  const { isConnected, address } = useAccount();
  const { walletInfo } = useWalletInfo();
  const [getStartedModalVisible, setGetStartedModalVisible] = useState(false);

  useEffect(() => {
    setGetStartedModalVisible(isConnected);
  }, [isConnected]);

  return (
    <View style={styles.container}>
      {/* <AnimatedCarousel /> */}
      {isConnected ? (
        <GetStartedModal
          isVisible={isConnected && getStartedModalVisible}
          walletAddress={address ?? ""}
          walletInfo={walletInfo}
          onGetStarted={() => {
            setGetStartedModalVisible(false);
            router.replace("/(zns)");
          }}
        />
      ) : (
        <W3mButton
          connectStyle={{
            backgroundColor: CustomDarkTheme.colors.primary,
            borderRadius: 11,
            height: 50,
          }}
          label="Connect Wallet"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
