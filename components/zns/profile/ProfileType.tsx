import { StyleSheet, View, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import ZnsText from "@/components/ui/Text";

import { CustomDarkTheme } from "@/constants/theme";

export default function ProfileType() {
  return (
    <View style={styles.container}>
      <View style={styles.typeContainer}>
        <FontAwesome6
          name="clock"
          size={14}
          color={CustomDarkTheme.colors.body}
        />
        <ZnsText type="medium" style={styles.typeText}>
          joined August, 2024
        </ZnsText>
      </View>

      <View style={styles.typeContainer}>
        <Image source={require("@/assets/images/icons/category.png")} />
        <ZnsText type="medium" style={styles.typeText}>
          Digital creator
        </ZnsText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  typeContainer: {
    borderRadius: 83,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: CustomDarkTheme.colors.grey2,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typeText: {
    fontSize: 12,
    fontWeight: 500,
    color: CustomDarkTheme.colors.body,
  },
});
