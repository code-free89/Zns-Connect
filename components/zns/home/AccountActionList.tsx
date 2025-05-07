import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";

import { fontStyles } from "@/constants/fonts";
import { CopyIcon, UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { copyToClipboard } from "@/utils/helpers";
import { getWidthSize } from "@/utils/size";
import { getHeightSize } from "@/utils/size";
import { showSuccessToast } from "@/utils/toast";

export default function AccountActionList({
  onClose,
}: {
  onClose: () => void;
}) {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  const disconnectWallet = async () => {
    disconnect();
    await AsyncStorage.removeItem("get_started");
    setTimeout(() => {
      router.replace("/(onboarding)/wallet-connect");
    }, 500);
  };

  const copyWalletAddress = async () => {
    await copyToClipboard(address ?? "");
    showSuccessToast("Wallet address copied to clipboard");
    onClose();
  };

  const goToGeneralSettings = () => {
    onClose();
    router.push("/(zns)/general-settings");
  };

  const openCommunity = (community: string) => {
    if (community === "Blog") {
      Linking.openURL("https://znsconnect.medium.com");
    } else if (community === "Docs") {
      Linking.openURL("https://docs.znsconnect.io");
    } else if (community === "Socials") {
      Linking.openURL("https://docs.znsconnect.io");
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable style={styles.actionItem} onPress={copyWalletAddress}>
          <CopyIcon />
          <Text style={styles.actionItemText}>Copy wallet address</Text>
        </Pressable>

        <Pressable style={styles.actionItem} onPress={goToGeneralSettings}>
          <Octicons
            name="gear"
            size={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>General settings</Text>
        </Pressable>

        <View style={styles.actionItem}>
          <UserIcon
            width={20}
            height={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>Community</Text>
        </View>
        <View style={styles.communityContainer}>
          <Text
            style={styles.communityItem}
            onPress={() => openCommunity("Blog")}
          >
            Blog
          </Text>
          <Text
            style={styles.communityItem}
            onPress={() => openCommunity("Docs")}
          >
            Docs
          </Text>
          <Text
            style={styles.communityItem}
            onPress={() => openCommunity("Socials")}
          >
            Socials
          </Text>
        </View>

        <Pressable style={styles.actionItem} onPress={disconnectWallet}>
          <AntDesign
            name="logout"
            size={20}
            color={CustomDarkTheme.colors.error}
          />
          <Text
            style={[
              fontStyles["Poppins-Regular"],
              styles.actionItemText,
              { color: CustomDarkTheme.colors.error },
            ]}
          >
            Disconnect wallet
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    backgroundColor: "black",
    padding: getWidthSize(16),
    borderRadius: 12,
    width: getWidthSize(280),
  },
  container: {
    flexDirection: "column",
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 16,
    padding: getWidthSize(14),
    gap: getHeightSize(24),
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
  actionItemText: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.txtColor,
    fontSize: getHeightSize(16),
    lineHeight: getHeightSize(16 * 1.5),
  },
  communityContainer: {
    gap: getHeightSize(16),
  },
  communityItem: {
    color: CustomDarkTheme.colors.txtColor,
    marginLeft: getWidthSize(30),
  },
});
