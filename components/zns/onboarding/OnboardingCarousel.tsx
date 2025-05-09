import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import {
  Animated,
  Image,
  StyleSheet,
  useAnimatedValue,
  View,
} from "react-native";

import StepWizard from "@/components/ui/StepWizard";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import useScreenSize from "@/hooks/useScreenSize";
import { Text } from "react-native";
import { getHeightSize, getWidthSize } from "@/utils/size";

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
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [previousTouchOffset, setPreviousTouchOffset] = useState<number>(0);
  const { height, width } = useScreenSize();

  const enterInTranslateXAnim = useAnimatedValue(width);
  const enterInScaleAnim = useAnimatedValue(1);

  const enterOutTranslateXAnim = useAnimatedValue(0);
  const enterOutScaleAnim = useAnimatedValue(1);

  useEffect(() => {
    enterInTranslateXAnim.setValue(width);
    enterInScaleAnim.setValue(0.3);
    enterOutTranslateXAnim.setValue(0);
    enterOutScaleAnim.setValue(1);

    Animated.timing(enterInTranslateXAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(enterInScaleAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(enterOutTranslateXAnim, {
      toValue: -width,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(enterOutScaleAnim, {
      toValue: 0.3,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  const carouselData = useMemo(() => {
    const length = ONBOARDING_DATA.length;
    const data = [];
    for (let i = 0; i < 2; i++) {
      data.push(ONBOARDING_DATA[(currentIndex + i + length - 1) % length]);
    }
    return data;
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
      // onTouchStart={(event) => {
      //   setPreviousTouchOffset(event.nativeEvent.locationX);
      // }}
      // onTouchEnd={(event) => {
      //   if (event.nativeEvent.locationX > previousTouchOffset) {
      //     setCurrentIndex(
      //       (currentIndex - 1 + ONBOARDING_DATA.length) % ONBOARDING_DATA.length
      //     );
      //   } else {
      //     setCurrentIndex(
      //       (currentIndex + 1 + ONBOARDING_DATA.length) % ONBOARDING_DATA.length
      //     );
      //   }
      // }}
    >
      <View
        style={{
          width: width * 2,
          height: height / 2,
          flexDirection: "row",
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            width: width,
            height: "100%",
            alignItems: "center",
            transform: [
              { translateX: enterOutTranslateXAnim },
              { scale: enterOutScaleAnim },
            ],
          }}
        >
          <Image
            source={carouselData[0].image}
            style={{ width, marginTop: "15%" }}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            width: width,
            height: "100%",
            alignItems: "center",
            transform: [
              { translateX: enterInTranslateXAnim },
              { scale: enterInScaleAnim },
            ],
          }}
        >
          <Image
            source={carouselData[1].image}
            style={{ width, marginTop: "15%" }}
            resizeMode="contain"
          />
        </Animated.View>
      </View>

      <LinearGradient
        colors={["#0E1100", "#12060600"]}
        locations={[0.2888, 0.906]}
        start={{ x: 0.49, y: 1 }}
        end={{ x: 0.51, y: 0 }}
        style={{
          position: "absolute",
          left: 0,
          top: -height * 0.25,
          width: width, // your screen width
          height: height * 2, // or desired height
          zIndex: 10,
        }}
        pointerEvents="none"
      />
      <LinearGradient
        colors={["#0D0D0D", "#0D0D0D00"]}
        locations={[0.5136, 0.8049]} // 41.36% and 60.49%
        style={{
          position: "absolute",
          left: 0,
          top: height * 0.25,
          width: width, // your screen width
          height: height / 2, // or the height you want
          zIndex: 10,
        }}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        pointerEvents="none"
      />

      <View style={styles.stepWizardContainer}>
        <StepWizard
          stepCount={ONBOARDING_DATA.length}
          currentStep={currentIndex}
        />
      </View>

      <View style={styles.textContainer}>
        <View
          style={{
            width: width * 2,
            height: "100%",
            flexDirection: "row",
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={{
              width: width,
              height: "100%",
              alignItems: "center",
              transform: [
                { translateX: enterOutTranslateXAnim },
                { scale: enterOutScaleAnim },
              ],
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{carouselData[0].title}</Text>
              <Text style={styles.description}>
                {carouselData[0].description}
              </Text>
            </View>
          </Animated.View>
          <Animated.View
            style={{
              position: "absolute",
              width: width,
              height: "100%",
              alignItems: "center",
              transform: [
                { translateX: enterInTranslateXAnim },
                { scale: enterInScaleAnim },
              ],
            }}
          >
            <View style={styles.textContainer}>
              <Text style={styles.title}>{carouselData[1].title}</Text>
              <Text style={styles.description}>
                {carouselData[1].description}
              </Text>
            </View>
          </Animated.View>
        </View>
        {/* <Text style={styles.title}>{ONBOARDING_DATA[currentIndex].title}</Text>
        <Text style={styles.description}>
          {ONBOARDING_DATA[currentIndex].description}
        </Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    ...fontStyles["Poppins-Bold"],
    color: CustomDarkTheme.colors.grey1,
    fontSize: getHeightSize(24),
    lineHeight: getWidthSize(24) * 1.5,
    textAlign: "center",
  },
  description: {
    ...fontStyles["Poppins-Regular"],
    color: CustomDarkTheme.colors.body,
    fontSize: getHeightSize(14),
    lineHeight: getWidthSize(14) * 1.5,
    textAlign: "center",
    marginTop: getHeightSize(8),
  },
  stepWizardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    zIndex: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    zIndex: 100,
  },
});
