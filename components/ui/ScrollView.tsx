import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";

import { getHeightSize } from "@/utils/size";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ZnsScrollView({ children, style }: Props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{
          paddingBottom: getHeightSize(30),
          minHeight: "100%",
        }}
        style={[styles.scrollView, style]}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: getHeightSize(16),
  },
});
