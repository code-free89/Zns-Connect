import { useMemo } from "react";
import { FlatList, View } from "react-native";

import ProfileBadge from "@/components/zns/ProfileBadge";
import { getHeightSize, getWidthSize } from "@/utils/size";

type GeneralBadgesViewProps = {
  badges: any[];
  enableScroll?: boolean;
};

export default function GeneralBadgesView({
  badges,
  enableScroll = true,
}: GeneralBadgesViewProps) {
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

  return (
    <FlatList
      keyExtractor={(item) => item.type}
      data={filledBadges}
      numColumns={numColumns}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (
        <View style={{ height: getHeightSize(16) }} />
      )}
      columnWrapperStyle={{ gap: getWidthSize(8) }}
      scrollEnabled={enableScroll}
    />
  );
}
