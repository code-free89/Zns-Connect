import { Dimensions, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ZnsText from "@/components/ui/Text";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { CustomDarkTheme } from "@/constants/theme";
import GradientSlider from "../GradientSlider";

export default function ProfileHIP() {
  return (
    <GradientBorderViewWrapper
      borderRadius={10}
      gradientColors={CustomDarkTheme.gradientColors.linear1}
    >
      <View style={styles.container}>
        {/* <GradientSlider
          width={Dimensions.get("window").width - 56}
          padding={12}
        /> */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <ZnsText type="semiBold" style={styles.statusText}>
              0 XP{" "}
              <ZnsText type="regular" style={styles.statusDescription}>
                Score
              </ZnsText>
            </ZnsText>
          </View>

          <View style={styles.statusItem}>
            <ZnsText type="semiBold" style={styles.statusText}>
              0{" "}
              <ZnsText type="regular" style={styles.statusDescription}>
                of 95232 users
              </ZnsText>
            </ZnsText>
          </View>

          <ZnsText type="regular" style={styles.mintContainer}>
            Mint HIP
            <Entypo
              name="chevron-thin-right"
              size={13}
              color={CustomDarkTheme.colors.p500}
            />
          </ZnsText>
        </View>
      </View>
    </GradientBorderViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusItem: {
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.stroke,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 600,
    color: CustomDarkTheme.colors.p500,
  },
  statusDescription: {
    fontSize: 12,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
  },
  mintContainer: {
    marginLeft: "auto",
    color: CustomDarkTheme.colors.p500,
    fontWeight: 400,
    fontSize: 12,
  },
});
