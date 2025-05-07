import React from "react";
import { StyleSheet, Text, View } from "react-native";

import GetLinkCarousel from "@/components/zns/referral/GetLinkCarousel";
import ReferralStatus from "@/components/zns/referral/ReferralStatus";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";

export default function ReferralsScreen() {
  return (
    <>
      <View style={styles.pageTitle}>
        <Text style={[fontStyles["Poppins-Medium"], styles.title]}>
          Affiliate for users
        </Text>
      </View>
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={[fontStyles["Poppins-Regular"], styles.getRewardTitle]}>
          {"Get rewarded for bringing\nfriends on board!"}
        </Text>

        <GetLinkCarousel />

        <ReferralStatus />
      </View>
      {/* <View style={{ flex: 1, padding: 16 }}>
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
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    height: 42,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: CustomDarkTheme.colors.txtColor,
  },
  getRewardTitle: {
    fontSize: 14,
    letterSpacing: 0.28,
    color: "#DFE5F3",
    textAlign: "center",
    marginVertical: 12,
  },
});
