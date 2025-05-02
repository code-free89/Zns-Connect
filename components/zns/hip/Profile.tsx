import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Image, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { FontAwesome6 } from "@expo/vector-icons";

export default function HipProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Referral Link */}
        <View style={styles.referralLinkContainer}>
          <Text style={[fontStyles["Poppins-Regular"], styles.referralLink]}>
            Referral link
          </Text>
          <MaterialCommunityIcons
            name="link-variant"
            size={11}
            color={CustomDarkTheme.colors.primary}
          />
        </View>

        {/* Share */}
        <View style={styles.shareContainer}>
          <Image source={require("@/assets/images/icons/share.png")} />
          <Text style={[fontStyles["Poppins-Regular"], styles.shareText]}>
            Share
          </Text>
        </View>
      </View>

      <View style={styles.avatarContainer}>
        <Image
          source={require("@/assets/images/app/hip_avatar.png")}
          style={{ width: "100%", height: "100%", opacity: 0.3 }}
        />
        <FontAwesome6
          name="edit"
          size={21}
          color={CustomDarkTheme.colors.p700}
          style={styles.editIcon}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={styles.nameContainer}>
          <Text style={[fontStyles["Orbitron-SemiBold"], styles.name]}>
            Nakamoto
          </Text>
          <Text style={[fontStyles["SpaceGrotesk-Regular"], styles.bio]}>
            Bitcoin Cryptocurrency
          </Text>
          <Text style={[fontStyles["Orbitron-SemiBold"], styles.role]}>
            Chief Executive Officer
          </Text>
        </View>
        <FontAwesome6
          name="edit"
          size={21}
          color={CustomDarkTheme.colors.p700}
          style={styles.nameEditIcon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 20,
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  referralLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: `${CustomDarkTheme.colors.primary}1A`,
    paddingHorizontal: 10,
    paddingVertical: 2,
    gap: 6,
  },
  referralLink: {
    fontSize: 12,
    color: CustomDarkTheme.colors.primary,
    marginTop: 3,
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.actionBg,
    paddingHorizontal: 16,
    paddingVertical: 2,
    gap: 3,
  },
  shareText: {
    fontSize: 12,
    color: "white",
    marginTop: 3,
  },
  avatarContainer: {
    width: "100%",
    aspectRatio: 1.27,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  editIcon: {
    position: "absolute",
    top: 11,
    right: 11,
  },
  nameContainer: {
    flexDirection: "column",
    gap: 10,
  },
  name: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 20,
  },
  bio: {
    fontSize: 14,
    color: "white",
  },
  role: {
    color: CustomDarkTheme.colors.primary,
    fontSize: 14,
  },
  nameEditIcon: {
    padding: 10,
  },
});
