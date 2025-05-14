import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import EmptyStatus from "@/components/zns/profile/EmptyStatus";
import { useAppSelector } from "@/store";
import { getHeightSize } from "@/utils/size";
import FollowItem from "../../FollowItem";

export default function ProfileFollowingList() {
  const { profile, domain, tld, domainInfo } = useAppSelector(
    (state) => state.profile
  );
  const { address } = useAccount();
  const isOwner = useMemo(
    () => domainInfo?.owner === address && address !== undefined,
    [address, domainInfo]
  );

  return profile?.following?.length ? (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(_, index) => `following_${index}`}
        data={profile.following}
        renderItem={({ item }) => (
          <FollowItem item={item.to as any} isOwner={isOwner} />
        )}
        ItemSeparatorComponent={() => (
          <View style={{ height: getHeightSize(24) }} />
        )}
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
