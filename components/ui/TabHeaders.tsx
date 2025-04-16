import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";

import { CustomDarkTheme } from "@/constants/theme";

type TabHeadersProps = {
  selectedTab: string;
  tabs: {
    label: string;
    value: string;
    onSelectTab: () => void;
  }[];
};

export default function TabHeaders({ selectedTab, tabs }: TabHeadersProps) {
  return (
    <ScrollView horizontal>
      {tabs.map((tab) => (
        <TouchableOpacity
          style={[styles.tab, selectedTab === tab.value && styles.selectedTab]}
          onPress={tab.onSelectTab}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === tab.value && styles.selectedTabText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: CustomDarkTheme.colors.grey2,
  },
  selectedTab: {
    borderBottomColor: CustomDarkTheme.colors.p500,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: CustomDarkTheme.colors.txtColor,
  },
  selectedTabText: {
    color: CustomDarkTheme.colors.p500,
  },
});
