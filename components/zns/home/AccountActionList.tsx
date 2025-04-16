import AntDesign from "@expo/vector-icons/AntDesign";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useDisconnect } from "wagmi";

import { CopyIcon, UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";

export default function AccountActionList() {
  const router = useRouter();
  const { disconnect } = useDisconnect();

  const disconnectWallet = () => {
    disconnect();
    router.replace("/(onboarding)/wallet-connect");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.actionItem}>
          <CopyIcon />
          <Text style={styles.actionItemText}>Copy wallet address</Text>
        </View>
        <View style={styles.actionItem}>
          <Octicons
            name="gear"
            size={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>General settings</Text>
        </View>
        <View style={styles.actionItem}>
          <UserIcon
            width={20}
            height={20}
            color={CustomDarkTheme.colors.txtColor}
          />
          <Text style={styles.actionItemText}>Community</Text>
        </View>
        <Pressable style={styles.actionItem} onPress={disconnectWallet}>
          <AntDesign
            name="logout"
            size={20}
            color={CustomDarkTheme.colors.error}
          />
          <Text
            style={[
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
    fontWeight: 400,
  },
});
