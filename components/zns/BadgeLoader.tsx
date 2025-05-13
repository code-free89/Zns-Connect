import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { fontStyles } from "@/constants/fonts";

type BadgeLoaderProps = {
  loading: boolean;
  isAvailable: boolean;
};

const AvailableBadge = ({ isAvailable }: { isAvailable: boolean }) => {
  return (
    <View style={[styles.availableBadge, isAvailable && styles.bgAvailable]}>
      <Text
        style={[styles.availableBadgeText, isAvailable && styles.textAvailable]}
      >
        {isAvailable ? "Available" : "Unavailable"}
      </Text>
    </View>
  );
};

export default function BadgeLoader({
  loading,
  isAvailable,
}: BadgeLoaderProps) {
  if (loading) return <ActivityIndicator color={CustomDarkTheme.colors.body} />;
  return <AvailableBadge isAvailable={isAvailable} />;
}

const styles = StyleSheet.create({
  availableBadge: {
    borderRadius: getWidthSize(8),
    width: getWidthSize(77),
    height: getHeightSize(25),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF05051A",
    borderColor: "#FF050599",
    borderWidth: 0.5,
  },
  availableBadgeText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(10),
    lineHeight: getFontSize(10) * 1.5,
    color: "#FF0505AD",
  },
  bgAvailable: {
    backgroundColor: "#05ABFF1A",
    borderColor: "#05ABFF99",
  },
  textAvailable: {
    color: "#05ABFFAD",
  },
});
