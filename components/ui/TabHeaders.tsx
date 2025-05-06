import {
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";

type TabHeadersProps = {
  selectedTab: string;
  tabs: {
    label: string;
    value: string;
    onSelectTab: () => void;
  }[];
  containerStyle?: StyleProp<ViewStyle>;
  tabStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
};

export default function TabHeaders({
  selectedTab,
  tabs,
  tabStyle,
  containerStyle,
  fullWidth = false,
}: TabHeadersProps) {
  return (
    <View style={containerStyle}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={fullWidth && { width: "100%" }}
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
                fontStyles["Poppins-Medium"],
                styles.tabText,
                selectedTab === tab.value && styles.selectedTabText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
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
