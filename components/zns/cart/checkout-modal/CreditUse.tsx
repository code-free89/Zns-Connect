import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import TextInput from "@/components/ui/TextInput";
import { fontStyles } from "@/constants/fonts";
import { CustomDarkTheme } from "@/constants/theme";
import { router } from "expo-router";

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
          <Text style={[fontStyles["Poppins-Medium"], styles.maxText]}>
            Max
          </Text>
        </Pressable>
      </View>

      <View style={styles.moreCreditsContainer}>
        <Ionicons name="gift-outline" size={14} color="white" />
        <Text style={[fontStyles["Poppins-Medium"], styles.moreCreditsText]}>
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
    padding: 4,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: `${CustomDarkTheme.colors.stroke}CC`,
    width: "100%",
  },
  maxContainer: {
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "#3898FF",
  },
  maxText: {
    fontSize: 16,
    lineHeight: 12 * 1.5,
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
    fontSize: 12,
    lineHeight: 12 * 1.5,
    color: CustomDarkTheme.colors.txtColor,
  },
  moreCreditsLink: {
    color: CustomDarkTheme.colors.accent,
  },
});
