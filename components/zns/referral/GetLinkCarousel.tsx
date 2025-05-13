import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { fontStyles } from "@/constants/fonts";
import useScreenSize from "@/hooks/useScreenSize";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

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
        <Text style={styles.carouselIndex}>0{item.id}</Text>
        <Image
          source={item.image}
          style={styles.carouselImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.getLinkTitle}>{item.title}</Text>
      <Text style={styles.getLinkDescription}>{item.description}</Text>
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
        width={width - getWidthSize(32)}
        height={getHeightSize(240)}
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
          {
            left: -getWidthSize(45) - getWidthSize(16),
            alignItems: "flex-end",
          },
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
          {
            right: -getWidthSize(45) - getWidthSize(16),
            alignItems: "flex-start",
          },
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
    ...fontStyles["Poppins-ExtraBold"],
    fontSize: getFontSize(124),
    color: "#262626",
    marginTop: -getHeightSize(16),
  },
  getLinkTitle: {
    ...fontStyles["SpaceGrotesk-Bold"],
    fontSize: getFontSize(24),
    color: "#FFF",
    marginTop: -getHeightSize(20),
  },
  getLinkDescription: {
    ...fontStyles["SpaceGrotesk-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    textAlign: "center",
    color: "#CCCCCC",
  },
  carouselImage: {
    position: "absolute",
    width: getWidthSize(62),
    aspectRatio: 0.86,
  },
  navigationContainer: {
    backgroundColor: "black",
    borderRadius: 9999,
    width: getWidthSize(90),
    height: getWidthSize(90),
    position: "absolute",
    top: getHeightSize(70),
    justifyContent: "center",
    paddingHorizontal: getWidthSize(12),
  },
});
