import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import EmptyStatus from "@/components/zns/profile/EmptyStatus";
import { useAppSelector } from "@/store";
import { router } from "expo-router";
import CommunityView from "./CommunityView";
import OfficialView from "./OfficialView";

export default function SocialAccounts() {
  const { profile, domainInfo } = useAppSelector((state) => state.profile);
  const { address } = useAccount();

  const isSocialLinksEmpty = useMemo(() => {
    return (
      !profile?.twitter &&
      !profile?.discord &&
      !profile?.linkedin &&
      !profile?.telegram
    );
  }, [profile]);

  const isOfficialLinksEmpty = useMemo(() => {
    return !profile?.website && !profile?.application;
  }, [profile]);

  const isMoreLinksEmpty = useMemo(() => {
    return !profile?.medium && !profile?.mirror;
  }, [profile]);

  const isEmpty = useMemo(() => {
    return isSocialLinksEmpty && isOfficialLinksEmpty && isMoreLinksEmpty;
  }, [isSocialLinksEmpty, isOfficialLinksEmpty, isMoreLinksEmpty]);

  const isOwner = useMemo(
    () => domainInfo?.owner === address && address !== undefined,
    [address, domainInfo]
  );

  const handleAddSocials = () => {
    router.push({
      pathname: "/(zns)/manage-profile",
      params: {
        tab: "links",
      },
    });
  };

  return !isEmpty ? (
    <View style={styles.container}>
      <CommunityView />
      <OfficialView />
    </View>
  ) : (
    <EmptyStatus
      isOwner={isOwner}
      title="No link added!"
      description="Start by adding your social links"
      buttonLabel="Add socials now"
      onPress={handleAddSocials}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 32,
  },
});
