import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  FlatList,
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
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

function SocialAccount({
  icon,
  label,
  link,
}: {
  icon: any;
  label: string;
  link: string;
}) {
  const handleOpenLink = () => {
    Linking.openURL(link);
  };

  const handlePressMore = (e: any) => {
    e.stopPropagation();
  };

  return (
    <Pressable style={styles.socialContainer} onPress={handleOpenLink}>
      <Image source={icon} style={styles.socialIcon} />
      <Text style={styles.socialLabel}>{label}</Text>
      <MaterialCommunityIcons
        name="dots-vertical"
        size={getWidthSize(20)}
        color="white"
        onPress={handlePressMore}
      />
    </Pressable>
  );
}

export default function CommunityView() {
  const { profile, ownerStore } = useAppSelector((state) => state.profile);

  const links = useMemo(
    () =>
      [
        {
          id: 2,
          icon: require("@/assets/images/icons/social/twitter.png"),
          label: "Twitter",
          link: profile?.twitter ? `https://x.com/${profile?.twitter}` : "",
          verified: profile?.twitterVerified,
        },
        {
          id: 3,
          icon: require("@/assets/images/icons/social/discord.png"),
          label: "Discord",
          link: profile?.discord,
          isForCopy: true,
          verified: profile?.discordVerified,
        },
        {
          id: 5,
          icon: require("@/assets/images/icons/social/telegram.png"),
          label: "Telegram",
          link: profile?.telegram ? `https://t.me/${profile?.telegram}` : "",
          verified: profile?.telegramVerified,
        },
        {
          id: 4,
          icon: require("@/assets/images/icons/social/linkedin.png"),
          label: "Linkedin",
          link: profile?.linkedin
            ? `https://www.linkedin.com/in/${profile?.linkedin}`
            : "",
          verified: profile?.linkedinVerified,
        },
      ].filter((item) => !!item.link),
    [profile, ownerStore]
  );

  if (links.length === 0) return null;

  return (
    <FlatList
      data={links}
      numColumns={2}
      renderItem={({ item }) => <SocialAccount {...item} />}
      style={{ marginTop: getHeightSize(32) }}
      ItemSeparatorComponent={() => (
        <View style={{ height: getHeightSize(16) }} />
      )}
      columnWrapperStyle={{ gap: getWidthSize(16) }}
      scrollEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  socialContainer: {
    flex: 0.5,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: CustomDarkTheme.colors.grey2,
    gap: 10,
  },
  socialIcon: {
    width: getWidthSize(24),
    height: getWidthSize(24),
  },
  socialLabel: {
    flex: 1,
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
});
