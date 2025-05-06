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
      <View style={{ width: 150 }}>
        <Text style={styles.name}>{item.domainName}</Text>
        {/* <Text style={styles.description}>{item.description}</Text> */}
      </View>
      {userPrimaryDomainDB?.id !== item.id && (
        <InteractiveButton
          keepContent
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
    gap: 12,
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.grey2,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: 500,
    color: CustomDarkTheme.colors.txtColor,
  },
  description: {
    fontSize: 12,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
  },
  followingText: {
    fontSize: 12,
    fontWeight: 600,
    color: CustomDarkTheme.colors.p700,
  },
  followText: {
    fontSize: 12,
    fontWeight: 600,
    color: CustomDarkTheme.colors.p950,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    width: 92,
    paddingHorizontal: 10,
    paddingVertical: 11,
    marginLeft: "auto",
  },
});
