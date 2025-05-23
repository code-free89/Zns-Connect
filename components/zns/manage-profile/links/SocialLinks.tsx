import { StyleSheet, Text, View } from "react-native";

import SocialInput from "@/components/zns/SocialInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize } from "@/utils/size";
import { useAppSelector } from "@/store";

const SOCIAL_LINKS = [
  {
    id: 1,
    icon: require("@/assets/images/icons/social/twitter.png"),
    label: "x.com/",
    provider: "twitter",
    placeholder: "elonmusk",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://x.com/elonmusk\n✅ elonmusk`,
  },
  {
    id: 2,
    icon: require("@/assets/images/icons/social/telegram.png"),
    label: "t.me/",
    provider: "telegram",
    placeholder: "elonmusk",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://t.me/elonmusk\n✅ elonmusk`,
  },
  {
    id: 3,
    icon: require("@/assets/images/icons/social/linkedin.png"),
    label: "linkedin.com/",
    provider: "linkedin",
    placeholder: "username...",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://linkedin.com/in/elonmusk\n✅ elonmusk`,
  },
  {
    id: 4,
    icon: require("@/assets/images/icons/social/discord.png"),
    label: "",
    provider: "discord",
    placeholder: "username...",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://discord.com/@elonmusk\n✅ elonmusk`,
  },
];

export default function SocialLinks() {
  const { profile } = useAppSelector((state) => state.profile);
  console.log("profile", profile);

  return (
    <View>
      <Text style={styles.title}>Social Links</Text>
      <View style={styles.linksContainer}>
        {SOCIAL_LINKS.map((link) => (
          <SocialInput key={link.provider} {...link} needVerify />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(18),
    lineHeight: getFontSize(18) * 1.5,
    color: CustomDarkTheme.colors.body,
    paddingBottom: getHeightSize(16),
  },
  linksContainer: {
    gap: getHeightSize(24),
  },
});
