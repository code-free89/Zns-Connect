import { StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function EmailSettings() {
  return (
    <View style={styles.container}>
      <View style={styles.creditsContainer}>
        <Text style={styles.title}>Security</Text>
        <TextInput label="Enter your email below" placeholder="" />
        <Button title="Verify Email" style={styles.verifyButton} />
        <Text style={styles.resendText}>
          Didn’t receive the email?{"  "}
          <Text style={styles.resendCodeText}>Resend code</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getHeightSize(24),
  },
  creditsContainer: {
    padding: getWidthSize(16),
    gap: getHeightSize(12),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(10),
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(16),
    color: CustomDarkTheme.colors.txtColor,
  },
  resendText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(14),
    letterSpacing: 0.28,
    textAlign: "center",
    color: "#DFE5F3",
  },
  resendCodeText: {
    color: CustomDarkTheme.colors.primary,
  },
  verifyButton: {
    marginTop: getHeightSize(20),
  },
});
