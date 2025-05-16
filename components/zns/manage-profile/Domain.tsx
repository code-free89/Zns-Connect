import { StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ManageDomain() {
  return (
    <View style={styles.container}>
      <View style={styles.manageContainer}>
        <Text style={styles.expirationText}>Expiration: November 7, 2025</Text>
      </View>

      <View style={styles.manageContainer}>
        <Text style={styles.title}>Renew domain</Text>
        <Text style={styles.description}>
          Renew your domain with 90% discount. Enter the number of year below
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: getHeightSize(24),
    gap: getHeightSize(24),
  },
  manageContainer: {
    paddingHorizontal: getWidthSize(20),
    paddingVertical: getHeightSize(16),
    borderRadius: getWidthSize(10),
    backgroundColor: "#101010",
    gap: getHeightSize(12),
  },
  expirationText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 2,
    letterSpacing: 0.14,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  title: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(20),
    color: CustomDarkTheme.colors.txtColor,
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
});
