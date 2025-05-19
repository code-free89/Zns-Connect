import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import { fontStyles } from "@/constants/fonts";
import {
  CopyIcon,
  EditAvatarIcon,
  EditIcon,
  HeartIcon,
  ShareLineIcon,
} from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useShare } from "@/hooks/useShare";
import { useAppSelector } from "@/store";
import { copyToClipboard } from "@/utils/helpers";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { validateFileSize } from "@/utils/file";
import { uploadPhoto } from "@/lib/api/upload";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

type MoreProfileListProps = {
  updateBanner: (uri: string) => void;
  updateAvatar: (uri: string) => void;
  onClose?: () => void;
};

export default function MoreProfileList({
  updateBanner,
  updateAvatar,
  onClose,
}: MoreProfileListProps) {
  const { address } = useAccount();
  const { profile, domainInfo, domain, tld } = useAppSelector(
    (state) => state.profile
  );

  const isOwner = useMemo(
    () => domainInfo?.owner === address && address !== undefined,
    [address, domainInfo]
  );
  const { onTweet, onCopyShareLink } = useShare({ profile, callback: onClose });

  const onCopyWalletAddress = useCallback(() => {
    if (address) {
      copyToClipboard(address);
      onClose?.();
      showSuccessToast("Wallet address copied to clipboard");
    }
  }, [address]);

  const goToManageProfile = useCallback(() => {
    onClose?.();
    router.push({
      pathname: "/(zns)/manage-profile",
      params: {
        domain: `${domain}.${tld}`,
      },
    });
  }, [onClose, domain, tld]);

  const handleProfileImage = async (type: "banner" | "avatar") => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [3, 1],
      quality: 0.75,
    };

    const result = await ImagePicker.launchImageLibraryAsync(options);

    if (result.canceled) {
      return;
    }

    if (!validateFileSize(result.assets[0])) {
      showErrorToast(
        `File size exceeds the limit of ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
      );
      return;
    }

    const asset = result.assets[0];

    if (asset && profile) {
      try {
        const res = await uploadPhoto(asset, type, profile.id);
        if (type === "banner") {
          updateBanner(res.url);
        } else {
          updateAvatar(res.url);
        }
      } catch (error) {
        showErrorToast("Failed to upload photo");
      }
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {!isOwner && (
          <Pressable style={styles.profileActionItem}>
            <HeartIcon color="#A2A2A2" width={20} height={20} />
            <Text style={styles.profileActionItemText}>
              Add to your favourites
            </Text>
          </Pressable>
        )}

        {isOwner && (
          <Pressable
            style={styles.profileActionItem}
            onPress={() => handleProfileImage("banner")}
          >
            <EditIcon />
            <Text style={styles.profileActionItemText}>Edit cover image</Text>
          </Pressable>
        )}

        {isOwner && (
          <Pressable
            style={styles.profileActionItem}
            onPress={() => handleProfileImage("avatar")}
          >
            <EditAvatarIcon width={20} height={20} />
            <Text style={styles.profileActionItemText}>Edit avatar image</Text>
          </Pressable>
        )}

        {isOwner && (
          <Pressable
            style={styles.profileActionItem}
            onPress={goToManageProfile}
          >
            <EditIcon />
            <Text style={styles.profileActionItemText}>Manage Profile</Text>
          </Pressable>
        )}

        <Pressable style={styles.profileActionItem} onPress={onCopyShareLink}>
          <ShareLineIcon color="#A2A2A2" />
          <Text style={styles.profileActionItemText}>Copy profile link</Text>
        </Pressable>

        {isOwner && (
          <Pressable
            style={styles.profileActionItem}
            onPress={onCopyWalletAddress}
          >
            <CopyIcon />
            <Text style={styles.profileActionItemText}>
              Copy wallet address
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    backgroundColor: "black",
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(17),
    borderRadius: 12,
    width: Dimensions.get("window").width - getWidthSize(32),
  },
  container: {
    flexDirection: "column",
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 16,
    padding: getWidthSize(20),
    gap: getHeightSize(24),
  },
  profileActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
  profileActionItemText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
});
