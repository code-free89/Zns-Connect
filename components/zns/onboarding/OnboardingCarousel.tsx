import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  useAnimatedValue,
  View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";

import StepWizard from "@/components/ui/StepWizard";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import useScreenSize from "@/hooks/useScreenSize";

const ONBOARDING_DATA = [
  {
    title: "Mint your domains\nWith Multiple Chains",
    description:
      "Explore all chains and choose your favorite or\nhave multiple profile on different chains",
    image: require("@/assets/images/app/onboarding/mint-domain.png"),
  },
  {
    title: "Claim Your Web3 Page\nDecentralize Your Identity",
    description:
      "Gain access to your personalized web3 page,\noffering a gateway to the decentralized world",
    image: require("@/assets/images/app/onboarding/claim-page.png"),
  },
  {
    title: "Build High Credibility\nWith ZNS HIP",
    description:
      "ZNS Human Identity Pass let you verify social\nidentities, building a high credibility score. ",
    image: require("@/assets/images/app/onboarding/zns-hip.png"),
  },
];

export default function OnboardingCarousel() {
  const scrollOffsetValue = useSharedValue<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [previousTouchOffset, setPreviousTouchOffset] = useState<number>(0);
  const { height, width } = useScreenSize();

  const translateYAnim = useAnimatedValue(0);
  const translateYReverseAnim = useAnimatedValue(0);
  const opacityAnim = useAnimatedValue(0.2);
  const imageTranslateAnim = useAnimatedValue(0);
  useEffect(() => {
    translateYAnim.setValue(-height / 14);
    translateYReverseAnim.setValue(height / 14);
    opacityAnim.setValue(0.2);
    imageTranslateAnim.setValue(0);

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYReverseAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(imageTranslateAnim, {
      toValue: -width * 1.25,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const carouselImages = useMemo(() => {
    const length = ONBOARDING_DATA.length;
    const images = [];
    for (let i = 0; i < 2; i++) {
      images.push(
        ONBOARDING_DATA[(currentIndex + i + length - 1) % length].image
      );
    }
    return images;
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ONBOARDING_DATA.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View
      style={{ flex: 1 }}
      onTouchStart={(event) => {
        setPreviousTouchOffset(event.nativeEvent.locationX);
      }}
      onTouchEnd={(event) => {
        if (event.nativeEvent.locationX > previousTouchOffset) {
          setCurrentIndex(
            (currentIndex - 1 + ONBOARDING_DATA.length) % ONBOARDING_DATA.length
          );
        } else {
          setCurrentIndex(
            (currentIndex + 1 + ONBOARDING_DATA.length) % ONBOARDING_DATA.length
          );
        }
      }}
    >
      <Animated.View
        style={{
          width: width * 2.5,
          height: height / 2,
          flexDirection: "row",
          overflow: "hidden",
          transform: [{ translateX: imageTranslateAnim }],
        }}
      >
        {carouselImages.map((image, index) => (
          <View
            key={index}
            style={{
              width: width * 1.25,
              // backgroundColor: index % 2 === 0 ? "red" : "blue",
              overflow: index === 0 ? "visible" : "hidden",
            }}
          >
            <Image
              source={image}
              style={{
                width: width,
                position: "absolute",
                left: width * 0.2,
              }}
            />
          </View>
        ))}
        {/* <Carousel
          ref={carouselRef}
          loop={true}
          width={width}
          height={height / 2}
          autoPlay
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={4000}
          scrollAnimationDuration={1500}
          data={ONBOARDING_DATA}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={{ width: "100%", height: 400 }}
          onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
            "worklet";
            g.enabled(false);
          }}
          renderItem={OnboardingSlideItem()}
          onScrollStart={() => {
            const _currentIndex = carouselRef.current?.getCurrentIndex();
            setCurrentIndex(_currentIndex ?? 0);
          }}
        /> */}
      </Animated.View>
      <View style={styles.stepWizardContainer}>
        <StepWizard
          stepCount={ONBOARDING_DATA.length}
          currentStep={currentIndex}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={[
            fontStyles["Poppins-Bold"],
            {
              transform: [{ translateY: translateYAnim }],
              opacity: opacityAnim,
            },
            styles.title,
          ]}
        >
          {ONBOARDING_DATA[currentIndex].title}
        </Animated.Text>
        <Animated.Text
          style={[
            fontStyles["Poppins-Regular"],
            {
              transform: [{ translateY: translateYReverseAnim }],
              opacity: opacityAnim,
            },
            styles.description,
          ]}
        >
          {ONBOARDING_DATA[currentIndex].description}
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    color: CustomDarkTheme.colors.grey1,
    fontSize: 24,
    lineHeight: 24 * 1.5,
    textAlign: "center",
  },
  description: {
    color: CustomDarkTheme.colors.body,
    fontSize: 14,
    lineHeight: 14 * 1.5,
    textAlign: "center",
    marginTop: 8,
  },
  stepWizardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
});
