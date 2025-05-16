import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import DummyText from "@/components/ui/DummyText";
import GradientText from "@/components/ui/GradientText";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ReferralStatus() {
  const [symbolSize, setSymbolSize] = useState({ width: 0, height: 0 });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.itemContainer}>
          <Text style={styles.value}>45</Text>
          <Text style={styles.description}>Total Referrals</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={[styles.row, { alignItems: "flex-end" }]}>
            <Text style={styles.value}>250</Text>

            <View style={{ marginBottom: getHeightSize(4) }}>
              <DummyText
                text={`ETH`}
                textStyle={styles.valueSymbol}
                size={symbolSize}
                setSize={setSymbolSize}
              />
              <GradientText
                text="ETH"
                size={symbolSize}
                textStyle={styles.valueSymbol}
                gradientColors={CustomDarkTheme.gradientColors.linear1}
              />
            </View>
          </View>
          <Text style={styles.description}>Total Earnings</Text>
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
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(12),
    borderRadius: getWidthSize(16),
    flex: 1,
  },
  value: {
    ...fontStyles["SpaceGrotesk-Bold"],
    fontSize: getFontSize(24),
    color: CustomDarkTheme.colors.primary,
  },
  valueSymbol: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(10),
    lineHeight: getHeightSize(10) * 1.35,
  },
  description: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    color: "#A3A3A3",
  },
});
