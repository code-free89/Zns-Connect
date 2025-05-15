import { StyleSheet, Text, View } from "react-native";

import SocialInput from "@/components/zns/SocialInput";
import { fontStyles } from "@/constants/fonts";
import { MediumIcon, WorldIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize } from "@/utils/size";

const OFFICIAL_LINKS = [
  {
    id: 1,
    icon: <WorldIcon />,
    label: "Website",
    key: "twitter",
    placeholder: "elonmusk",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://x.com/elonmusk\n✅ elonmusk`,
  },
  {
    id: 2,
    icon: <MediumIcon width={18} height={18} />,
    label: "Medium",
    key: "telegram",
    placeholder: "elonmusk",
    tipContent: `Please provide only your username, not the full link.\nExample:\n❌ https://t.me/elonmusk\n✅ elonmusk`,
  },
];

export default function OfficialLinks() {
  return (
    <View>
      <Text style={styles.title}>Official Links</Text>
      <View style={styles.linksContainer}>
        {OFFICIAL_LINKS.map((link) => (
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
