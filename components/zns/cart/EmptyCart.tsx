import { Image, StyleSheet, Text, View } from "react-native";

import BeamInput from "@/components/ui/BeamInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";

export default function EmptyCart() {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/icons/empty/info.png")}
        style={{ width: getWidthSize(90), height: getHeightSize(95) }}
      />
      <Text style={styles.title}>Your cart is empty</Text>
      <Text style={styles.description}>
        {`Get started by searching your\npreferred domain`}
      </Text>
      <BeamInput
        type={"search"}
        placeholder={"Search domain names"}
        title={"Search"}
        style={{ marginTop: getHeightSize(35) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getHeightSize(24),
    color: CustomDarkTheme.colors.body,
    marginTop: getHeightSize(11),
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getHeightSize(16),
    color: CustomDarkTheme.colors.body,
    marginTop: getHeightSize(6),
    textAlign: "center",
  },
});
