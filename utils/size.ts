import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height, fontScale } = Dimensions.get("window");

// Base dimensions for scaling (iPhone X dimensions as base)
const baseWidth = 375;
const baseHeight = 812;

// Scale factor based on width
const scale = width / baseWidth;

// Scale factor based on height
const verticalScale = height / baseHeight;
const minScale = Math.min(scale, verticalScale);

export const getWidthSize = (size: number) => {
  const newSize = size * minScale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const getHeightSize = (size: number) => {
  const newSize = size * minScale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
  }
};

export const getFontSize = (size: number) => {
  return getWidthSize(size);
};
