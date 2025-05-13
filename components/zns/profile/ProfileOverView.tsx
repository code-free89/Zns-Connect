import { useMemo, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import AbsoluteDropdown from "@/components/ui/AbsoluteDropdown";
import MoreProfileList from "@/components/zns/profile/MoreProfileList";
import { fontStyles } from "@/constants/fonts";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ProfileOverView() {
  const { profile, ownerStore } = useAppSelector((state) => state.profile);
  const [avatar, setAvatarUrl] = useState<string>();
  const [isActionListVisible, setIsActionListVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const avatarUrl = useMemo(
    () => (avatar ? avatar : profile?.mainImgUrl),
    [profile, avatar]
  );

  const bannerURL = profile?.bannerURL ?? "";

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Pressable
            style={styles.actionButtonContainer}
            onPress={() => setIsModalVisible(true)}
          >
            <BarCodeScanIcon color="white" />
          </Pressable>
          <View>
            <Pressable
              style={styles.actionButtonContainer}
              onPress={() => setIsActionListVisible(!isActionListVisible)}
            >
              <ThreeDotIcon />
            </Pressable>

            <AbsoluteDropdown
              isVisible={isActionListVisible}
              style={{ right: 0, top: getHeightSize(40) }}
              onOutsideClick={() => setIsActionListVisible(false)}
            >
              <MoreProfileList
                profile={profile}
                onClose={() => setIsActionListVisible(false)}
              />
            </AbsoluteDropdown>
          </View>
        </View>
        {bannerURL ? (
          <Image
            source={{ uri: profile?.bannerURL }}
            style={{ flex: 1 }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={require("@/assets/images/app/profile/banner.png")}
            style={{
              height: "100%",
              width: "150%",
            }}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.overview}>
        <View style={styles.avatarContainer}>
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={[
                styles.avatar,
                { width: getWidthSize(95), height: getWidthSize(95) },
              ]}
            />
          ) : (
            <Image
              source={require("@/assets/images/app/hip_avatar.png")}
              style={[
                styles.avatar,
                { width: getWidthSize(95), height: getWidthSize(95) },
              ]}
            />
          )}
        </View>
        <View style={styles.overviewItem}>
          <Text style={styles.overviewItemValue}>
            {profile?.followers?.length || 0}
          </Text>
          <Text style={styles.overviewItemTitle}>followers</Text>
        </View>

        <View style={styles.overviewItem}>
          <Text style={styles.overviewItemValue}>
            {profile?.following?.length || 0}
          </Text>
          <Text style={styles.overviewItemTitle}>followings</Text>
        </View>

        <View style={styles.overviewItem}>
          <Text style={styles.overviewItemValue}>
            {ownerStore?.badges?.length || 0}
          </Text>
          <Text style={styles.overviewItemTitle}>Badges</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: getHeightSize(200),
    justifyContent: "flex-end",
  },
  header: {
    position: "absolute",
    top: getHeightSize(16),
    right: getWidthSize(16),
    flexDirection: "row",
    gap: getWidthSize(12),
    zIndex: 100,
  },
  actionButtonContainer: {
    padding: getWidthSize(10),
    borderRadius: getWidthSize(12),
    backgroundColor: CustomDarkTheme.colors.actionBg,
    position: "relative",
  },
  overview: {
    flexDirection: "row",
    gap: getWidthSize(22),
    paddingHorizontal: getWidthSize(16),
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    position: "absolute",
    bottom: getHeightSize(12),
    right: "10%",
    width: "80%",
    aspectRatio: 1,
    borderRadius: 9999,
  },
  overviewItem: {
    paddingVertical: getHeightSize(12),
  },
  overviewItemValue: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  overviewItemTitle: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: "#A3A3A3",
  },
});
