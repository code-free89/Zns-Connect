import { StyleSheet, View } from "react-native";

import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "@/constants/theme";
export default function GeneralSettings() {
  return (
    <View style={styles.container}>
      <ZnsText>General Settings</ZnsText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomDarkTheme.colors.grey3,
  },
});
