import { router } from "expo-router";
import { useMemo } from "react";
import { useAccount } from "wagmi";

import GeneralBadgesView from "@/components/zns/GeneralBadgesView";
import EmptyStatus from "@/components/zns/profile/EmptyStatus";
import { badges as badgesConfig, BadgeStatus } from "@/constants/badges";
import { useAppSelector } from "@/store";

export default function BadgeList() {
  const { ownerStore, domainInfo } = useAppSelector((state) => state.profile);
  const userBadges = useMemo(() => ownerStore?.badges ?? [], [ownerStore]);
  const { address } = useAccount();

  const badges = useMemo(
    () =>
      badgesConfig
        .filter((item) => userBadges.includes(item.type))
        .map((badge) => ({ ...badge, data: { status: BadgeStatus.claimed } })),
    [userBadges]
  );

  const isOwner = useMemo(
    () => domainInfo?.owner === address && address !== undefined,
    [address, domainInfo]
  );

  const handleMintBadges = () => {
    router.push("/(zns)/badges");
  };

  return badges.length > 0 ? (
    <GeneralBadgesView badges={badges} enableScroll={false} />
  ) : (
    <EmptyStatus
      isOwner={isOwner}
      title={"No badge yet!"}
      description={"Start by minting a badge!"}
      buttonLabel={"Mint badge"}
      onPress={handleMintBadges}
    />
  );
}
