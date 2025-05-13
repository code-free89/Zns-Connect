import React, { PropsWithChildren, useState } from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/CheckBox";
import { fontStyles } from "@/constants/fonts";
import { MetaMaskIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { formatWalletAddress } from "@/utils/formatter";
import { getHeightSize, getWidthSize } from "@/utils/size";

type Props = PropsWithChildren<{
  isVisible: boolean;
  walletAddress: string;
  walletInfo: any;
  onGetStarted: () => void;
}>;

export default function GetStartedModal({
  isVisible,
  walletAddress,
  walletInfo,
  onGetStarted,
  children,
}: Props) {
  const [isChecked, setIsChecked] = useState(false);

  const openTerms = () => {
    Linking.openURL("https://docs.znsconnect.io/legal/terms-of-use");
  };

  const openPrivacy = () => {
    Linking.openURL("https://docs.znsconnect.io/legal/privacy-policy");
  };

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>Wallet Connected</Text>
        <View style={styles.walletIconWrapper}>
          <View style={styles.walletIcon}>
            {walletInfo.name === "MetaMask Wallet" ? (
              <MetaMaskIcon
                width={getHeightSize(67)}
                height={getHeightSize(67)}
              />
            ) : (
              <Image
                source={{ uri: walletInfo.icon }}
                style={{ width: getHeightSize(67), height: getHeightSize(67) }}
              />
            )}
          </View>
        </View>
        <Text style={styles.walletAddress}>
          {formatWalletAddress(walletAddress)}
        </Text>
        <Text style={styles.subtitle}>
          {
            "You are now ready to claim your web3 page \n and build high profile credibility"
          }
        </Text>
        <View style={styles.checkboxContainer}>
          <CheckBox
            checked={isChecked}
            onChange={() => setIsChecked((prev) => !prev)}
            style={styles.checkbox}
          />
          <Text style={styles.terms} onPress={() => setIsChecked(!isChecked)}>
            I agree to ZNS{" "}
            <Text style={styles.link} onPress={openTerms}>
              terms of service
            </Text>{" "}
            and{" "}
            <Text style={styles.link} onPress={openPrivacy}>
              Privacy Policy
            </Text>
          </Text>
        </View>
        <Button
          title="Get Started"
          onPress={onGetStarted}
          disabled={!isChecked}
          textStyle={styles.buttonText}
        />
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: CustomDarkTheme.colors.modalBackground,
    borderRadius: 16,
    paddingHorizontal: getWidthSize(6),
    paddingVertical: getHeightSize(16),
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  title: {
    ...fontStyles["Poppins-Bold"],
    color: "white",
    fontSize: getWidthSize(20),
    textAlign: "center",
    lineHeight: getWidthSize(20 * 1.5),
  },
  walletIconWrapper: {
    borderWidth: 1.35,
    borderColor: "#C9FC0199",
    borderRadius: 30,
    padding: getWidthSize(14),
    marginBottom: getHeightSize(24),
    marginTop: getHeightSize(57),
    boxShadow: "0px 0px 25.73px 0px #88AA02DB",
  },
  walletIcon: {
    backgroundColor: "#F9E7CD",
    padding: getWidthSize(12),
    borderRadius: 24,
  },
  walletAddress: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(16),
    lineHeight: getWidthSize(16 * 1.5),
    textAlign: "center",
    marginBottom: getHeightSize(8),
    color: "white",
  },
  subtitle: {
    ...fontStyles["Poppins-Medium"],
    color: CustomDarkTheme.colors.body,
    fontSize: getHeightSize(12),
    textAlign: "center",
    marginBottom: getHeightSize(57),
    lineHeight: getHeightSize(12 * 1.5),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23,
  },
  checkbox: {
    marginRight: getWidthSize(4),
  },
  terms: {
    ...fontStyles["Poppins-Regular"],
    color: "#E8E8E8",
    fontSize: getHeightSize(12),
  },
  link: {
    color: CustomDarkTheme.colors.primary,
  },
  buttonText: {
    ...fontStyles["Poppins-Regular"],
    color: "#101010",
  },
});
