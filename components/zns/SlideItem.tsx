import { PURPLE_IMAGES } from "@/constants/purple-images";
import React, { useMemo } from "react";
import {
  ImageSourcePropType,
  type ImageStyle,
  type StyleProp,
  StyleSheet,
  View,
  type ViewProps,
  type ViewStyle,
} from "react-native";
import type { AnimatedProps } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import ZnxText from "@/components/ui/Text";

interface Props extends AnimatedProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  index?: number;
  rounded?: boolean;
  source?: ImageSourcePropType;
  colorValue?: string;
}

export const SlideItem: React.FC<Props> = (props) => {
  const {
    style,
    imageStyle,
    index = 0,
    rounded = false,
    testID,
    colorValue,
    ...animatedViewProps
  } = props;

  const source = useMemo(
    () => props.source || PURPLE_IMAGES[index % PURPLE_IMAGES.length],
    [index, props.source]
  );

  return (
    <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
      <Animated.Image
        style={[imageStyle, styles.container, rounded && { borderRadius: 15 }]}
        source={source}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.overlayTextContainer}>
          <ZnxText type="bold" style={styles.overlayText}>
            {index}
          </ZnxText>
        </View>
      </View>
      <View style={styles.colorValueContainer}>
        <ZnxText type="medium" style={styles.colorValueText}>
          {colorValue}
        </ZnxText>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  overlayTextContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 10,
    minWidth: 40,
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  colorValueContainer: {
    position: "absolute",
    bottom: -20,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
  },
  colorValueText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
});
