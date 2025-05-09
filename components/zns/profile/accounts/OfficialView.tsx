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

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { ApplicationIcon, MediumIcon, WorldIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

function OfficialAccount({
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
    <Pressable style={styles.officialContainer} onPress={handleOpenLink}>
      {icon}
      <Text style={[fontStyles["Poppins-Medium"], styles.officialLabel]}>
        {label}
      </Text>
      <MaterialCommunityIcons
        name="dots-vertical"
        size={20}
        color="white"
        onPress={handlePressMore}
      />
    </Pressable>
  );
}

export default function OfficialView() {
  const { profile } = useAppSelector((state) => state.profile);

  const OFFICIAL_LINKS = useMemo(
    () =>
      [
        {
          id: 1,
          icon: <WorldIcon />,
          label: "Website",
          link: profile?.website,
          verified: profile?.websiteVerified,
        },
        {
          id: 2,
          icon: <ApplicationIcon />,
          label: "Application",
          link: profile?.application,
          verified: profile?.applicationVerified,
        },
      ].filter((item) => !!item.link),
    [profile]
  );

  const MORE_LINKS = useMemo(
    () =>
      [
        {
          id: 1,
          icon: <MediumIcon />,
          label: "Medium",
          link: profile?.medium,
          verified: profile?.mediumVerified,
        },
        {
          id: 2,
          icon: (
            <Image source={require("@/assets/images/icons/link/Mirror.png")} />
          ),
          label: "Mirror",
          link: profile?.mirror,
          verified: profile?.mirrorVerified,
        },
      ].filter((item) => !!item.link),
    [profile]
  );

  return OFFICIAL_LINKS.length > 0 || MORE_LINKS.length > 0 ? (
    <GradientBorderViewWrapper
      gradientColors={CustomDarkTheme.gradientColors.linear2}
    >
      <View style={styles.officialLinksContainer}>
        <Text
          style={[fontStyles["Poppins-SemiBold"], styles.officialLinksTitle]}
        >
          Official Links
        </Text>

        <FlatList
          data={[...OFFICIAL_LINKS, ...MORE_LINKS]}
          numColumns={2}
          renderItem={({ item }) => <OfficialAccount {...item} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          columnWrapperStyle={{ gap: 16 }}
          scrollEnabled={false}
        />
      </View>
    </GradientBorderViewWrapper>
  ) : null;
}

const styles = StyleSheet.create({
  officialLinksContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    gap: 12,
  },
  officialLinksTitle: {
    fontSize: 18,
    lineHeight: 18 * 1.5,
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
    lineHeight: 14 * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
});
