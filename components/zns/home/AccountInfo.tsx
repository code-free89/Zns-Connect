import { useMemo, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAccount, useBalance } from "wagmi";

import Avatar from "@/components/ui/Avatar";
import GradientText from "@/components/ui/GradientText";
import AccountActionList from "@/components/zns/home/AccountActionList";
import AddressQRModal from "@/components/zns/home/AddressQRModal";
import { fontStyles } from "@/constants/fonts";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useTLD } from "@/hooks/web3/useTLD";
import { useAppSelector } from "@/store";
import { formatBalance, formatWalletAddress } from "@/utils/formatter";
import { getHeightSize, getWidthSize } from "@/utils/size";
import Modal from "react-native-modal";

export default function AccountInfo() {
  const account = useAccount();
  const { chainId } = useAccount();
  const tld = useTLD(chainId);
  const balance = useBalance({ address: account.address });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionListVisible, setIsActionListVisible] = useState(false);

  const { userPrimaryDomain } = useAppSelector((state) => state.user);
  const hasPrimaryDomain = !!userPrimaryDomain?.domainName;

  const primaryDomain = useMemo(
    () =>
      userPrimaryDomain?.domainName
        ? `${userPrimaryDomain.domainName}.${tld}`
        : "",
    [userPrimaryDomain, tld]
  );

  return (
    <View style={styles.container}>
      <Avatar width={getWidthSize(56)} />

      <View style={styles.walletInfoContainer}>
        {hasPrimaryDomain ? (
          <View
            style={{
              height: getHeightSize(24),
            }}
          >
            <GradientText text={primaryDomain} textStyle={styles.avatarText} />
          </View>
        ) : (
          <Text style={styles.walletAddress}>
            {formatWalletAddress(account.address ?? "")}
          </Text>
        )}
        <Text style={styles.balance}>
          {formatBalance(Number(balance.data?.formatted ?? "0"))}{" "}
          {balance.data?.symbol ?? ""}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.actionButtonContainer}
        onPress={() => setIsModalVisible(true)}
      >
        <BarCodeScanIcon color={CustomDarkTheme.colors.primary} />
      </TouchableOpacity>
      <View>
        <Pressable
          style={styles.actionButtonContainer}
          onPress={() => setIsActionListVisible(!isActionListVisible)}
        >
          <ThreeDotIcon />
        </Pressable>
        <Modal
          isVisible={isActionListVisible}
          backdropColor="transparent"
          onBackdropPress={() => setIsActionListVisible(false)}
          style={{ position: "absolute", right: 0, top: 48 }}
          animationIn="fadeIn"
          animationOut="fadeOut"
        >
          <AccountActionList onClose={() => setIsActionListVisible(false)} />
        </Modal>
      </View>

      <AddressQRModal
        address={account.address ?? ""}
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
    gap: getWidthSize(12),
    zIndex: 100,
  },
  walletInfoContainer: {
    marginRight: "auto",
  },
  walletAddress: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.body,
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
  },
  balance: {
    ...fontStyles["Poppins-SemiBold"],
    color: CustomDarkTheme.colors.grey1,
    fontSize: getHeightSize(24),
    lineHeight: getHeightSize(24 * 1.25),
  },
  actionButtonContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.actionBg,
    position: "relative",
  },
  avatarText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
  },
});
