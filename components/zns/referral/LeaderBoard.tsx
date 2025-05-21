import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";

import { fontStyles } from "@/constants/fonts";
import { CupIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { usePagination } from "@/hooks/usePagination";
import { useAppSelector } from "@/store";
import { formatPrice, shortenWalletAddress } from "@/utils/formatter";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import EmptyStatus from "../profile/EmptyStatus";
import ReferralPagination from "./Pagination";

const MEDAL_IMAGES = [
  require("@/assets/images/icons/medals/Gold.png"),
  require("@/assets/images/icons/medals/Silver.png"),
  require("@/assets/images/icons/medals/Bronze.png"),
];

function LeaderBoardItem({ referral }: { referral: any }) {
  const { chain } = useAccount();

  const { totalEarnings } = useMemo(
    () => ({
      numberOfReferrals: referral.numberOfReferrals,
      totalEarnings: referral.totalEarnings,
    }),
    [referral]
  );

  const symbol = useMemo(() => chain?.nativeCurrency.symbol ?? "", [chain]);

  const userAddress = useMemo(
    () => shortenWalletAddress(referral.walletAddress ?? "", 4),
    [referral]
  );

  return (
    <View style={styles.referralItem}>
      {referral.index < 4 ? (
        <Image source={MEDAL_IMAGES[referral.index - 1]} />
      ) : (
        <View style={styles.indexContainer}>
          <Text style={styles.referralItemIndex}>{referral.index}</Text>
        </View>
      )}
      <View style={{ flex: 1 }}>
        <View style={styles.row}>
          <Text style={styles.referralItemWalletAddress}>{userAddress}</Text>
          <Text style={styles.referralItemWalletAddress}>
            {`${formatPrice(totalEarnings, 4)} ${symbol}`}
          </Text>
        </View>

        <View style={[styles.row, { marginTop: getHeightSize(10) }]}>
          <Text style={styles.numberOfReferrals}>
            {referral.numberOfReferrals}
          </Text>
          <Text style={styles.totalEarnings}>Total Earnings</Text>
        </View>
      </View>
    </View>
  );
}

export default function LeaderBoard() {
  const { address, chainId } = useAccount();
  const { referrals_lead } = useAppSelector((state) => state.referral);

  const selfIndex = useMemo(
    () => referrals_lead.findIndex((item) => item.walletAddress === address),
    [referrals_lead, address]
  );

  const selfReferral = useMemo(
    () =>
      referrals_lead[selfIndex] ?? {
        id: 0,
        chain: chainId,
        numberOfReferrals: 0,
        totalEarnings: 0,
        walletAddress: address,
        index: 0,
      },
    [referrals_lead, selfIndex]
  );

  const leadberboardReferrals = useMemo(() => {
    const filteredData = referrals_lead.map((item, index) => ({
      index: index + 1,
      ...item,
    }));

    return filteredData;
  }, [referrals_lead]);

  const leadberboardReferrals_pagination = usePagination({
    rows: leadberboardReferrals,
  });

  return (
    <View style={styles.container}>
      <View style={styles.rankContainer}>
        <View style={styles.rankSubContainer}>
          <CupIcon />
          <Text style={styles.rankText}>
            {`You’ve earned $${selfReferral.totalEarnings.toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 5,
                maximumFractionDigits: 5,
              }
            )} and ranked ${selfIndex === -1 ? "" : selfIndex + 1}\nout of ${
              referrals_lead.length
            } total users`}
          </Text>
          <CupIcon />
        </View>
      </View>

      {!referrals_lead.length && (
        <EmptyStatus
          isOwner={false}
          title={"There is no referrals in this network"}
          description={""}
          buttonLabel={""}
        />
      )}

      {leadberboardReferrals_pagination.currentPageRows.map((referral) => {
        return (
          <LeaderBoardItem key={referral.walletAddress} referral={referral} />
        );
      })}

      {leadberboardReferrals_pagination.pageCount > 1 && (
        <ReferralPagination
          curPage={leadberboardReferrals_pagination.currentPageIndex}
          pageCount={leadberboardReferrals_pagination.pageCount}
          onPage={leadberboardReferrals_pagination.go2Page}
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
  rankContainer: {
    paddingHorizontal: getWidthSize(10),
    paddingVertical: getHeightSize(9),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(12),
  },
  rankSubContainer: {
    backgroundColor: "black",
    borderRadius: getWidthSize(9),
    flex: 1,
    paddingHorizontal: getWidthSize(12),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rankText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "center",
    marginVertical: getHeightSize(4),
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
  indexContainer: {
    width: getWidthSize(26),
    height: getHeightSize(26),
    borderRadius: 9999,
    backgroundColor: "#2B2B2B",
    justifyContent: "center",
    alignItems: "center",
  },
  referralItemIndex: {
    ...fontStyles["SpaceMono-Bold"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.4,
    color: "#858584",
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
  totalEarnings: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getHeightSize(12) * 1.4,
    color: CustomDarkTheme.colors.body,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
