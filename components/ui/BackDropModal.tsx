import { BlurView } from "expo-blur";
import { StyleSheet, View } from "react-native";

import { useAppSelector } from "@/store";

export default function BackDropModal() {
  const { isBlurModalVisible } = useAppSelector((state) => state.setting);

  return isBlurModalVisible ? (
    <BlurView intensity={90} tint="dark" style={styles.blurContainer} />
  ) : (
    <View />
  );
}

const styles = StyleSheet.create({
  blurContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    padding: 20,
    textAlign: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 20,
    zIndex: 9999,
    elevation: 9999,
  },
});
