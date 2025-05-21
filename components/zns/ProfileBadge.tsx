import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { IconSymbol } from "@/components/ui/IconSymbol";
import InteractiveButton from "@/components/ui/InteractiveButton";
import { BadgeDataType, Badges, BadgeStatus } from "@/constants/badges";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { claimBadge } from "@/lib/api/user/badge";
import { useAppDispatch, useAppSelector } from "@/store";
import { setStoreUser } from "@/store/slices/user";
import { showSuccessToast } from "@/utils/toast";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
interface ProfileBadgeProps {
  badge: {
    data: BadgeDataType;
    type: (typeof Badges)[keyof typeof Badges];
    title: string;
    description: string;
    banner: any;
    rule: "follow" | "length" | "domains";
    value: number;
  };
}

export default function ProfileBadge({ badge }: ProfileBadgeProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  const onClaim = async () => {
    if (badge.data.status === BadgeStatus.ready && user?.id) {
      setIsLoading(true);
      const updatedUser = await claimBadge(user.id, badge.type);
      showSuccessToast("You have claimed successfully!");
      if (updatedUser) {
        dispatch(setStoreUser(updatedUser));
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", padding: 3 }}>
        <Image
          source={badge.banner}
          style={{ width: "100%" }}
          resizeMode="stretch"
        />
      </View>
      <Text style={styles.name}>{badge.title}</Text>
      <InteractiveButton
        style={[
          styles.claimButton,
          {
            backgroundColor:
              badge.data.status === BadgeStatus.ready
                ? "#C9FC01F2"
                : CustomDarkTheme.colors.grey2,
          },
        ]}
        loading={isLoading}
        loadingText="Claiming..."
        textStyle={styles.available}
        keepContent
        disabled={badge.data.status !== BadgeStatus.ready}
        onPress={() => onClaim()}
      >
        {badge.data.status === BadgeStatus.claimed ? (
          <Text style={styles.claimed}>Claimed</Text>
        ) : badge.data.status === BadgeStatus.ready ? (
          <Text style={styles.available}>Claim</Text>
        ) : (
          <Text style={styles.not_available}>Not Available</Text>
        )}
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={`${CustomDarkTheme.colors.p950}`}
        />
      </InteractiveButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.body,
    marginTop: getHeightSize(2),
    textAlign: "left",
    width: "100%",
    paddingLeft: getWidthSize(4),
    paddingVertical: getHeightSize(2),
  },
  claimed: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: `${CustomDarkTheme.colors.p500}40`,
    marginTop: getHeightSize(2),
  },
  available: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.p950,
    marginTop: getHeightSize(2),
  },
  not_available: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: `${CustomDarkTheme.colors.p500}40`,
    marginTop: getHeightSize(2),
  },
  status: {
    width: "100%",
    borderBottomStartRadius: getWidthSize(12),
    borderBottomEndRadius: getWidthSize(12),
    paddingHorizontal: getWidthSize(4),
    padding: getHeightSize(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  claimButton: {
    paddingHorizontal: getWidthSize(4),
    paddingVertical: getHeightSize(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
  },
});
