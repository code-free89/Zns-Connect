import { View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

import { OnboardingSlideItem } from "../zns/OnboardingSlideItem";

const defaultDataWith6Colors = [
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
  "#000000",
];

export default function AnimatedCarousel() {
  const scrollOffsetValue = useSharedValue<number>(0);

  return (
    <View id="carousel-component" style={{ width: "100%" }}>
      <Carousel
        testID={"xxx"}
        loop={true}
        width={430}
        height={258}
        autoPlay
        snapEnabled={true}
        pagingEnabled={true}
        autoPlayInterval={2000}
        data={defaultDataWith6Colors}
        defaultScrollOffsetValue={scrollOffsetValue}
        style={{ width: "100%" }}
        onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
          "worklet";
          g.enabled(false);
        }}
        renderItem={OnboardingSlideItem({ rounded: true })}
      />
    </View>
  );
}
