import GradientText from "@/components/ui/GradientText";
import { CustomDarkTheme } from "@/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function ProfileInfo() {
  return (
    <View style={styles.container}>
      <GradientText text={"Binance Labs"} textStyle={styles.gradientText} />
      <Text style={styles.bioText}>binance-web3adfdfbgnhgga.cz</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  gradientText: {
    fontSize: 24,
    fontWeight: 600,
  },
  bioText: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.txtColor,
  },
});
