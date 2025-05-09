import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const getWidthSize = (size: number) => {
  return Math.round(size * (width / 375));
};

export const getHeightSize = (size: number) => {
  return Math.round(size * (height / 812));
};
