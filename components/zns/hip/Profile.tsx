import { FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useMemo } from "react";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { copyToClipboard } from "@/utils/helpers";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showSuccessToast } from "@/utils/toast";

export default function HipProfile() {
  const { user } = useAppSelector((state) => state.user);
  const referUrl = useMemo(
    () =>
      user && user.referralCode
        ? `${process.env.EXPO_PUBLIC_ZNS_URL}?ref=${user.referralCode}`
        : `${process.env.EXPO_PUBLIC_ZNS_URL}`,
    [user]
  );

  const onCopy = () => {
    if (user) {
      copyToClipboard(referUrl);
      showSuccessToast("Copied to clipboard");
    }
  };
  const onShare = () => {
    let description =
      "🟢 Big news for @znsconnect!\n" +
      "\n" +
      "🟢 Mint your domain and enjoy up to 25%25 rewards directly in your wallet!\n" +
      "\n" +
      "Visit:";

    let url = referUrl;
    let hashtags = "zns,znsconnect";
    Linking.openURL(
      `https://twitter.com/intent/tweet?text=${description}&url=${url}&hashtags=${hashtags}`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Referral Link */}
        <Pressable style={styles.referralLinkContainer} onPress={onCopy}>
          <Text style={styles.referralLink}>Referral link</Text>
          <MaterialCommunityIcons
            name="link-variant"
            size={getWidthSize(11)}
            color={CustomDarkTheme.colors.primary}
          />
        </Pressable>

        {/* Share */}
        <Pressable style={styles.shareContainer} onPress={onShare}>
          <Image source={require("@/assets/images/icons/share.png")} />
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
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
          <Text style={styles.name}>Nakamoto</Text>
          <Text style={styles.bio}>Bitcoin Cryptocurrency</Text>
          <Text style={styles.role}>Chief Executive Officer</Text>
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
    borderRadius: getWidthSize(16),
    backgroundColor: `${CustomDarkTheme.colors.primary}1A`,
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(6),
    gap: getWidthSize(6),
  },
  referralLink: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.primary,
    marginTop: getHeightSize(3),
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.actionBg,
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(6),
    gap: getWidthSize(6),
  },
  shareText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: "white",
    marginTop: getHeightSize(3),
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
    top: getHeightSize(11),
    right: getWidthSize(11),
  },
  nameContainer: {
    flexDirection: "column",
    gap: getWidthSize(10),
  },
  name: {
    color: CustomDarkTheme.colors.primary,
    ...fontStyles["Orbitron-SemiBold"],
    fontSize: getFontSize(20),
  },
  bio: {
    ...fontStyles["SpaceGrotesk-Regular"],
    fontSize: getFontSize(14),
    color: "white",
  },
  role: {
    color: CustomDarkTheme.colors.primary,
    ...fontStyles["Orbitron-SemiBold"],
    fontSize: getFontSize(14),
  },
  nameEditIcon: {
    padding: getWidthSize(10),
  },
});
