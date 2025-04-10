import Button from "@/components/ui/Button";
import { CustomDarkTheme } from "@/constants/theme";
import { View, StyleSheet, Text } from "react-native";

const NoDomain = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>No domain in your wallets</Text>
        <Text style={styles.description}>
          {
            "Buy your first domain to have an ability \n to explore and follow people"
          }
        </Text>
      </View>

      <Button
        variant="secondary"
        title="Register a Domain"
        style={{ width: "100%" }}
      />
    </View>
  );
};

export const MyDomain = () => (
  <View style={styles.container}>
    <NoDomain />
  </View>
);

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    flexDirection: "column",
    gap: 8,
    marginVertical: 54,
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
  description: {
    fontWeight: 400,
    fontSize: 12,
    color: CustomDarkTheme.colors.body,
    textAlign: "center",
  },
});
