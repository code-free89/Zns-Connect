import { Dimensions, StyleSheet, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ZnxText from "@/components/ui/Text";

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
            <ZnxText type="semiBold" style={styles.statusText}>
              0 XP{" "}
              <ZnxText type="regular" style={styles.statusDescription}>
                Score
              </ZnxText>
            </ZnxText>
          </View>

          <View style={styles.statusItem}>
            <ZnxText type="semiBold" style={styles.statusText}>
              0{" "}
              <ZnxText type="regular" style={styles.statusDescription}>
                of 95232 users
              </ZnxText>
            </ZnxText>
          </View>

          <ZnxText type="regular" style={styles.mintContainer}>
            Mint HIP
            <Entypo
              name="chevron-thin-right"
              size={13}
              color={CustomDarkTheme.colors.p500}
            />
          </ZnxText>
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
