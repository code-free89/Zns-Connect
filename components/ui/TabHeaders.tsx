import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getFontSize, getHeightSize } from "@/utils/size";
import SplitLine from "./SplitLine";

type TabHeadersProps = {
  selectedTab: string;
  tabs: {
    label: string;
    value: string;
    onSelectTab: () => void;
  }[];
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  tabTextStyle?: StyleProp<TextStyle>;
  fullWidth?: boolean;
};

export default function TabHeaders({
  selectedTab,
  tabs,
  tabStyle,
  tabTextStyle,
  containerStyle,
  fullWidth = false,
}: TabHeadersProps) {
  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          fullWidth && { width: "100%" },
          { marginHorizontal: "auto" },
        ]}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.value}
            style={[
              styles.tab,
              tabStyle,
              selectedTab === tab.value && styles.selectedTab,
              fullWidth && { width: `${100 / tabs.length}%` },
            ]}
            onPress={tab.onSelectTab}
          >
            <Text
              style={[
                styles.tabText,
                tabTextStyle,
                selectedTab === tab.value && styles.selectedTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <SplitLine style={{ marginTop: getHeightSize(0) }} />
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    paddingVertical: getHeightSize(14),
    borderBottomWidth: 2,
    borderBottomColor: CustomDarkTheme.colors.grey2,
  },
  selectedTab: {
    borderBottomColor: CustomDarkTheme.colors.p500,
  },
  tabText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.5,
    color: CustomDarkTheme.colors.txtColor,
    textAlign: "center",
  },
  selectedTabText: {
    color: CustomDarkTheme.colors.p500,
  },
});
