import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useAccount } from "wagmi";
import { LinearGradient } from "expo-linear-gradient";

import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { useAppSelector } from "@/store";
import useScreenSize from "@/hooks/useScreenSize";

export default function ProfileHIP() {
  const { isConnected } = useAccount();
  const { width } = useScreenSize();
  const hipData = useAppSelector((state) => state.hip);
  const progressWidth = width - 56 - 16;

  const handleHIP = () => {
    router.push("/(zns)/hip");
  };

  return (
    <GradientBorderViewWrapper
      borderRadius={10}
      gradientColors={CustomDarkTheme.gradientColors.linear1}
    >
      <View style={styles.container}>
        <View>
          <LinearGradient
            colors={CustomDarkTheme.gradientColors.linear1}
            style={styles.scoreBar}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
          <View
            style={[
              styles.scoreThumb,
              {
                left: (hipData.totalPoints / hipData.maxPoints) * progressWidth,
              },
            ]}
          />
        </View>
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text style={[fontStyles["Poppins-SemiBold"], styles.statusText]}>
              {hipData.totalPoints} XP{" "}
              <Text
                style={[
                  fontStyles["Poppins-Regular"],
                  styles.statusDescription,
                ]}
              >
                Score
              </Text>
            </Text>
          </View>

          <View style={styles.statusItem}>
            <Text style={[fontStyles["Poppins-SemiBold"], styles.statusText]}>
              {hipData.rank}{" "}
              <Text
                style={[
                  fontStyles["Poppins-Regular"],
                  styles.statusDescription,
                ]}
              >
                of {hipData.totalUsers} users
              </Text>
            </Text>
          </View>

          {hipData.id && isConnected ? (
            <Text
              style={[fontStyles["Poppins-Regular"], styles.mintContainer]}
              onPress={handleHIP}
            >
              Open HIP
              <Entypo
                name="chevron-thin-right"
                size={13}
                color={CustomDarkTheme.colors.p500}
              />
            </Text>
          ) : (
            <Text
              style={[fontStyles["Poppins-Regular"], styles.mintContainer]}
              onPress={handleHIP}
            >
              Mint HIP
              <Entypo
                name="chevron-thin-right"
                size={13}
                color={CustomDarkTheme.colors.p500}
              />
            </Text>
          )}
        </View>
      </View>
    </GradientBorderViewWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: CustomDarkTheme.colors.grey2,
  },
  scoreBar: {
    width: "100%",
    height: 10,
    borderRadius: 16,
    marginBottom: 12,
  },
  scoreThumb: {
    width: 16,
    height: 16,
    position: "absolute",
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "#AD00FE",
    borderRadius: 9999,
    top: -3,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusItem: {
    borderRadius: 16,
    backgroundColor: CustomDarkTheme.colors.stroke,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 12,
    color: CustomDarkTheme.colors.p500,
    lineHeight: 12 * 1.35,
  },
  statusDescription: {
    fontSize: 12,
    color: CustomDarkTheme.colors.body,
  },
  mintContainer: {
    marginLeft: "auto",
    color: CustomDarkTheme.colors.p500,
    fontSize: 12,
    lineHeight: 12 * 1.35,
  },
});
