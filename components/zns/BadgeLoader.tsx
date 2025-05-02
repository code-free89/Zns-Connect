import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";

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
    borderRadius: 8,
    width: 77,
    height: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF05051A",
    borderColor: "#FF050599",
    borderWidth: 0.5,
  },
  availableBadgeText: {
    fontSize: 10,
    fontWeight: 600,
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
