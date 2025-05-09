import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import TextInput from "@/components/ui/TextInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { getHeightSize, getWidthSize } from "@/utils/size";
3;

type CreditUseProps = {
  creditAmount: string;
  onAmountChange: (amount: string) => void;
  onMaxAmount: () => void;
  onClose: () => void;
};

export default function CreditUse({
  creditAmount,
  onAmountChange,
  onMaxAmount,
  onClose,
}: CreditUseProps) {
  const onGetMoreCredits = () => {
    onClose();
    router.push({
      pathname: "/(zns)/general-settings",
      params: {
        source: "credits",
      },
    });
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <TextInput
            keyboardType="default"
            placeholder="Use your credits (optional)"
            containerStyle={styles.creditsInput}
            value={creditAmount}
            onChangeText={onAmountChange}
          />
        </View>
        <Pressable style={styles.maxContainer} onPress={onMaxAmount}>
          <Text style={styles.maxText}>Max</Text>
        </Pressable>
      </View>

      <View style={styles.moreCreditsContainer}>
        <Ionicons name="gift-outline" size={14} color="white" />
        <Text style={styles.moreCreditsText}>
          Need more credits?{" "}
          <Text style={styles.moreCreditsLink} onPress={onGetMoreCredits}>
            Get them here
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: getHeightSize(4),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: `${CustomDarkTheme.colors.stroke}CC`,
    width: "100%",
  },
  maxContainer: {
    paddingHorizontal: getWidthSize(22),
    paddingVertical: getHeightSize(8),
    borderRadius: 12,
    backgroundColor: "#3898FF",
  },
  maxText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(16),
    lineHeight: getHeightSize(16 * 1.5),
    color: "#CFD4D4",
  },
  creditsInput: {
    borderWidth: 0,
    paddingVertical: 0,
  },
  moreCreditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    marginTop: 10,
    marginBottom: 30,
  },
  moreCreditsText: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getHeightSize(12),
    lineHeight: getHeightSize(12 * 1.5),
    color: CustomDarkTheme.colors.txtColor,
  },
  moreCreditsLink: {
    color: CustomDarkTheme.colors.accent,
  },
});
