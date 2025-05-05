import GradientText from "@/components/ui/GradientText";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ReferralStatus() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <Text style={[fontStyles["SpaceGrotesk-Bold"], styles.value]}>
            45
          </Text>
          <Text style={[fontStyles["Poppins-Medium"], styles.description]}>
            Total Referrals
          </Text>
        </View>
        <View style={styles.itemContainer}>
          <Text style={[fontStyles["SpaceGrotesk-Bold"], styles.value]}>
            250
            {/* <GradientText text="ETH" /> */}
          </Text>
          <Text style={[fontStyles["Poppins-Medium"], styles.description]}>
            Total Earnings
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    marginTop: 32,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  itemContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    flex: 1,
  },
  value: {
    fontSize: 24,
    color: CustomDarkTheme.colors.primary,
  },
  description: {
    fontSize: 12,
    color: "#A3A3A3",
  },
});
