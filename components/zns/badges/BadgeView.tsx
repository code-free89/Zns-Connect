import { useMemo } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import EmptyBadges from "@/components/zns/badges/EmptyBadges";
import ProfileBadge from "@/components/zns/ProfileBadge";
import { BadgeStatus, getBadgeData } from "@/constants/badges";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";

export default function BadgeView({ selectedTab }: { selectedTab: string }) {
  const { followersOfUser, user, isLoadingFollowerOfUserData } = useAppSelector(
    (state) => state.user
  );

  const { isLoadingBadge } = useAppSelector((state) => state.badges);

  const { domains: userDomains, isLoading: isLoadingUserDomains } =
    useAppSelector((state) => state.userDomains);

  const isLoading = useMemo(
    () => isLoadingBadge || isLoadingFollowerOfUserData || isLoadingUserDomains,
    [isLoadingBadge, isLoadingFollowerOfUserData, isLoadingUserDomains]
  );

  const badgeData = useMemo(() => {
    const domains = userDomains?.map((item) => item.domainName) ?? [];
    return getBadgeData(domains, followersOfUser.length, user?.badges ?? []);
  }, [userDomains, followersOfUser, user]);

  const badges = useMemo(() => {
    if (selectedTab === "claimed") {
      return badgeData.filter(
        (item) => item.data.status === BadgeStatus.claimed
      );
    }
    if (selectedTab === "unclaimed") {
      return badgeData.filter((item) => item.data.status === BadgeStatus.ready);
    }
    if (selectedTab === "not_available") {
      return badgeData.filter(
        (item) => item.data.status === BadgeStatus.not_available
      );
    }
    return badgeData;
  }, [badgeData, selectedTab]);

  const numColumns = 3;
  const filledBadges = useMemo(() => {
    if (badges.length === 0) return [];

    const remainder = badges.length % numColumns;
    const emptyItemsNeeded = remainder === 0 ? 0 : numColumns - remainder;

    return [
      ...badges,
      ...Array(emptyItemsNeeded).fill({ type: "empty", isPlaceholder: true }),
    ];
  }, [badges, numColumns]);

  const renderItem = ({ item }: { item: any }) => {
    if (item.isPlaceholder) {
      return <View style={{ flex: 1 }} />;
    }
    return <ProfileBadge badge={item} />;
  };

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={CustomDarkTheme.colors.primary}
      style={{ marginTop: 40 }}
    />
  ) : badges.length > 0 ? (
    <FlatList
      keyExtractor={(item) => item.type}
      data={filledBadges}
      numColumns={numColumns}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
      columnWrapperStyle={{ gap: 8 }}
      contentContainerStyle={{ padding: 16 }}
    />
  ) : (
    <EmptyBadges />
  );
}
