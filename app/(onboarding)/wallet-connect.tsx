import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletInfo } from "@web3modal/wagmi-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import GetStartedModal from "@/components/zns/get-started/GetStartedModal";
import OnboardingCarousel from "@/components/zns/onboarding/OnboardingCarousel";
import { W3mButton } from "@/components/zns/web3modal";
import { CustomDarkTheme } from "@/constants/theme";
import useScreenSize from "@/hooks/useScreenSize";
import { getOrCreateUserIdByAddress } from "@/lib/api/user";
import { useAppDispatch } from "@/store";
import { setUserSession } from "@/store/slices/user";
import { LinearGradient } from "expo-linear-gradient";

export default function WalletConnectScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { height, width } = useScreenSize();
  const { isConnected, address } = useAccount();
  const { walletInfo } = useWalletInfo();
  const [getStartedModalVisible, setGetStartedModalVisible] = useState(false);

  useEffect(() => {
    const handleGetStartedStatus = async () => {
      const getStartedStatus = await AsyncStorage.getItem("get_started");
      setGetStartedModalVisible(!getStartedStatus && isConnected);
    };

    handleGetStartedStatus();

    const handleGetOrCreateUserIdByAddress = async () => {
      if (isConnected && address) {
        const { data } = await getOrCreateUserIdByAddress(address);
        const session = { id: data.id, address };
        dispatch(setUserSession(session));
      }
    };

    handleGetOrCreateUserIdByAddress();
  }, [isConnected, address]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0E1100", "#12060600"]}
        style={[styles.gradient, { width: width, height: height }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        pointerEvents="none"
      />
      <View style={{ flex: 1, zIndex: 10 }}>
        <OnboardingCarousel />
      </View>
      {isConnected && (
        <GetStartedModal
          isVisible={isConnected && getStartedModalVisible}
          walletAddress={address ?? ""}
          walletInfo={walletInfo}
          onGetStarted={() => {
            AsyncStorage.setItem("get_started", "true");
            setGetStartedModalVisible(false);
            router.replace("/(tabs)/home");
          }}
        />
      )}

      <View
        style={{ height: height / 10, minHeight: 50, paddingHorizontal: 16 }}
      >
        <W3mButton
          connectStyle={{
            backgroundColor: CustomDarkTheme.colors.primary,
            borderRadius: 11,
            height: 50,
            marginTop: "auto",
            marginBottom: 80,
          }}
          accountStyle={{
            backgroundColor: "red",
          }}
          label="Connect Wallet"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
  },
  gradient: {
    position: "absolute",
    left: 0,
    top: 1,
    zIndex: 100,
    opacity: 0.4,
  },
});
