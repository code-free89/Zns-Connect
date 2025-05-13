import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import Button from "@/components/ui/Button";
import CodeInput from "@/components/ui/CodeInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";

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
          size={getHeightSize(24)}
          color={CustomDarkTheme.colors.textPrimary}
        />
        <Text style={styles.referralText}>
          Enter referral code to get{" "}
          <Text style={styles.bonusText}>25% bonus</Text>
        </Text>
        <CodeInput value={referralCode} setValue={setReferralCode} />
        <Button
          title="Done"
          onPress={onClose}
          style={styles.doneButton}
          textStyle={styles.doneButtonText}
        />
        <TouchableOpacity style={styles.noInvitation} onPress={onClose}>
          <Text style={styles.noInvitationText}>I have no invitation code</Text>
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
    paddingHorizontal: getWidthSize(24),
    paddingVertical: getHeightSize(16),
  },
  referralText: {
    ...fontStyles["Poppins-SemiBold"],
    color: "white",
    fontSize: getHeightSize(16),
    lineHeight: getHeightSize(16 * 1.5),
    marginVertical: getHeightSize(20),
  },
  bonusText: {
    color: CustomDarkTheme.colors.textPrimary,
  },
  doneButton: {
    marginTop: getHeightSize(48),
  },
  doneButtonText: {
    ...fontStyles["Poppins-Regular"],
    color: "#101010",
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(14 * 1.35),
  },
  noInvitation: {
    marginTop: getHeightSize(24),
  },
  noInvitationText: {
    ...fontStyles["Poppins-Medium"],
    color: CustomDarkTheme.colors.textPrimary,
    fontSize: getHeightSize(14),
    lineHeight: getHeightSize(20),
    fontFeatureSettings: "liga off",
    fontVariant: ["tabular-nums", "lining-nums"],
  },
});
