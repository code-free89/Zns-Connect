import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import { useAccount, useBalance } from "wagmi";

import Avatar from "@/components/ui/Avatar";
import DummyText from "@/components/ui/DummyText";
import GradientText from "@/components/ui/GradientText";
import SplitLine from "@/components/ui/SplitLine";
import AccountActionList from "@/components/zns/home/AccountActionList";
import AddressQRModal from "@/components/zns/home/AddressQRModal";
import { fontStyles } from "@/constants/fonts";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useTLD } from "@/hooks/web3/useTLD";
import { useAppSelector } from "@/store";
import { formatBalance, formatWalletAddress } from "@/utils/formatter";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function AccountInfo() {
  const account = useAccount();
  const { chainId } = useAccount();
  const tld = useTLD(chainId);
  const balance = useBalance({ address: account.address });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isActionListVisible, setIsActionListVisible] = useState(false);
  const [primaryDomainSize, setPrimaryDomainSize] = useState({
    width: 0,
    height: 0,
  });

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
      <View style={{ alignItems: "center", marginTop: getHeightSize(2) }}>
        {hasPrimaryDomain ? (
          <View>
            <DummyText
              text={primaryDomain}
              textStyle={styles.avatarText}
              setSize={setPrimaryDomainSize}
            />
            <GradientText
              text={primaryDomain}
              textStyle={styles.avatarText}
              size={primaryDomainSize}
            />
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

      <View style={{ width: "100%", marginTop: getHeightSize(2) }}>
        <SplitLine />
      </View>

      <View style={styles.actionContainer}>
        <Pressable
          style={styles.actionButtonContainer}
          onPress={() => setIsModalVisible(true)}
        >
          <BarCodeScanIcon color={CustomDarkTheme.colors.primary} />
        </Pressable>
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
    alignItems: "center",
    justifyContent: "center",
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
    padding: getHeightSize(10),
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.actionBg,
    position: "relative",
  },
  avatarText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.5),
  },
  actionContainer: {
    position: "absolute",
    right: 0,
    top: getHeightSize(12),
    flexDirection: "row",
    gap: getWidthSize(12),
  },
});
