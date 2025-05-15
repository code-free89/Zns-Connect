import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import DomainListItem from "@/components/zns/modules/domain-switcher/DomainListItem";
import { fontStyles } from "@/constants/fonts";
import { SearchIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { UserDomainType } from "@/store/slices/user-domains";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

type DomainListViewProps = {
  domains: UserDomainType[] | null;
  onClose: () => void;
};

export default function DomainListView({
  domains,
  onClose,
}: DomainListViewProps) {
  const goToSearchDomain = () => {
    router.push("/(tabs)/register");
  };

  return (
    <View style={styles.domainListContainer}>
      <View style={styles.row}>
        <Text style={styles.searchDomainText}>Switch domain</Text>
        <Pressable style={styles.searchContainer} onPress={goToSearchDomain}>
          <SearchIcon
            color={CustomDarkTheme.colors.body}
            width={12.5}
            height={12.5}
          />
        </Pressable>
      </View>

      <View style={styles.domainList}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{ gap: getHeightSize(18) }}
        >
          {domains?.map((domain) => (
            <DomainListItem
              key={domain.domainId}
              domain={domain}
              onClose={onClose}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  domainListContainer: {
    borderRadius: getWidthSize(12),
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: CustomDarkTheme.colors.gray900,
    height: "auto",
    padding: getWidthSize(16),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchDomainText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.textBody,
  },
  searchContainer: {
    backgroundColor: "#262626",
    borderRadius: getWidthSize(6),
    width: getWidthSize(29),
    height: getHeightSize(24),
    alignItems: "center",
    justifyContent: "center",
  },
  domainList: {
    flex: 1,
    marginTop: getHeightSize(18),
    backgroundColor: "#101010",
    borderRadius: getWidthSize(16),
    padding: getWidthSize(20),
    maxHeight: getHeightSize(160),
  },
  domainItem: {},
});
