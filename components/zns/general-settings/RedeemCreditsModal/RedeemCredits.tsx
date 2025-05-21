import { StyleSheet, View, Text } from "react-native";
import { useAccount } from "wagmi";

import InteractiveButton from "@/components/ui/InteractiveButton";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useBurnGiftCard } from "@/hooks/web3/write/useGiftCard";
import { useAppSelector } from "@/store";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { useInvalidateQuery } from "@/store/hooks/useInvalidateQuery";
import { GiftCardType } from "@/store/slices/user";
import { formatCredits } from "@/utils/formatter";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { fontStyles } from "@/constants/fonts";

type RedeemCreditsSectionProps = {
  giftCard?: GiftCardType;
  onClose: () => void;
};

export default function RedeemCreditsSection({
  giftCard,
  onClose,
}: RedeemCreditsSectionProps) {
  const { userCredit } = useAppSelector((state) => state.user);
  const { chainId } = useAccount();
  const { updateStoreGift } = useFetchGiftCard();
  const { invalidateCredit } = useInvalidateQuery();

  const callback = () => {
    updateStoreGift();
    invalidateCredit();
    onClose();
  };

  const { action: onBurn, isProcessing: isBurnProcessing } = useBurnGiftCard(
    chainId as NETWORKS,
    giftCard?.id ?? "",
    callback
  );

  return (
    <View style={styles.redeemContainer}>
      <Text style={styles.redeemTitle}>Redeem Credits</Text>
      <View style={styles.currentCreditsContainer}>
        <Text style={styles.currentCreditsLabel}>Current credits</Text>
        <View style={styles.currentCreditsWrapper}>
          <Text style={styles.currentCredits}>{userCredit} Credits</Text>
        </View>
      </View>
      <InteractiveButton
        title={`Redeem ${formatCredits(giftCard?.credits ?? 0)} credits now`}
        requiredConnect
        loading={isBurnProcessing}
        style={{ marginTop: getHeightSize(12) }}
        textStyle={{
          fontSize: getFontSize(14),
          lineHeight: getFontSize(14) * 1.5,
          color: CustomDarkTheme.colors.p950,
        }}
        onPress={() => onBurn()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  redeemContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: getWidthSize(16),
    borderRadius: getWidthSize(10),
    gap: getWidthSize(12),
  },
  redeemTitle: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(16),
    color: CustomDarkTheme.colors.txtColor,
  },
  currentCreditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentCreditsWrapper: {
    backgroundColor: "#05ABFF",
    borderRadius: getWidthSize(12),
    paddingHorizontal: getWidthSize(15),
    paddingVertical: getHeightSize(11),
  },
  currentCreditsLabel: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.5,
    color: CustomDarkTheme.colors.body,
  },
  currentCredits: {
    ...fontStyles["Poppins-Medium"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.5,
    color: CustomDarkTheme.colors.p950,
  },
});
