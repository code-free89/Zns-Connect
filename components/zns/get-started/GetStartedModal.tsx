import Button from "@/components/ui/Button";
import CheckBox from "@/components/ui/CheckBox";
import { CustomDarkTheme } from "@/constants/theme";
import { formatWalletAddress } from "@/utils/formatter";
import React, { PropsWithChildren, useState } from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";

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
            <Image source={{ uri: walletInfo.icon }} width={67} height={67} />
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
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#4CAF50" : undefined}
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
    paddingHorizontal: 6,
    paddingVertical: 16,
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  walletIconWrapper: {
    borderWidth: 1.35,
    borderColor: "#C9FC0199",
    borderRadius: 30,
    padding: 14,
    marginBottom: 24,
    marginTop: 57,
    boxShadow: "0px 0px 25.73px 0px #88AA02DB",
  },
  walletIcon: {
    backgroundColor: "#F9E7CD",
    padding: 12,
    borderRadius: 24,
  },
  walletAddress: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 8,
    color: "white",
  },
  subtitle: {
    color: CustomDarkTheme.colors.body,
    fontSize: 12,
    fontWeight: "medium",
    textAlign: "center",
    marginBottom: 57,
    lineHeight: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 23,
  },
  checkbox: {
    marginRight: 4,
  },
  terms: {
    color: "#E8E8E8",
    fontSize: 12,
  },
  link: {
    color: CustomDarkTheme.colors.primary,
  },
  buttonText: {
    color: "#101010",
    fontSize: 14,
    fontWeight: 400,
  },
});
