import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet, Text } from "react-native";

const NoDomain = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No domain in your wallets</Text>
    </View>
  );
};

export const MyDomain = () => (
  <View style={styles.container}>
    <NoDomain />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    height: 200,
    width: "100%",
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: CustomDarkTheme.colors.body,
  },
});
