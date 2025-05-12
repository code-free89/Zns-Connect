import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { useClickOutside } from "react-native-click-outside";

type Props = {
  isVisible: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onOutsideClick?: () => void;
};

export default function AbsoluteDropdown({
  isVisible,
  children,
  style,
  onOutsideClick,
}: Props) {
  const ref = useClickOutside<View>(() => onOutsideClick?.());

  if (!isVisible) return null;

  return (
    <View ref={ref} style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
  },
});
