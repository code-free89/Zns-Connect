import { FontAwesome6 } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Button from "@/components/ui/Button";
import FormTextInput from "@/components/ui/forms/FormTextInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { uploadPhoto } from "@/lib/api/upload";
import { useAppDispatch, useAppSelector } from "@/store";
import { setHIPData } from "@/store/slices/hip";
import { validateFileSize } from "@/utils/file";
import { copyToClipboard } from "@/utils/helpers";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { updateHIPProfile } from "@/lib/api/hip";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export default function HipProfile() {
  const dispatch = useAppDispatch();
  const hipData = useAppSelector((state) => state.hip);
  const { user } = useAppSelector((state) => state.user);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      name: hipData.name,
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const referUrl = useMemo(
    () =>
      user && user.referralCode
        ? `${process.env.EXPO_PUBLIC_APP_URL}?ref=${user.referralCode}`
        : `${process.env.EXPO_PUBLIC_APP_URL}`,
    [user]
  );

  const onCopy = () => {
    if (user) {
      copyToClipboard(referUrl);
      showSuccessToast("Copied to clipboard");
    }
  };

  const onShare = () => {
    let description =
      "🟢 Big news for @znsconnect!\n" +
      "\n" +
      "🟢 Mint your domain and enjoy up to 25%25 rewards directly in your wallet!\n" +
      "\n" +
      "Visit:";

    let url = referUrl;
    let hashtags = "zns,znsconnect";
    Linking.openURL(
      `https://twitter.com/intent/tweet?text=${description}&url=${url}&hashtags=${hashtags}`
    );
  };

  const handleHipImageUpload = async () => {
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

    if (asset && hipData) {
      try {
        const res = await uploadPhoto(asset, "hip", hipData.id);
        if (res.url) {
          dispatch(setHIPData({ mainImgUrl: res.url }));
        }
      } catch (error) {
        showErrorToast("Failed to upload photo");
      }
    }
  };

  const onSubmit = async (formData: any) => {
    if (!isSavingProfile && formData.name) {
      setIsSavingProfile(true);
      const res = await updateHIPProfile(
        hipData.id,
        formData.name,
        formData.bio ?? "",
        formData.position ?? ""
      );
      if (res && res.name) {
        dispatch(
          setHIPData({
            name: res.name,
            bio: res.bio ?? "",
            position: res.position ?? "",
          })
        );
        showSuccessToast("Your profile has updated successfully!");
        setIsEditing(false);
      }
      setIsSavingProfile(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Referral Link */}
        <Pressable style={styles.referralLinkContainer} onPress={onCopy}>
          <Text style={styles.referralLink}>Referral link</Text>
          <MaterialCommunityIcons
            name="link-variant"
            size={getWidthSize(11)}
            color={CustomDarkTheme.colors.primary}
          />
        </Pressable>

        {/* Share */}
        <Pressable style={styles.shareContainer} onPress={onShare}>
          <Image source={require("@/assets/images/icons/share.png")} />
          <Text style={styles.shareText}>Share</Text>
        </Pressable>
      </View>

      <View style={styles.avatarContainer}>
        {!!hipData.mainImgUrl ? (
          <Image
            source={{ uri: hipData.mainImgUrl }}
            style={{ width: "100%", height: "100%" }}
          />
        ) : (
          <Image
            source={require("@/assets/images/app/hip_avatar.png")}
            style={{ width: "100%", height: "100%", opacity: 0.3 }}
          />
        )}
        <FontAwesome6
          name="edit"
          size={getWidthSize(21)}
          color={CustomDarkTheme.colors.p700}
          style={styles.editIcon}
          onPress={handleHipImageUpload}
        />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {isEditing ? (
          <View style={{ flex: 1, gap: getHeightSize(10) }}>
            <FormTextInput
              name="name"
              control={control}
              placeholder="Enter your name"
            />
            <FormTextInput
              name="bio"
              control={control}
              placeholder="Enter your bio"
            />
            <FormTextInput
              name="position"
              control={control}
              placeholder="Enter your position"
            />

            <View style={{ flexDirection: "row", gap: getWidthSize(10) }}>
              <Button
                title="Cancel"
                variant="outline"
                disabled={!isDirty || isSavingProfile}
                onPress={() => {
                  setIsEditing(false);
                  reset();
                }}
                style={{ flex: 1, paddingVertical: getHeightSize(12) }}
              />
              <Button
                title="Save"
                disabled={!isDirty}
                loading={isSavingProfile}
                loadingText="Saving..."
                onPress={handleSubmit(onSubmit)}
                style={{ flex: 1, paddingVertical: getHeightSize(12) }}
              />
            </View>
          </View>
        ) : (
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{hipData.name || ""}</Text>
            <Text style={styles.bio}>
              {hipData.bio || "Bitcoin Cryptocurrency"}
            </Text>
            <Text style={styles.role}>
              {hipData.position || "Chief Executive Officer"}
            </Text>
          </View>
        )}
        {!isEditing && (
          <FontAwesome6
            name="edit"
            size={21}
            color={CustomDarkTheme.colors.p700}
            style={styles.nameEditIcon}
            onPress={() => setIsEditing(true)}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 16,
    paddingHorizontal: getWidthSize(18),
    paddingVertical: getHeightSize(20),
    gap: getWidthSize(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
  },
  referralLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: getWidthSize(16),
    backgroundColor: `${CustomDarkTheme.colors.primary}1A`,
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(6),
    gap: getWidthSize(6),
  },
  referralLink: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.primary,
    marginTop: getHeightSize(3),
  },
  shareContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.actionBg,
    paddingHorizontal: getWidthSize(16),
    paddingVertical: getHeightSize(6),
    gap: getWidthSize(6),
  },
  shareText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    color: "white",
    marginTop: getHeightSize(3),
  },
  avatarContainer: {
    width: "100%",
    aspectRatio: 1.27,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.primary,
  },
  editIcon: {
    position: "absolute",
    top: getHeightSize(11),
    right: getWidthSize(11),
  },
  nameContainer: {
    flexDirection: "column",
    gap: getWidthSize(10),
  },
  name: {
    color: CustomDarkTheme.colors.primary,
    ...fontStyles["Orbitron-SemiBold"],
    fontSize: getFontSize(20),
  },
  bio: {
    ...fontStyles["SpaceGrotesk-Regular"],
    fontSize: getFontSize(14),
    color: "white",
  },
  role: {
    color: CustomDarkTheme.colors.primary,
    ...fontStyles["Orbitron-SemiBold"],
    fontSize: getFontSize(14),
  },
  nameEditIcon: {
    padding: getWidthSize(10),
  },
});
