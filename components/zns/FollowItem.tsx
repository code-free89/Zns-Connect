import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import InteractiveButton from "@/components/ui/InteractiveButton";
import DomainAvatar from "@/components/zns/DomainAvatar";
import { CustomDarkTheme } from "@/constants/theme";
import { getChainByChain } from "@/constants/web3/chains";
import { useFollow } from "@/hooks/useFollow";
import { useTLD } from "@/hooks/web3/useTLD";
import { useAppSelector } from "@/store";
import { fontStyles } from "@/constants/fonts";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

interface FollowItemProps {
  item: {
    id: string;
    domainName: string;
    chain: string;
    dId: string;
  };
  isOwner: boolean;
}

export default function FollowItem({ item, isOwner }: FollowItemProps) {
  const { userPrimaryDomainDB } = useAppSelector((state) => state.user);
  const chainId = useMemo(
    () => (item.chain ? getChainByChain(item.chain).id : 0),
    [item]
  );
  const tld = useTLD(chainId);
  const domain = item?.domainName && tld ? `${item?.domainName}.${tld}` : "";
  const { isProcessing, isFollowed, handleFollow } = useFollow(
    item.id,
    domain,
    false,
    isOwner
  );

  return (
    <View style={styles.container}>
      <DomainAvatar
        chainId={item.chain as any}
        domainId={item.dId}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.domainName}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
      </View>
      {userPrimaryDomainDB?.id !== item.id && (
        <InteractiveButton
          keepContent
          variant={isFollowed ? "outline" : "primary"}
          style={styles.statusButton}
          loading={isProcessing}
          onPress={() => handleFollow(isFollowed ? "unfollow" : "follow")}
        >
          {isFollowed ? (
            <AntDesign
              name="checkcircleo"
              size={12}
              color={CustomDarkTheme.colors.p700}
            />
          ) : (
            <AntDesign
              name="pluscircleo"
              size={12}
              color={CustomDarkTheme.colors.p950}
            />
          )}
          <Text style={isFollowed ? styles.followingText : styles.followText}>
            {isFollowed ? "Followed" : "Follow"}
          </Text>
        </InteractiveButton>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(12),
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(10),
  },
  avatar: {
    width: getWidthSize(32),
    height: getWidthSize(32),
    borderRadius: getWidthSize(100),
  },
  name: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  followingText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.p700,
  },
  followText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.p950,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(4),
    width: getWidthSize(92),
    paddingHorizontal: getWidthSize(10),
    paddingVertical: getHeightSize(11),
    marginLeft: "auto",
  },
});
