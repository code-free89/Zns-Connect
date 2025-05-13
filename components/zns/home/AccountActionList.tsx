import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useAccount, useDisconnect } from "wagmi";

import NetworkSelect from "@/components/zns/home/NetworkSelect";
import { fontStyles } from "@/constants/fonts";
import { CopyIcon, CreditIcon, UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { copyToClipboard } from "@/utils/helpers";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showSuccessToast } from "@/utils/toast";

type Props = {
  onClose: () => void;
};

export default function AccountActionList({ onClose }: Props) {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { userCredit, user } = useAppSelector((state) => state.user);

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

  // const openCommunity = (community: string) => {
  //   if (community === "Blog") {
  //     Linking.openURL("https://znsconnect.medium.com");
  //   } else if (community === "Docs") {
  //     Linking.openURL("https://docs.znsconnect.io");
  //   } else if (community === "Socials") {
  //     Linking.openURL("https://docs.znsconnect.io");
  //   }
  // };

  const goToCredits = () => {
    onClose();
    router.push("/(zns)/general-settings");
  };

  const goToProfile = () => {
    onClose();
    router.push("/(tabs)/profile");
  };

  const goToMyDomains = () => {
    onClose();
    router.push("/(zns)/my-domains");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <NetworkSelect containerStyle={styles.networkSelect} />
        <Pressable onPress={goToCredits}>
          <Text style={styles.actionDescription}>Credits & gift cards</Text>
          <View style={styles.creditsContainer}>
            <CreditIcon />
            <Text
              style={[
                styles.actionItemText,
                {
                  fontSize: getFontSize(14),
                  lineHeight: getFontSize(14) * 1.5,
                },
              ]}
            >
              {userCredit} credits
            </Text>
          </View>
        </Pressable>

        <Pressable style={styles.actionItem} onPress={goToProfile}>
          <UserIcon
            width={20}
            height={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>View Profile</Text>
        </Pressable>

        <Pressable style={styles.actionItem} onPress={goToMyDomains}>
          <Feather
            name="link"
            size={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>My domains</Text>
        </Pressable>

        <Pressable style={styles.actionItem} onPress={goToGeneralSettings}>
          <Octicons
            name="gear"
            size={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>General settings</Text>
        </Pressable>

        <Pressable style={styles.actionItem} onPress={copyWalletAddress}>
          <CopyIcon />
          <Text style={styles.actionItemText}>Copy wallet address</Text>
        </Pressable>

        {/* <View style={styles.communityContainer}>
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
        </View> */}
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

      <Pressable style={styles.closeContainer} onPress={onClose}>
        <AntDesign name="close" size={14} color="white" />
      </Pressable>
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
    paddingHorizontal: getWidthSize(14),
    paddingVertical: getHeightSize(20),
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
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
  },
  networkSelect: {
    backgroundColor: CustomDarkTheme.colors.grey3,
  },
  actionDescription: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  creditsContainer: {
    borderRadius: 12,
    paddingHorizontal: getWidthSize(20),
    paddingVertical: getHeightSize(10),
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(10),
    backgroundColor: CustomDarkTheme.colors.grey3,
    marginTop: getHeightSize(4),
  },
  closeContainer: {
    marginTop: getHeightSize(16),
    marginHorizontal: "auto",
    padding: getWidthSize(10),
    borderRadius: 9999,
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
});
