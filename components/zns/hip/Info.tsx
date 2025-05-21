import { useAppKit } from "@reown/appkit-wagmi-react-native";
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAccount, useSwitchChain } from "wagmi";

import InteractiveButton from "@/components/ui/InteractiveButton";
import ProgressBar from "@/components/zns/ProgressBar";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import useScreenSize from "@/hooks/useScreenSize";
import { useCheckoutHIP } from "@/hooks/web3/useCheckoutHIP";
import { mintHIP } from "@/lib/api/hip";
import { useAppDispatch, useAppSelector } from "@/store";
import { setHIPData } from "@/store/slices/hip";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showErrorToast } from "@/utils/toast";

export default function HipInfo() {
  const dispatch = useAppDispatch();
  const { chainId, address, isConnected } = useAccount();
  const hipData = useAppSelector((state) => state.hip);
  const { open } = useAppKit();
  const { width } = useScreenSize();
  const progressWidth = width - getWidthSize(56) - getWidthSize(16);
  const { switchChainAsync } = useSwitchChain();

  const saveMintHIP = async () => {
    if (address) {
      const res = await mintHIP(address);
      if (res) {
        dispatch(
          setHIPData({ id: res.id, walletAddress: address, totalPoints: 300 })
        );
      }
    }
  };

  const { isEnoughBalance, isProcessing, onCheckoutHIP } =
    useCheckoutHIP(saveMintHIP);

  const mintTitle = useMemo(() => {
    if (isConnected) {
      if (chainId === NETWORKS.INKMAINNET) {
        return isEnoughBalance ? "Mint HIP Now" : "Insufficient Balance";
      } else {
        return "Switch network";
      }
    }
    return "Connect Wallet";
  }, [hipData.id, isConnected, chainId, isEnoughBalance]);

  const handleMintHip = async () => {
    try {
      if (isConnected && address) {
        if (chainId !== NETWORKS.INKMAINNET) {
          await switchChainAsync({ chainId: NETWORKS.INKMAINNET });
        } else {
          onCheckoutHIP();
        }
      } else {
        open();
      }
    } catch (e) {
      console.error("Error minting HIP:", e);
      showErrorToast("Failed to mint HIP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Score Container */}
      <View style={styles.scoreContainer}>
        <Text style={styles.title}>
          <Text style={styles.score}>{hipData.totalPoints}</Text>
          {"  "}Current Score {hipData.id ? "Compiled" : ""}
        </Text>
        <ProgressBar
          totalPoints={hipData.totalPoints}
          maxPoints={hipData.maxPoints}
          progressWidth={progressWidth}
        />
        {!hipData.id && (
          <InteractiveButton
            title={mintTitle}
            style={styles.mintButton}
            textStyle={styles.mintButtonText}
            onPress={() => handleMintHip()}
          />
        )}
      </View>

      {/* Hip Profile Status */}
      <View style={styles.row}>
        {hipData.id ? (
          <View style={styles.statusItem}>
            <Text style={styles.statusTitle}>
              {hipData.totalPoints}{" "}
              <Text style={styles.statusTitleSub}>XP</Text>
            </Text>
            <Text style={styles.description}>Total points</Text>
          </View>
        ) : (
          <View style={styles.statusItem}>
            <Text style={styles.statusTitle}>{hipData.totalEarnings} XP</Text>
            <Text style={styles.description}>Total Rewards</Text>
          </View>
        )}

        <View style={styles.statusItem}>
          <Text style={styles.statusTitle}>{hipData.rank}</Text>
          <Text style={styles.description}>of {hipData.totalUsers} users</Text>
        </View>

        {hipData.id ? (
          <View style={styles.statusItem}>
            <Text style={styles.statusTitle}>
              {hipData.totalEarnings.toFixed(5)}{" "}
              <Text style={styles.statusTitleSub}>ETH</Text>
            </Text>
            <Text style={styles.description}>Total earnings</Text>
          </View>
        ) : (
          <View style={styles.statusItem}>
            <Text style={styles.statusTitle}>300{hipData.domainPoints} XP</Text>
            <Text style={styles.description}>For minting HIP</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getHeightSize(24),
  },
  scoreContainer: {
    borderRadius: getWidthSize(12),
    padding: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  title: {
    ...fontStyles["Poppins-Regular"],
    lineHeight: getFontSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
    marginBottom: getHeightSize(8),
  },
  score: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.35,
    color: "white",
  },
  mintButton: {
    marginTop: getHeightSize(16),
    paddingVertical: getHeightSize(12),
  },
  mintButtonText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    color: "black",
    textTransform: "capitalize",
  },
  row: {
    flexDirection: "row",
    gap: getWidthSize(8),
    marginTop: getHeightSize(8),
  },
  statusItem: {
    flex: 1,
    padding: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(12),
    gap: getHeightSize(10),
  },
  statusTitle: {
    ...fontStyles["SpaceGrotesk-Bold"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.35,
    color: CustomDarkTheme.colors.primary,
  },
  statusTitleSub: {
    fontSize: getFontSize(10),
  },
  description: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(10),
    lineHeight: getFontSize(10) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
});
