import { Image, StyleSheet, Text, View } from "react-native";

import BeamInput from "@/components/ui/BeamInput";
import { CustomDarkTheme } from "@/constants/theme";

export default function EmptyCart() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icons/empty.png")}
        style={{ width: 73, height: 77 }}
      />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.description}>
        {`Get started by searching your\npreferred domain`}
      </Text>
      <BeamInput
        type={"search"}
        placeholder={"Search domain names"}
        title={"Search"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: CustomDarkTheme.colors.body,
    marginTop: 11,
  },
  description: {
    fontSize: 16,
    fontWeight: 400,
    color: CustomDarkTheme.colors.body,
    marginTop: 6,
    textAlign: "center",
  },
});
