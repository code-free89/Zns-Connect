import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Avatar from "@/components/ui/Avatar";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { formatWalletAddress } from "@/utils/formatter";
import AddressQRModal from "./AddressQRModal";
import AccountActionList from "./AccountActionList";
type Props = {
  account: {
    address: string;
    balance: string;
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
        <Text style={styles.balance}>${account.balance}</Text>
      </View>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <BarCodeScanIcon color={CustomDarkTheme.colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => setIsActionListVisible(!isActionListVisible)}
      >
        <ThreeDotIcon />
        {isActionListVisible && <AccountActionList />}
      </TouchableOpacity>

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
    position: "relative",
  },
});
