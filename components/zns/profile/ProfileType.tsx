import { StyleSheet, Text, View, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

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
        <Text style={styles.typeText}>joined August, 2024</Text>
      </View>

      <View style={styles.typeContainer}>
        <Image source={require("@/assets/images/icons/category.png")} />
        <Text style={styles.typeText}>Digital creator</Text>
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
