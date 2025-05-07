import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import AccountActionList from "@/components/zns/home/AccountActionList";
import AddressQRModal from "@/components/zns/home/AddressQRModal";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { formatBalance, formatWalletAddress } from "@/utils/formatter";
import { fontStyles } from "@/constants/fonts";

type Props = {
  account: {
    address: string;
    balance: string;
    symbol: string;
  };
};

export default function AccountInfo({ account }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionListVisible, setIsActionListVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.walletInfoContainer}>
        <Text style={styles.walletAddress}>
          {formatWalletAddress(account.address)}
        </Text>
        <Text style={styles.balance}>
          {formatBalance(Number(account.balance))} {account.symbol}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <BarCodeScanIcon color={CustomDarkTheme.colors.primary} />
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          style={styles.actionButtonContainer}
          onPress={() => setIsActionListVisible(!isActionListVisible)}
        >
          <ThreeDotIcon />
        </TouchableOpacity>
        {isActionListVisible && (
          <AccountActionList onClose={() => setIsActionListVisible(false)} />
        )}
      </View>

      <AddressQRModal
        address={account.address}
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    zIndex: 100,
  },
  walletInfoContainer: {
    marginRight: "auto",
  },
  walletAddress: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.body,
    fontSize: 14,
    lineHeight: 30,
  },
  balance: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.grey1,
    fontSize: 24,
    lineHeight: 30,
  },
  actionButtonContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.actionBg,
    position: "relative",
  },
});
