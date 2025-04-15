// import { StyleSheet, View } from "react-native";
// import Slider, { MarkerProps } from "@react-native-community/slider";
// import { LinearGradient } from "expo-linear-gradient";
// import { CustomDarkTheme } from "@/constants/theme";

// const StepMaker = (props: MarkerProps) => {
//   return (
//     <View style={{ height: 50, width: 1, backgroundColor: "red" }}>
//       {/* <LinearGradient
//         colors={GRADIENT_COLORS}
//         start={{ x: 0, y: 0.5 }}
//         end={{ x: 1, y: 0.5 }}
//         style={styles.gradientBackground}
//       /> */}
//     </View>
//   );
// };

// export default function GradientSlider() {
//   return (
//     <View style={styles.container}>
//       <Slider
//         thumbTintColor={CustomDarkTheme.colors.p500}

//         StepMarker={(props) => <StepMaker {...props} />}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   step: {
//     width: 10,
//     height: 10,
//     backgroundColor: "white",
//     borderRadius: 5,
//   },
//   gradientBackground: {
//     height: 14,
//     borderRadius: 15,
//   },
// });

import React, { useState, useRef, useCallback, useMemo } from "react";
import {
  View,
  PanResponder,
  Animated,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { CustomDarkTheme } from "@/constants/theme";

const MIN = 0;
const MAX = 100;
const THUMB_SIZE = 14;
const THUMB_COLOR = "#007AFF";
const ACTIVE_TRACK_COLOR = "#007AFF";
const GRADIENT_COLORS = [
  "#1C96FD",
  "#33E360",
  "#F4C630",
  "#CB1245",
  "#AD00FE",
] as const;

interface GradientSliderProps {
  initialValue?: number;
  width?: number;
  max?: number;
  padding?: number;
}

export default function GradientSlider({
  initialValue = 0,
  width = Dimensions.get("window").width,
  max = 100,
  padding = 0,
}: GradientSliderProps) {
  const [value, setValue] = useState(initialValue);
  const positionRef = useRef(
    new Animated.Value((initialValue / max) * width - THUMB_SIZE / 2)
  );
  const position = positionRef.current;

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {},
        onPanResponderMove: useCallback(
          (
            _: GestureResponderEvent,
            gestureState: PanResponderGestureState
          ) => {
            const currentXPos = gestureState.moveX - padding;
            const newX = Math.max(0, Math.min(currentXPos, width));
            const roundedValue = Math.round((max * newX) / width);

            // Only update if value has changed
            if (roundedValue !== value) {
              setValue(roundedValue);
              position.setValue(newX - THUMB_SIZE / 2);
            }
          },
          [width, max, padding, value]
        ),
        onPanResponderRelease: () => {},
      }),
    [width, max, padding, value]
  );

  const activeTrackWidth = useMemo(
    () => ({ width: width * (value / max) }),
    [width, value, max]
  );

  return (
    <View style={[styles.container, { width }]}>
      {/* Background Track */}
      <View style={styles.track} />

      {/* Active Track */}
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.activeTrack, activeTrackWidth]}
      />

      {/* Thumb */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            transform: [{ translateX: position }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE,
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    width: "100%",
    height: THUMB_SIZE,
    borderRadius: 59,
    backgroundColor: CustomDarkTheme.colors.stroke,
  },
  activeTrack: {
    position: "absolute",
    borderTopLeftRadius: 59,
    borderBottomLeftRadius: 59,
    height: THUMB_SIZE,
  },
  thumb: {
    position: "absolute",
    borderRadius: 12,
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderWidth: 3,
    borderColor: CustomDarkTheme.colors.bg,
    backgroundColor: CustomDarkTheme.colors.p500,
  },
});
