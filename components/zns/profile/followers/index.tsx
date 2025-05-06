import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import FollowItem from "@/components/zns/FollowItem";
import { useAppSelector } from "@/store";
import EmptyStatus from "../EmptyStatus";

const followers = [
  {
    name: "Metamask",
    avatar: require("@/assets/images/app/badges/1-letter.png"),
    description: "metomask.cz,Tokyo,Tech innovator",
    isFollowing: true,
  },
  {
    name: "Bigman",
    avatar: require("@/assets/images/app/badges/2-letter.png"),
    description: "metomask.cz,Tokyo,Tech innovator",
    isFollowing: false,
  },
];

export default function ProfileFollowers() {
  const { profile, domainInfo } = useAppSelector((state) => state.profile);
  const { address } = useAccount();
  const isOwner = useMemo(
    () => domainInfo?.owner === address && address !== undefined,
    [address, domainInfo]
  );

  return profile?.followers?.length ? (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `follower_${index}`}
        data={profile.followers}
        renderItem={({ item }) => (
          <FollowItem item={item.from as any} isOwner={isOwner} />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
        scrollEnabled={false}
      />
    </View>
  ) : (
    <EmptyStatus
      isOwner={isOwner}
      title={"No followers list yet!"}
      description={"Start by minting a badge!"}
      buttonLabel={""}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
