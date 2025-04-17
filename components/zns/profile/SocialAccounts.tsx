import { FlatList, Image, StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ZnsText from "@/components/ui/Text";

import { CustomDarkTheme } from "@/constants/theme";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";

const SOCIAL_ACCOUNTS = [
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "x (Twitter)",
  },
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "Discord",
  },
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "Telegram",
  },
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "Linkedin",
  },
];

const OFFICIAL_ACCOUNTS = [
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "Website",
  },
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "App",
  },
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "Medium",
  },
  {
    icon: <Image source={require("@/assets/images/icons/location.png")} />,
    label: "Mirror",
  },
];

const SocialAccount = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <View style={styles.socialContainer}>
    {icon}
    <ZnsText type="medium" style={styles.socialLabel}>
      {label}
    </ZnsText>
    <MaterialCommunityIcons name="dots-vertical" size={20} color="white" />
  </View>
);

const OfficialAccount = ({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) => (
  <View style={styles.officialContainer}>
    {icon}
    <ZnsText type="medium" style={styles.officialLabel}>
      {label}
    </ZnsText>
    <MaterialCommunityIcons name="dots-vertical" size={20} color="white" />
  </View>
);

export default function SocialAccounts() {
  return (
    <View style={styles.container}>
      <FlatList
        data={SOCIAL_ACCOUNTS}
        numColumns={2}
        renderItem={({ item }) => <SocialAccount {...item} />}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        columnWrapperStyle={{ gap: 16 }}
      />

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
      >
        <View style={styles.officialLinksContainer}>
          <ZnsText type="semiBold" style={styles.officialLinksTitle}>
            Official Links
          </ZnsText>

          <FlatList
            data={OFFICIAL_ACCOUNTS}
            numColumns={2}
            renderItem={({ item }) => <OfficialAccount {...item} />}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            columnWrapperStyle={{ gap: 16 }}
          />
        </View>
      </GradientBorderViewWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
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
  socialLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: CustomDarkTheme.colors.txtColor,
  },
  officialLinksContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    gap: 12,
  },
  officialLinksTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: CustomDarkTheme.colors.body,
  },
  officialContainer: {
    flex: 0.5,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    gap: 10,
  },
  officialLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: CustomDarkTheme.colors.txtColor,
  },
});
