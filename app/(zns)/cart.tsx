import { Image, StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import EmptyCart from "@/components/zns/cart/EmptyCart";

export default function CartScreen() {
  return (
    <ZnsScrollView>
      <View style={styles.container}>
        <EmptyCart />
      </View>
    </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    gap: 20,
  },
});
