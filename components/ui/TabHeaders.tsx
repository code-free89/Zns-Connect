import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { CustomDarkTheme } from "@/constants/theme";
import ZnsText from "./Text";

type TabHeadersProps = {
  selectedTab: string;
  tabs: {
    label: string;
    value: string;
    onSelectTab: () => void;
  }[];
  tabStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
};

export default function TabHeaders({
  selectedTab,
  tabs,
  tabStyle,
  fullWidth = false,
}: TabHeadersProps) {
  return (
    <ScrollView
      horizontal
      contentContainerStyle={fullWidth && { width: "100%" }}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          style={[
            styles.tab,
            tabStyle,
            selectedTab === tab.value && styles.selectedTab,
            fullWidth && { width: `${100 / tabs.length}%` },
          ]}
          onPress={tab.onSelectTab}
        >
          <ZnsText
            type="medium"
            style={[
              styles.tabText,
              selectedTab === tab.value && styles.selectedTabText,
            ]}
          >
            {tab.label}
          </ZnsText>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderBottomColor: CustomDarkTheme.colors.grey2,
  },
  selectedTab: {
    borderBottomColor: CustomDarkTheme.colors.p500,
  },
  tabText: {
    fontSize: 14,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "center",
  },
  selectedTabText: {
    color: CustomDarkTheme.colors.p500,
  },
});
