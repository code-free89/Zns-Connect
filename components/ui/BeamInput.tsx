import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  withSequence,
} from "react-native-reanimated";

export interface BeamInputProps {
  type: "subscribe" | "search";
  placeholder: string;
  title: string;
  style?: StyleProp<ViewStyle>;
}

export default function BeamInput({
  type,
  placeholder,
  title,
  style,
}: BeamInputProps) {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const inputRef = useRef<TextInput>(null);
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(1, { duration: 5000 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value * 360}deg` }],
    };
  });

  const handleSubmit = () => {
    // if (type === "search") {
    router.push({
      pathname: "/(tabs)/register",
      params: {
        domain: search,
      },
    });
    // }
  };

  return (
    <View style={[styles.container, style]}>
      {/* <Animated.View style={[styles.beamEffect, animatedStyle]} /> */}
      <LinearGradient
        colors={["rgba(255,255,255,0.2)", "rgba(255,255,255,0.1)"]}
        style={styles.gradientBackground}
      >
        <TextInput
          ref={inputRef}
          onChangeText={setSearch}
          value={search}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.8)"
          style={styles.input}
          keyboardType={type === "search" ? "default" : "email-address"}
          onSubmitEditing={handleSubmit}
        />

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 500,
    position: "relative",
  },
  gradientBackground: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: 6,
    paddingLeft: 24,
    paddingRight: 6,
    zIndex: 100,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 14,
    padding: 8,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 999,
    padding: 12,
    paddingHorizontal: 16,
  },
  buttonPressed: {
    transform: [{ scale: 0.985 }],
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  icon: {
    marginLeft: 6,
  },
  beamEffect: {
    position: "absolute",
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#cafc01",
    opacity: 0.5,
    zIndex: 90,
  },
});
