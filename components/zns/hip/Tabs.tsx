import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import DomainsTab from "@/components/zns/hip/tabs/Domains";
import NFTTab from "@/components/zns/hip/tabs/NFT";
import ReferralsTab from "@/components/zns/hip/tabs/Referrals";
import VerifySocialTab from "@/components/zns/hip/tabs/VerifySocial";
import LeaderBoardTab from "@/components/zns/hip/tabs/LeaderBoard";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getAllHIPs } from "@/lib/api/hip";
import { getHeightSize, getWidthSize } from "@/utils/size";

const TAB_ITEMS = [
  { label: "Verify Socials", value: "socials" },
  { label: "Referrals", value: "referrals" },
  { label: "Domains", value: "domains" },
  { label: "NFT", value: "nft" },
  { label: "Recognition", value: "recognition" },
  { label: "Leaderboard", value: "leaderboard" },
];

function TabItem({
  item,
  isSelected,
}: {
  item: (typeof TAB_ITEMS)[number];
  isSelected: boolean;
}) {
  return isSelected ? (
    <GradientBorderViewWrapper
      gradientColors={CustomDarkTheme.gradientColors.linear2}
      borderRadius={getWidthSize(16)}
    >
      <View style={styles.tabItem}>
        <Text style={styles.tabItemText}>{item.label}</Text>
      </View>
    </GradientBorderViewWrapper>
  ) : (
    <View style={[styles.tabItem, styles.defaultItem]}>
      <Text style={styles.tabItemText}>{item.label}</Text>
    </View>
  );
}

export default function HipTabs() {
  const [selectedTab, setSelectedTab] = useState(TAB_ITEMS[0].value);

  const [totalHIPData, setTotalHIPData] = useState<any[]>([]);

  const { data: hips } = useQuery({
    queryKey: ["hips"],
    queryFn: () => getAllHIPs(),
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  useEffect(() => {
    if (hips) {
      // Sort by totalPoints in descending order and add rank
      const rankedHips = hips
        .sort((a: any, b: any) => b.totalPoints - a.totalPoints)
        .map((hip: any, index: number) => ({
          ...hip,
          rank: index + 1,
        }));
      setTotalHIPData(rankedHips);
    }
  }, [hips]);

  return (
    <View style={{ gap: getHeightSize(30) }}>
      <ScrollView
        horizontal
        contentContainerStyle={styles.tabContainer}
        showsHorizontalScrollIndicator={false}
      >
        {TAB_ITEMS.map((tabItem) => (
          <Pressable
            key={tabItem.value}
            onPress={() => setSelectedTab(tabItem.value)}
          >
            <TabItem
              item={tabItem}
              isSelected={selectedTab === tabItem.value}
            />
          </Pressable>
        ))}
      </ScrollView>

      {selectedTab === "socials" && <VerifySocialTab />}
      {selectedTab === "referrals" && <ReferralsTab />}
      {selectedTab === "domains" && <DomainsTab />}
      {selectedTab === "nft" && <NFTTab />}
      {selectedTab === "leaderboard" && (
        <LeaderBoardTab totalData={totalHIPData} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    gap: getWidthSize(8),
  },
  tabItem: {
    padding: getWidthSize(16),
    borderRadius: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  defaultItem: {
    borderWidth: 1,
    borderColor: CustomDarkTheme.colors.grey2,
  },
  tabItemText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getWidthSize(12),
    letterSpacing: 0.36,
    color: "white",
  },
});
