import { useEffect } from "react";
import { Animated, StyleSheet, useAnimatedValue, View } from "react-native";

const STEP_WIDTH = 8;
const STEP_HEIGHT = 4;
const STEP_GAP = 4;

type StepWizardProps = {
  stepCount: number;
  currentStep: number;
};

export default function StepWizard({
  stepCount,
  currentStep,
}: StepWizardProps) {
  const translateXAnim = useAnimatedValue(0);
  useEffect(() => {
    if (currentStep === 0) {
      translateXAnim.setValue((stepCount - 1) * (STEP_WIDTH + STEP_GAP));
    } else {
      translateXAnim.setValue((currentStep - 1) * (STEP_WIDTH + STEP_GAP));
    }

    Animated.timing(translateXAnim, {
      toValue: currentStep === 0 ? 0 : currentStep * (STEP_WIDTH + STEP_GAP),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  return (
    <View
      style={[
        styles.container,
        { width: (stepCount + 1) * (STEP_WIDTH + STEP_GAP) - STEP_GAP },
      ]}
    >
      {Array.from({ length: stepCount + 1 }).map((_, index) => (
        <View key={index} style={styles.step}></View>
      ))}
      <Animated.View
        style={[
          styles.progressBar,
          { transform: [{ translateX: translateXAnim }] },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: STEP_GAP,
  },
  step: {
    width: STEP_WIDTH,
    height: STEP_HEIGHT,
    backgroundColor: "#74747478",
    borderRadius: 9999,
  },
  progressBar: {
    position: "absolute",
    left: 0,
    top: 0,
    width: STEP_WIDTH * 2 + STEP_GAP,
    height: STEP_HEIGHT,
    backgroundColor: "white",
  },
});
