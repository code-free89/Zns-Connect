import Button from "@/components/ui/Button";
import CodeInput from "@/components/ui/CodeInput";
import { CustomDarkTheme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function ReferralCodeModal({ isVisible, onClose }: Props) {
  const [referralCode, setReferralCode] = useState("");

  return (
    <View>
      <Modal isVisible>
        <View style={styles.modalContent}>
          <Ionicons
            name="alert-circle-outline"
            size={24}
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
          <TouchableOpacity style={styles.noInvitation}>
            <Text style={styles.noInvitationText}>
              I have no invitation code
            </Text>
          </TouchableOpacity>
          {/* <Text style={styles.title}>Wallet Connected</Text>
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
            <Text style={styles.terms}>
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
            onPress={onClose}
            textStyle={styles.buttonText}
          />
          {children} */}
        </View>
      </Modal>
    </View>
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
