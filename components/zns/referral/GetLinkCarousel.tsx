import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

import { fontStyles } from "@/constants/fonts";
import useScreenSize from "@/hooks/useScreenSize";

const REFERRAL_DATA = [
  {
    id: 1,
    title: "Get Link",
    description:
      "To start, get your unique referral link by\nclicking on the Become an referral button",
    image: require("@/assets/images/app/affiliate/link.png"),
  },
  {
    id: 2,
    title: "Share",
    description:
      "Share your unique referral link, using\nour comprehensive media kit anywhere",
    image: require("@/assets/images/app/affiliate/share.png"),
  },
  {
    id: 3,
    title: "Earn",
    description:
      "You'll earn a 25% commission on every\npurchase made through your referral link",
    image: require("@/assets/images/app/affiliate/earn.png"),
  },
];

function ReferralSlideItem({ item }: any) {
  return (
    <View style={styles.slideContainer}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={[fontStyles["Poppins-ExtraBold"], styles.carouselIndex]}>
          0{item.id}
        </Text>
        <Image
          source={item.image}
          style={styles.carouselImage}
          resizeMode="contain"
        />
      </View>
      <Text style={[fontStyles["SpaceGrotesk-Bold"], styles.getLinkTitle]}>
        {item.title}
      </Text>
      <Text
        style={[fontStyles["SpaceGrotesk-Regular"], styles.getLinkDescription]}
      >
        {item.description}
      </Text>
    </View>
  );
}

export default function GetLinkCarousel() {
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const { width } = useScreenSize();
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <View>
      <Carousel
        ref={carouselRef}
        loop={true}
        width={width - 32}
        height={228}
        autoPlay={false}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={4000}
        scrollAnimationDuration={500}
        enabled={false}
        data={REFERRAL_DATA}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          "worklet";
          g.enabled(false);
        }}
        renderItem={ReferralSlideItem}
        onProgressChange={(_, index) => {
          setCurrentIndex(Math.ceil(index));
        }}
      />

      <Pressable
        style={[
          styles.navigationContainer,
          { left: -45 - 16, alignItems: "flex-end" },
        ]}
        onPress={() => {
          if (currentIndex > 0) {
            carouselRef.current?.prev();
          }
        }}
      >
        <FontAwesome6
          name="arrow-left-long"
          size={20}
          color={currentIndex === 0 ? "#262626" : "white"}
        />
      </Pressable>

      <Pressable
        style={[
          styles.navigationContainer,
          { right: -45 - 16, alignItems: "flex-start" },
        ]}
        onPress={() => {
          if (currentIndex < REFERRAL_DATA.length - 1) {
            carouselRef.current?.next();
          }
        }}
      >
        <FontAwesome6
          name="arrow-right-long"
          size={20}
          color={
            currentIndex === REFERRAL_DATA.length - 1 ? "#262626" : "white"
          }
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  slideContainer: {
    backgroundColor: "#101010",
    borderRadius: 16,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  carouselIndex: {
    fontSize: 124,
    color: "#262626",
    fontWeight: 900,
    marginTop: -16,
  },
  getLinkTitle: {
    fontSize: 24,
    color: "#FFF",
    marginTop: -20,
  },
  getLinkDescription: {
    fontSize: 14,
    lineHeight: 14 * 1.35,
    textAlign: "center",
    color: "#CCCCCC",
  },
  carouselImage: {
    position: "absolute",
    width: 62,
    aspectRatio: 0.86,
  },
  navigationContainer: {
    backgroundColor: "black",
    borderRadius: 9999,
    width: 90,
    height: 90,
    position: "absolute",
    top: 70,
    justifyContent: "center",
    paddingHorizontal: 12,
  },
});
