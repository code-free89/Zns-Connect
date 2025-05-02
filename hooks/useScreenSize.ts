import { Dimensions } from "react-native";

export default function useScreenSize() {
  const { width, height } = Dimensions.get("window");
  return { width, height };
}
