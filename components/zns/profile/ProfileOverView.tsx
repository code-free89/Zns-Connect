import { Pressable, StyleSheet, Text, View } from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import { useMemo, useState } from "react";
import { Image } from "react-native";
import { ThreeDotIcon } from "@/constants/icons";
import { BarCodeScanIcon } from "@/constants/icons";

export default function ProfileOverView() {
  const { profile, ownerStore } = useAppSelector((state) => state.profile);
  const [avatar, setAvatarUrl] = useState<string>();
  const [avatarWidth, setAvatarWidth] = useState(95);

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
            <BarCodeScanIcon color={CustomDarkTheme.colors.primary} />
          </Pressable>
          <View>
            <Pressable
              style={styles.actionButtonContainer}
              onPress={() => setIsActionListVisible(!isActionListVisible)}
            >
              <ThreeDotIcon />
            </Pressable>
            {/* {isActionListVisible && (
            <AccountActionList onClose={() => setIsActionListVisible(false)} />
          )} */}
          </View>
        </View>
        {bannerURL ? (
          <Image
            source={{ uri: profile?.bannerURL }}
            style={{
              width: "100%",
              height: "100%",
            }}
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
        <View
          style={styles.avatarContainer}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setAvatarWidth(width * 0.8);
          }}
        >
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              style={[
                styles.avatar,
                { width: avatarWidth, height: avatarWidth },
              ]}
            />
          ) : (
            <Image
              source={require("@/assets/images/app/hip_avatar.png")}
              style={[
                styles.avatar,
                { width: avatarWidth, height: avatarWidth },
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
    flex: 1,
    height: 240,
    justifyContent: "flex-end",
  },
  header: {
    position: "absolute",
    top: 16,
    right: 16,
    flexDirection: "row",
    gap: 12,
    zIndex: 100,
  },
  actionButtonContainer: {
    padding: 10,
    borderRadius: 12,
    backgroundColor: CustomDarkTheme.colors.actionBg,
    position: "relative",
  },
  overview: {
    flexDirection: "row",
    gap: 22,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    position: "absolute",
    bottom: 12,
    right: "10%",
    width: "80%",
    aspectRatio: 1,
    borderRadius: 9999,
  },
  overviewItem: {
    paddingVertical: 12,
  },
  overviewItemValue: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: 14,
    lineHeight: 14 * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  overviewItemTitle: {
    ...fontStyles["Poppins-Regular"],
    fontSize: 12,
    lineHeight: 12 * 1.5,
    color: "#A3A3A3",
  },
});
