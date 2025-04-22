import { StyleSheet, View } from "react-native";

import Button from "@/components/ui/Button";
import ZnsText from "@/components/ui/Text";
import TextInput from "@/components/ui/TextInput";
import { CustomDarkTheme } from "@/constants/theme";

export default function EmailSettings() {
  return (
    <View style={styles.container}>
      <View style={styles.creditsContainer}>
        <ZnsText type="medium" style={styles.title}>
          Security
        </ZnsText>
        <TextInput label="Enter your email below" placeholder="" />
        <Button
          title="Verify Email"
          fontType="medium"
          style={styles.verifyButton}
        />
        <ZnsText style={styles.resendText}>
          Didn’t receive the email?{"  "}
          <ZnsText style={styles.resendCodeText}>Resend code</ZnsText>
        </ZnsText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  creditsContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: CustomDarkTheme.colors.txtColor,
  },
  resendText: {
    textAlign: "center",
    color: "#DFE5F3",
  },
  resendCodeText: {
    color: CustomDarkTheme.colors.primary,
  },
  verifyButton: {
    marginTop: 20,
  },
});
