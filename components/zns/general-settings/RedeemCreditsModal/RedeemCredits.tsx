import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import InteractiveButton from "@/components/ui/InteractiveButton";
import ZnsText from "@/components/ui/Text";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useBurnGiftCard } from "@/hooks/web3/write/useGiftCard";
import { useAppSelector } from "@/store";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { useInvalidateQuery } from "@/store/hooks/useInvalidateQuery";
import { GiftCardType } from "@/store/slices/user";
import { formatCredits } from "@/utils/formatter";

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
      <ZnsText type="medium" style={styles.redeemTitle}>
        Redeem Credits
      </ZnsText>
      <View style={styles.currentCreditsContainer}>
        <ZnsText type="medium" style={styles.currentCreditsLabel}>
          Current credits
        </ZnsText>
        <View style={styles.currentCreditsWrapper}>
          <ZnsText type="medium" style={styles.currentCredits}>
            {userCredit} Credits
          </ZnsText>
        </View>
      </View>
      <InteractiveButton
        fontType="medium"
        title={`Redeem ${formatCredits(giftCard?.credits ?? 0)} credits now`}
        requiredConnect
        loading={isBurnProcessing}
        style={{ marginTop: 12 }}
        textStyle={{ fontSize: 14, color: CustomDarkTheme.colors.p950 }}
        onPress={onBurn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  redeemContainer: {
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: 16,
    borderRadius: 10,
    gap: 12,
  },
  redeemTitle: {
    color: CustomDarkTheme.colors.txtColor,
    fontSize: 16,
  },
  currentCreditsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  currentCreditsWrapper: {
    backgroundColor: "#05ABFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 11,
  },
  currentCreditsLabel: {
    fontSize: 16,
    color: CustomDarkTheme.colors.body,
  },
  currentCredits: {
    fontSize: 12,
    color: CustomDarkTheme.colors.p950,
  },
});
