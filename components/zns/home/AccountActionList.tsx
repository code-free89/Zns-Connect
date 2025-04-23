import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";

import ZnsText from "@/components/ui/Text";
import { CopyIcon, UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { copyToClipboard } from "@/utils/helpers";
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
    router.replace("/(onboarding)/wallet-connect");
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
          <ZnsText style={styles.actionItemText}>Copy wallet address</ZnsText>
        </Pressable>

        <Pressable style={styles.actionItem} onPress={goToGeneralSettings}>
          <Octicons
            name="gear"
            size={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <ZnsText style={styles.actionItemText}>General settings</ZnsText>
        </Pressable>

        <View style={styles.actionItem}>
          <UserIcon
            width={20}
            height={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <ZnsText style={styles.actionItemText}>Community</ZnsText>
        </View>
        <View style={styles.communityContainer}>
          <ZnsText
            style={styles.communityItem}
            onPress={() => openCommunity("Blog")}
          >
            Blog
          </ZnsText>
          <ZnsText
            style={styles.communityItem}
            onPress={() => openCommunity("Docs")}
          >
            Docs
          </ZnsText>
          <ZnsText
            style={styles.communityItem}
            onPress={() => openCommunity("Socials")}
          >
            Socials
          </ZnsText>
        </View>

        <Pressable style={styles.actionItem} onPress={disconnectWallet}>
          <AntDesign
            name="logout"
            size={20}
            color={CustomDarkTheme.colors.error}
          />
          <ZnsText
            style={[
              styles.actionItemText,
              { color: CustomDarkTheme.colors.error },
            ]}
          >
            Disconnect wallet
          </ZnsText>
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
    padding: 16,
    borderRadius: 12,
    position: "absolute",
    top: 40,
    right: 0,
    width: 280,
  },
  container: {
    flexDirection: "column",
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 16,
    padding: 20,
    gap: 24,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionItemText: {
    color: CustomDarkTheme.colors.txtColor,
    fontSize: 16,
  },
  communityContainer: {
    gap: 16,
  },
  communityItem: {
    color: CustomDarkTheme.colors.txtColor,
    marginLeft: 30,
  },
});
