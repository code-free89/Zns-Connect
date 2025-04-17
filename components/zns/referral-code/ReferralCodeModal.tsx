import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import ZnsText from "@/components/ui/Text";

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
    <Modal isVisible={isVisible} backdropColor="#171810">
      <View style={styles.modalContent}>
        <Ionicons
          name="alert-circle-outline"
          size={24}
          color={CustomDarkTheme.colors.textPrimary}
        />
        <ZnsText type="semiBold" style={styles.referralText}>
          Enter referral code to get{" "}
          <ZnsText type="semiBold" style={styles.bonusText}>
            25% bonus
          </ZnsText>
        </ZnsText>
        <CodeInput value={referralCode} setValue={setReferralCode} />
        <Button
          fontType="regular"
          title="Done"
          onPress={onClose}
          style={styles.doneButton}
          textStyle={styles.doneButtonText}
        />
        <TouchableOpacity style={styles.noInvitation}>
          <ZnsText type="medium" style={styles.noInvitationText}>
            I have no invitation code
          </ZnsText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "100%",
    backgroundColor: "#0E1101",
    borderRadius: 16,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  referralText: {
    color: "white",
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
  },
  noInvitation: {
    marginTop: 24,
  },
  noInvitationText: {
    color: CustomDarkTheme.colors.textPrimary,
  },
});
