import { Image, StyleSheet, Text, View } from "react-native";

import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getWidthSize } from "@/utils/size";
import { useMemo } from "react";

export default function ProfileAccounts() {
  const { profile } = useAppSelector((state) => state.profile);

  const SOCIAL_ACCOUNTS = useMemo(
    () => [
      {
        icon: <FontAwesome6 name="x-twitter" size={22} color="white" />,
        name: "Twitter",
        isVerified: profile?.twitterVerified,
      },
      {
        icon: <FontAwesome6 name="discord" size={22} color="white" />,
        name: "Discord",
        isVerified: profile?.discordVerified,
      },
      {
        icon: <FontAwesome6 name="telegram" size={22} color="white" />,
        name: "Telegram",
        isVerified: profile?.telegramVerified,
      },
      {
        icon: <FontAwesome6 name="linkedin" size={22} color="white" />,
        name: "LinkedIn",
        isVerified: profile?.linkedinVerified,
      },
      {
        icon: <MaterialCommunityIcons name="web" size={22} color="white" />,
        name: "Web",
        isVerified: profile?.websiteVerified,
      },
    ],
    [profile]
  );

  return (
    <View style={styles.container}>
      {/* Location */}
      <View style={styles.typeContainer}>
        <Image source={require("@/assets/images/icons/location.png")} />
        <Text style={styles.typeText}>
          {profile?.location || "No Location"}
        </Text>
      </View>

      {/* Social Accounts */}
      <View style={styles.socialContainer}>
        {SOCIAL_ACCOUNTS.map((socialAccount) => (
          <View key={socialAccount.name} style={styles.socialItem}>
            {socialAccount.icon}
            {socialAccount.isVerified && (
              <MaterialCommunityIcons
                name="check-decagram"
                size={getWidthSize(17)}
                color={CustomDarkTheme.colors.badge}
                style={styles.verifiedBadge}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: getWidthSize(10),
  },
  typeContainer: {
    height: "100%",
    borderRadius: getWidthSize(83),
    paddingHorizontal: getWidthSize(12),
    backgroundColor: CustomDarkTheme.colors.grey2,
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(6),
  },
  typeText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  socialContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    opacity: 0.29,
  },
  socialItem: {
    borderRadius: 100,
    backgroundColor: CustomDarkTheme.colors.grey2,
    width: getWidthSize(37),
    height: getWidthSize(37),
    alignItems: "center",
    justifyContent: "center",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});
