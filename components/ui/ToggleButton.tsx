import { StyleSheet, View } from "react-native";

export default function ToggleButton() {
  return (
    <View style={styles.container}>
      <View style={styles.toggle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
  },
});
