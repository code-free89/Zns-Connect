import { useMemo } from "react";
import { ActivityIndicator, View } from "react-native";

import EmptyBadges from "@/components/zns/badges/EmptyBadges";
import GeneralBadgesView from "@/components/zns/GeneralBadgesView";
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

  return isLoading ? (
    <ActivityIndicator
      size="large"
      color={CustomDarkTheme.colors.primary}
      style={{ marginTop: 40 }}
    />
  ) : badges.length > 0 ? (
    <View style={{ padding: 16, flex: 1 }}>
      <GeneralBadgesView badges={badges} />
    </View>
  ) : (
    <EmptyBadges />
  );
}
