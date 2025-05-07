import { Image, StyleSheet, View } from "react-native";

import { UserIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

type AvatarProps = {
  width: number;
};

export default function Avatar({ width }: AvatarProps) {
  const { userPrimaryDomain } = useAppSelector((state) => state.user);
  const hasPrimaryDomain = !!userPrimaryDomain?.domainName;
  const { profile } = useAppSelector((state) => state.profile);
  const avatarUrl = profile?.mainImgUrl ?? "";

  if (hasPrimaryDomain) {
    return !!avatarUrl ? (
      <Image
        source={{ uri: avatarUrl }}
        style={{ width, height: width, borderRadius: 9999 }}
      />
    ) : (
      <Image
        source={require("@/assets/images/app/hip_avatar.png")}
        style={{ width, height: width, borderRadius: 9999 }}
      />
    );
  }

  return (
    <View style={[styles.container, { width, height: width }]}>
      <UserIcon width={24} height={24} color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CustomDarkTheme.colors.avatarBackground,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
