import { UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet } from "react-native";

export default function Avatar() {
  return (
    <View style={styles.container}>
      <UserIcon width={24} height={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomDarkTheme.colors.avatarBackground,
    borderRadius: 100,
    width: 56,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
