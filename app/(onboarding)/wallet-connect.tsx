import AsyncStorage from "@react-native-async-storage/async-storage";
import { useWalletInfo } from "@reown/appkit-wagmi-react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import W3ModalButton from "@/components/ui/W3ModalButton";
import GetStartedModal from "@/components/zns/get-started/GetStartedModal";
import OnboardingCarousel from "@/components/zns/onboarding/OnboardingCarousel";
import { CustomDarkTheme } from "@/constants/theme";
import { getOrCreateUserIdByAddress } from "@/lib/api/user";
import { useAppDispatch } from "@/store";
import { setUserSession } from "@/store/slices/user";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function WalletConnectScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
      <View style={{ flex: 1 }}>
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

      <View style={styles.W3ButtonContainer}>
        <W3ModalButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: getHeightSize(16),
  },
  W3Button: {
    backgroundColor: CustomDarkTheme.colors.primary,
    borderRadius: getWidthSize(11),
    height: getHeightSize(50),
    marginTop: "auto",
    zIndex: 1000,
  },
  W3ButtonContainer: {
    minHeight: getHeightSize(50),
    paddingHorizontal: getWidthSize(16),
    marginBottom: getHeightSize(80),
    zIndex: 1000,
  },
});
