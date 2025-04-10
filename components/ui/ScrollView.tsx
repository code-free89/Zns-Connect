import { ScrollView, StyleProp, StyleSheet, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function ZnsScrollView({ children, style }: Props) {
  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}
      style={[styles.scrollView, style]}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding: 16,
  },
});
