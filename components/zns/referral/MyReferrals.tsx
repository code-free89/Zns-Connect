import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import { fontStyles } from "@/constants/fonts";
import { REWARDS } from "@/constants/profile";
import { CustomDarkTheme } from "@/constants/theme";
import { usePagination } from "@/hooks/usePagination";
import { useAppSelector } from "@/store";
import { shortenWalletAddress } from "@/utils/formatter";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import EmptyStatus from "../profile/EmptyStatus";
import ReferralPagination from "./Pagination";

function ReferralItem({
  myReferral,
  referband,
}: {
  myReferral: any;
  referband: number;
}) {
  return (
    <View style={styles.referralItem}>
      <Text style={styles.referralItemIndex}>
        {myReferral.index < 10 ? `0${myReferral.index}` : myReferral.index}
      </Text>
      <Image
        source={require("@/assets/images/app/logo.png")}
        style={styles.referralItemIcon}
      />

      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={styles.referralItemWalletAddress}>
            {shortenWalletAddress(myReferral.walletAddress)}
          </Text>
          <Text style={styles.referralItemWalletAddress}>
            {myReferral.totalEarnings?.toLocaleString("en-US", {
              minimumFractionDigits: 5,
              maximumFractionDigits: 5,
            })}{" "}
            ETH
          </Text>
        </View>

        <View style={[styles.row, { marginTop: getHeightSize(10) }]}>
          <Text style={styles.numberOfReferrals}>
            {myReferral.numberOfReferrals}
          </Text>
          <Text style={styles.referBand}>{referband}%</Text>
        </View>
      </View>
    </View>
  );
}

export default function MyReferrals() {
  const { address } = useAccount();
  const { referrals_lead, referrals_my, isLoading } = useAppSelector(
    (state) => state.referral
  );

  const referrals_my_set = useMemo(() => new Set(referrals_my), [referrals_my]);

  const myReferrals = useMemo(() => {
    const filteredData = referrals_lead
      .filter((item) => referrals_my_set.has(item.walletAddress))
      .map((item, index) => ({
        index: index + 1,
        ...item,
      }));

    return filteredData;
  }, [referrals_lead, referrals_my_set]);

  const myReferrals_pagination = usePagination({
    rows: myReferrals,
  });

  return (
    <View style={styles.container}>
      {myReferrals.length === 0 && (
        <EmptyStatus
          isOwner={false}
          title={"You have no referrals"}
          description={""}
          buttonLabel={""}
        />
      )}

      {myReferrals_pagination.currentPageRows.map((myReferral) => {
        if (myReferral.walletAddress === address) return <></>;

        let index = REWARDS.length;
        while (
          index > 0 &&
          REWARDS[--index].refer > myReferral.numberOfReferrals
        );
        const referband = REWARDS[index].reward;

        return (
          <ReferralItem
            key={myReferral.walletAddress}
            myReferral={myReferral}
            referband={referband}
          />
        );
      })}

      {myReferrals_pagination.pageCount > 1 && (
        <ReferralPagination
          curPage={myReferrals_pagination.currentPageIndex}
          pageCount={myReferrals_pagination.pageCount}
          onPage={myReferrals_pagination.go2Page}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: getHeightSize(32),
    gap: getHeightSize(22),
  },
  referralItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(8),
    backgroundColor: `${CustomDarkTheme.colors.grey2}`,
    paddingHorizontal: getWidthSize(14),
    paddingVertical: getHeightSize(16),
    borderRadius: getWidthSize(20),
  },
  referralItemIndex: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.35,
    color: "white",
  },
  referralItemIcon: {
    width: getWidthSize(40),
    height: getHeightSize(40),
    borderRadius: 9999,
  },
  referralItemWalletAddress: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getHeightSize(14) * 1.35,
    color: "white",
  },
  numberOfReferrals: {
    ...fontStyles["Poppins-Bold"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.4,
    color: CustomDarkTheme.colors.green,
  },
  referBand: {
    ...fontStyles["Poppins-Bold"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.4,
    color: CustomDarkTheme.colors.primary,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
