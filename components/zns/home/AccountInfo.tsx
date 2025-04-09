import Avatar from "@/components/ui/Avatar";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { formatWalletAddress } from "@/utils/formatter";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  account: {
    address: string;
    balance: string;
  };
};

export default function AccountInfo({ account }: Props) {
  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.walletInfoContainer}>
        <Text style={styles.walletAddress}>
          {formatWalletAddress(account.address)}
        </Text>
        <Text style={styles.balance}>${account.balance}</Text>
      </View>
      <View style={styles.actionButtonContainer}>
        <BarCodeScanIcon color={CustomDarkTheme.colors.primary} />
      </View>
      <View style={styles.actionButtonContainer}>
        <ThreeDotIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${CustomDarkTheme.colors.body}40`,
  },
  walletInfoContainer: {
    marginRight: "auto",
  },
  walletAddress: {
    color: CustomDarkTheme.colors.body,
    fontWeight: 600,
    fontSize: 14,
  },
  balance: {
    color: CustomDarkTheme.colors.grey1,
    fontWeight: 600,
    fontSize: 24,
  },
  actionButtonContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.actionBg,
  },
});
