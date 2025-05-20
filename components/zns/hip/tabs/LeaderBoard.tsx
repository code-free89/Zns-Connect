import { Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";

import SplitLine from "@/components/ui/SplitLine";
import { fontStyles } from "@/constants/fonts";
import { CreditIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { usePagination } from "@/hooks/usePagination";
import { useAppSelector } from "@/store";
import { shortenWalletAddress } from "@/utils/formatter";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import Pagination from "@/components/ui/Pagination";

const RANK_COLORS = ["#EEC731", "#7AC6F4", "#EB7250"];

type LeaderBoardTabProps = {
  totalData: any[];
};

function HIPProfileCard({
  profile,
  maxPoints,
  isSelf,
}: {
  profile: any;
  maxPoints: number;
  isSelf?: boolean;
}) {
  return (
    <View
      style={[
        styles.profileCard,
        {
          borderWidth: isSelf ? 2 : 1,
          borderColor: isSelf
            ? CustomDarkTheme.colors.primary
            : RANK_COLORS[profile.rank - 1] ?? CustomDarkTheme.colors.grey2,
        },
      ]}
    >
      <View style={styles.profileCardHeader}>
        {!!profile.mainImgUrl ? (
          <Image src={profile.mainImgUrl} style={styles.profileImage} />
        ) : (
          <Image
            source={require("@/assets/images/app/hip_avatar.png")}
            style={styles.profileImage}
          />
        )}
        <View style={{ flex: 1, gap: getHeightSize(4) }}>
          {profile.name && <Text style={styles.name}>{profile.name}</Text>}
          {profile.walletAddress && (
            <Text style={styles.walletAddress}>
              {profile.walletAddress
                ? shortenWalletAddress(profile.walletAddress)
                : ""}
            </Text>
          )}
        </View>
        <View
          style={[
            styles.rankContainer,
            {
              backgroundColor: isSelf
                ? RANK_COLORS[0]
                : RANK_COLORS[profile.rank - 1] ?? "#262626",
            },
          ]}
        >
          <Text
            style={[
              styles.rankText,
              (profile.rank < 4 || isSelf) && { color: "black" },
            ]}
          >
            {profile.rank < 10 ? `0${profile.rank}` : profile.rank}
          </Text>
        </View>
      </View>

      <View style={styles.profilePointsContainer}>
        <View>
          <View style={[styles.row, { gap: getWidthSize(3) }]}>
            <CreditIcon
              width={13}
              height={13}
              color={CustomDarkTheme.colors.body}
            />
            <Text style={styles.earningText}>
              {profile.totalEarnings?.toFixed(5)} ETH
            </Text>
          </View>
          <Text style={styles.totalEarningsText}>Total Earnings</Text>
        </View>

        <SplitLine direction="vertical" style={{ height: "100%" }} />

        <View style={{ width: "50%", gap: getHeightSize(3) }}>
          <Text style={styles.progressText}>{profile.totalPoints} XP</Text>
          <View style={{ width: "100%" }}>
            <View style={styles.progressBG}>
              <LinearGradient
                colors={CustomDarkTheme.gradientColors.linear1}
                locations={[0.0789265, 0.241295, 0.466466, 0.69319, 1]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[
                  styles.progress,
                  { width: `${(profile.totalPoints / maxPoints) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function LeaderBoardTab({ totalData }: LeaderBoardTabProps) {
  const hipData = useAppSelector((state) => state.hip);
  const pagination = usePagination({
    rows: totalData,
    pageSize: 10,
  });
  return (
    <View style={styles.tabContainer}>
      <HIPProfileCard
        isSelf
        profile={hipData}
        maxPoints={totalData[0].totalPoints}
      />

      <View style={[styles.yourPositionContainer, styles.row]}>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowup" size={10} color="black" />
        </View>
        <Text style={styles.yourPositionText}>Your position</Text>
        <View style={styles.arrowContainer}>
          <AntDesign name="arrowup" size={10} color="black" />
        </View>
      </View>

      {pagination.currentPageRows.map((hipProfile) => (
        <HIPProfileCard
          key={hipProfile.id}
          profile={hipProfile}
          maxPoints={totalData[0].totalPoints}
        />
      ))}

      {pagination.pageCount > 0 && (
        <Pagination
          totalPages={pagination.pageCount}
          currentPage={pagination.currentPageIndex}
          onPageChange={pagination.go2Page}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    padding: getWidthSize(10),
    borderRadius: getWidthSize(18),
    borderWidth: 1,
    borderColor: "#454545",
    gap: getHeightSize(10),
  },
  profileCard: {
    borderWidth: 1,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: getWidthSize(16),
    padding: getWidthSize(16),
    gap: getHeightSize(20),
  },
  profileCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(10),
  },
  profileImage: {
    width: getWidthSize(44),
    height: getWidthSize(44),
    borderRadius: 9999,
  },
  name: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.35,
    color: "white",
  },
  walletAddress: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  rankContainer: {
    width: getWidthSize(44),
    height: getWidthSize(44),
    borderRadius: getWidthSize(16),
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.35,
    color: "white",
  },
  profilePointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  earningText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    marginTop: getHeightSize(3),
    color: CustomDarkTheme.colors.txtColor,
  },
  totalEarningsText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(10),
    lineHeight: getFontSize(10),
    color: "#8F8F8F",
    marginTop: getHeightSize(3),
  },
  progressBG: {
    width: "100%",
    height: getHeightSize(10),
    backgroundColor: CustomDarkTheme.colors.body,
    borderRadius: getWidthSize(16),
  },
  progress: {
    position: "absolute",
    height: "100%",
    borderRadius: getWidthSize(16),
  },
  progressText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: "white",
    marginLeft: "auto",
  },
  yourPositionContainer: {
    width: "auto",
    margin: "auto",
    borderWidth: 1,
    borderColor: "#363940",
    padding: getWidthSize(12),
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    gap: getWidthSize(10),
  },
  yourPositionText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14),
    color: "white",
    marginTop: getHeightSize(5),
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: getWidthSize(14),
    height: getWidthSize(14),
    borderRadius: 9999,
    backgroundColor: CustomDarkTheme.colors.primary,
  },
});
