import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import ZnxText from "@/components/ui/Text";

import Button from "@/components/ui/Button";
import CodeInput from "@/components/ui/CodeInput";
import { CustomDarkTheme } from "@/constants/theme";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function ReferralCodeModal({ isVisible, onClose }: Props) {
  const [referralCode, setReferralCode] = useState("");

  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalContent}>
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color={CustomDarkTheme.colors.textPrimary}
        />
        <ZnxText type="semiBold" style={styles.referralText}>
          Enter referral code to get{" "}
          <ZnxText type="semiBold" style={styles.bonusText}>
            25% bonus
          </ZnxText>
        </ZnxText>
        <CodeInput value={referralCode} setValue={setReferralCode} />
        <Button
          title="Done"
          onPress={onClose}
          style={styles.doneButton}
          textStyle={styles.doneButtonText}
        />
        <TouchableOpacity style={styles.noInvitation}>
          <ZnxText type="regular" style={styles.noInvitationText}>
            I have no invitation code
          </ZnxText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: CustomDarkTheme.colors.modalBackground,
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  referralText: {
    color: "white",
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 18,
    marginVertical: 20,
  },
  bonusText: {
    color: CustomDarkTheme.colors.textPrimary,
  },
  doneButton: {
    marginTop: 48,
  },
  doneButtonText: {
    color: "#101010",
    fontSize: 14,
    fontWeight: 400,
  },
  noInvitation: {
    marginTop: 24,
  },
  noInvitationText: {
    color: CustomDarkTheme.colors.textPrimary,
  },
});
