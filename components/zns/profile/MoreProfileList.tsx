import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";

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
import { CombinedProfile } from "@/store/slices/profile";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

export default function MoreProfileList({
  profile,
  onClose,
}: {
  profile: CombinedProfile | null;
  onClose?: () => void;
}) {
  const { onTweet, onCopyShareLink } = useShare({ profile, callback: onClose });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Pressable style={styles.profileActionItem}>
          <HeartIcon color="#A2A2A2" width={20} height={20} />
          <Text style={styles.profileActionItemText}>
            Add to your favourites
          </Text>
        </Pressable>

        <Pressable style={styles.profileActionItem} onPress={onCopyShareLink}>
          <EditIcon />
          <Text style={styles.profileActionItemText}>Edit cover image</Text>
        </Pressable>

        <Pressable style={styles.profileActionItem} onPress={onCopyShareLink}>
          <EditAvatarIcon width={20} height={20} />
          <Text style={styles.profileActionItemText}>Edit avatar image</Text>
        </Pressable>

        <Pressable style={styles.profileActionItem} onPress={onCopyShareLink}>
          <EditIcon />
          <Text style={styles.profileActionItemText}>Manage Profile</Text>
        </Pressable>

        <Pressable style={styles.profileActionItem} onPress={onCopyShareLink}>
          <ShareLineIcon color="#A2A2A2" />
          <Text style={styles.profileActionItemText}>Copy profile link</Text>
        </Pressable>

        <Pressable style={styles.profileActionItem} onPress={onCopyShareLink}>
          <CopyIcon />
          <Text style={styles.profileActionItemText}>Copy wallet address</Text>
        </Pressable>
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
