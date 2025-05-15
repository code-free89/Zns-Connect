import { StyleSheet, Text, View } from "react-native";

import SocialInput from "@/components/zns/SocialInput";
import { fontStyles } from "@/constants/fonts";
import { ApplicationIcon, MediumIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize } from "@/utils/size";

const OTHER_LINKS = [
  {
    id: 1,
    icon: <ApplicationIcon width={18} height={18} />,
    label: "Application",
    key: "twitter",
    placeholder: "elonmusk",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://x.com/elonmusk\n✅ elonmusk`,
  },
  {
    id: 2,
    icon: require("@/assets/images/icons/link/Mirror.png"),
    label: "Mirror",
    key: "telegram",
    placeholder: "elonmusk",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://t.me/elonmusk\n✅ elonmusk`,
  },
];

export default function OtherLinks() {
  return (
    <View>
      <Text style={styles.title}>Other Links</Text>
      <View style={styles.linksContainer}>
        {OTHER_LINKS.map((link) => (
          <SocialInput {...link} />
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
