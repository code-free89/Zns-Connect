import { Image, StyleSheet, View } from "react-native";
import ZnxText from "@/components/ui/Text";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import GradientText from "@/components/ui/GradientText";
import { CustomDarkTheme } from "@/constants/theme";

export default function ProfileBio() {
  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            height: 36,
            flexDirection: "row",
          }}
        >
          <GradientText text={"Binance Labs"} textStyle={styles.gradientText} />
        </View>
        <ZnxText type="regular" style={styles.bioText}>
          binance-web3adfdfbgnhgga.cz
        </ZnxText>
      </View>

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
      >
        <View style={styles.shortIntroContainer}>
          <Image source={require("@/assets/images/icons/intro.png")} />
          <ZnxText type="regular" style={styles.shortIntroText}>
            Short intro about you appear here
          </ZnxText>
          <ZnxText type="regular" style={styles.editButton}>
            Edit
          </ZnxText>
        </View>
      </GradientBorderViewWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  gradientText: {
    fontSize: 24,
    fontWeight: 600,
    marginLeft: 0,
  },
  bioText: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.txtColor,
  },
  shortIntroContainer: {
    padding: 9,
    backgroundColor: `${CustomDarkTheme.colors.grey2}`,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  shortIntroText: {
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
  },
  editButton: {
    marginLeft: "auto",
    marginRight: 10,
    fontSize: 14,
    fontWeight: 400,
    color: CustomDarkTheme.colors.p500,
  },
});
