import React from "react";
import { StyleSheet, View } from "react-native";
import { Slider } from "react-native-awesome-slider";

import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";
import { useSharedValue } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const THUMB_SIZE = getWidthSize(14);
const GRADIENT_COLORS = [
  "#1C96FD",
  "#33E360",
  "#F4C630",
  "#CB1245",
  "#AD00FE",
] as const;

interface GradientSliderProps {
  initialValue?: number;
  minValue?: number;
  maxValue?: number;
  containerWidth: number;
  onChangeValue: (value: number) => void;
}

export default function GradientSlider({
  initialValue = 0,
  minValue = 0,
  maxValue = 100,
  containerWidth,
  onChangeValue,
}: GradientSliderProps) {
  const progress = useSharedValue(initialValue);
  const min = useSharedValue(minValue);
  const max = useSharedValue(maxValue);
  const totalWidth = containerWidth - THUMB_SIZE;
  return (
    <Slider
      progress={progress}
      minimumValue={min}
      maximumValue={max}
      onValueChange={(value) => onChangeValue(value)}
      steps={maxValue - minValue}
      forceSnapToStep
      containerStyle={{
        height: getHeightSize(14),
        backgroundColor: CustomDarkTheme.colors.stroke,
        borderRadius: getHeightSize(59),
      }}
      renderBubble={() => null}
      renderTrack={() => null}
      renderThumb={() => <View style={styles.thumb}></View>}
      renderContainer={(props) => {
        return (
          <View style={props.style}>
            <LinearGradient
              colors={GRADIENT_COLORS}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[
                styles.activeTrack,
                {
                  width:
                    (progress.value / max.value) * totalWidth + THUMB_SIZE / 2,
                },
              ]}
            />
          </View>
        );
      }}
      renderMark={() => null}
    />
  );
}

const styles = StyleSheet.create({
  activeTrack: {
    position: "absolute",
    borderTopLeftRadius: 59,
    borderBottomLeftRadius: 59,
    height: THUMB_SIZE,
  },
  thumb: {
    borderRadius: 12,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderWidth: 3,
    borderColor: CustomDarkTheme.colors.bg,
    backgroundColor: CustomDarkTheme.colors.p500,
  },
});
