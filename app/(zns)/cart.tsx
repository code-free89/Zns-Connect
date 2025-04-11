import { Image, StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import EmptyCart from "@/components/zns/cart/EmptyCart";
import CartItemList from "@/components/zns/cart/CartItemList";

export default function CartScreen() {
  return (
    // <ZnsScrollView>
    <View style={styles.container}>
      {/* <EmptyCart /> */}
      <CartItemList />
    </View>
    // </ZnsScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    flexDirection: "column",
    gap: 20,
  },
});
