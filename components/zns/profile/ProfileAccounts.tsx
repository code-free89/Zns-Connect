import { StyleSheet, View, Text, Image } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { CustomDarkTheme } from "@/constants/theme";

const SOCIAL_ACCOUNTS = [
  {
    icon: <FontAwesome6 name="x-twitter" size={22} color="black" />,
    name: "Twitter",
    isVerified: true,
  },
  {
    icon: <FontAwesome6 name="discord" size={22} color="black" />,
    name: "Discord",
    isVerified: true,
  },
  {
    icon: <FontAwesome6 name="telegram" size={22} color="black" />,
    name: "Telegram",
    isVerified: true,
  },
  {
    icon: <FontAwesome6 name="instagram" size={22} color="black" />,
    name: "Instagram",
    isVerified: true,
  },
  {
    icon: <MaterialCommunityIcons name="web" size={22} color="black" />,
    name: "Web",
    isVerified: true,
  },
];

export default function ProfileAccounts() {
  return (
    <View style={styles.container}>
      {/* Location */}
      <View style={styles.typeContainer}>
        <Image source={require("@/assets/images/icons/location.png")} />
        <Text style={styles.typeText}>Tokyo</Text>
      </View>

      {/* Social Accounts */}
      {SOCIAL_ACCOUNTS.map((socialAccount) => (
        <View key={socialAccount.name} style={styles.socialContainer}>
          {socialAccount.icon}
          {socialAccount.isVerified && (
            <MaterialCommunityIcons
              name="check-decagram"
              size={17}
              color={CustomDarkTheme.colors.badge}
              style={styles.verifiedBadge}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  typeContainer: {
    height: "100%",
    borderRadius: 83,
    paddingHorizontal: 12,
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
  socialContainer: {
    borderRadius: 100,
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: 10,
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
