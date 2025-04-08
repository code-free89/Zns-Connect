import React from "react";
import { ImageStyle, StyleProp, Text } from "react-native";
import { CarouselRenderItem } from "react-native-reanimated-carousel";

import { SlideItem } from "./SlideItem";

interface Options {
  rounded?: boolean;
  style?: StyleProp<ImageStyle>;
}

export const OnboardingSlideItem =
  ({ rounded = false, style }: Options = {}): CarouselRenderItem<any> =>
  ({ index, item }: { index: number; item: string }) =>
    (
      <>
        <SlideItem
          key={index}
          index={index}
          rounded={rounded}
          imageStyle={style}
        />
        <Text style={{ color: "red", fontSize: 20, fontWeight: "bold" }}>
          {item}
        </Text>
      </>
    );
