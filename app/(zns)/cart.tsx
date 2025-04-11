import { Image, StyleSheet, View } from "react-native";

import ZnsScrollView from "@/components/ui/ScrollView";
import EmptyCart from "@/components/zns/cart/EmptyCart";
import CartItemList from "@/components/zns/cart/CartItemList";
import CheckoutModal from "@/components/zns/cart/CheckoutModal";
import { useState } from "react";

export default function CartScreen() {
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  return (
    // <ZnsScrollView>
    <View style={styles.container}>
      {/* <EmptyCart /> */}
      <CartItemList onCheckout={() => setIsCheckoutModalVisible(true)} />
      <CheckoutModal
        isVisible={isCheckoutModalVisible}
        onClose={() => setIsCheckoutModalVisible(false)}
      />
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
