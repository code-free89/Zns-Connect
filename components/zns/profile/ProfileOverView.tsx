import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import AbsoluteDropdown from "@/components/ui/AbsoluteDropdown";
import AddressQRModal from "@/components/zns/home/AddressQRModal";
import DomainSwitcher from "@/components/zns/modules/domain-switcher";
import MoreProfileList from "@/components/zns/profile/MoreProfileList";
import { fontStyles } from "@/constants/fonts";
import { BarCodeScanIcon, ThreeDotIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useShare } from "@/hooks/useShare";
import { useAppSelector } from "@/store";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function ProfileOverView() {
  const { profile, ownerStore, domain, tld } = useAppSelector(
    (state) => state.profile
  );
  const { width } = useWindowDimensions();
  const { onTweet } = useShare({ profile });
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
          <DomainSwitcher
            containerStyle={{
              width: getWidthSize(130),
              height: getHeightSize(32),
            }}
          />

          <Pressable style={styles.actionButtonContainer} onPress={onTweet}>
            <FontAwesome6 name="x-twitter" size={14} color="white" />
          </Pressable>
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

      <Image
        source={require("@/assets/images/app/profile/avatar-wrapper.png")}
        style={styles.avatarWrapper}
      />

      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={[
            styles.avatar,
            {
              left: width / 20 + ((width * 35) / 100 - getWidthSize(95)) / 2,
            },
          ]}
        />
      ) : (
        <Image
          source={require("@/assets/images/app/hip_avatar.png")}
          style={[
            styles.avatar,
            {
              left: width / 20 + ((width * 35) / 100 - getWidthSize(95)) / 2,
            },
          ]}
        />
      )}

      <View style={styles.statusContainer}>
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

      <AddressQRModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        address={`${process.env.EXPO_PUBLIC_ZNS_URL}/${domain}.${tld}`}
      />
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
    width: getWidthSize(32),
    height: getHeightSize(32),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: getWidthSize(12),
    backgroundColor: CustomDarkTheme.colors.actionBg,
    position: "relative",
  },
  avatarContainer: {
    flex: 1,
  },
  avatar: {
    position: "absolute",
    bottom: getHeightSize(12),
    aspectRatio: 1,
    borderRadius: 9999,
    width: getWidthSize(95),
    height: getWidthSize(95),
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
  avatarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
  },
  statusContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingRight: getWidthSize(16),
    gap: getWidthSize(12),
    width: "60%",
  },
});
