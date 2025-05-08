import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import CartItemList from "@/components/zns/cart/CartItemList";
import CheckoutModal from "@/components/zns/cart/CheckoutModal";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { CartProvider } from "@/lib/providers/CartProvider";
import { getHeightSize } from "@/utils/size";

export default function CartScreen() {
  const animation = useRef<LottieView>(null);
  const [isCheckoutModalVisible, setIsCheckoutModalVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <CartProvider />
      <View style={styles.pageTitle}>
        <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
          My Cart
        </Text>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <CartItemList onCheckout={() => setIsCheckoutModalVisible(true)} />
        <CheckoutModal
          isVisible={isCheckoutModalVisible}
          onClose={(isSuccess) => {
            setIsCheckoutModalVisible(false);
            if (isSuccess) {
              setIsSuccess(true);
              animation.current?.play();
              setTimeout(() => {
                router.push("/(tabs)/home");
              }, 1000);
            }
          }}
        />
        {isSuccess && (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              backgroundColor: "transparent",
              position: "absolute",
              top: 0,
            }}
            // Find more Lottie files at https://lottiefiles.com/featured
            source={require("@/assets/animations/congratulations.json")}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: getHeightSize(5),
    paddingBottom: getHeightSize(21),
  },
  title: {
    fontSize: 18,
    color: CustomDarkTheme.colors.txtColor,
  },
});
