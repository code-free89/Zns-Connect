import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { useAccount } from "wagmi";

import Button from "@/components/ui/Button";
import FormTextInput from "@/components/ui/forms/FormTextInput";
import InteractiveButton from "@/components/ui/InteractiveButton";
import ZnsText from "@/components/ui/Text";
import GiftCardsView from "@/components/zns/general-settings/GiftCardsView";
import { CustomDarkTheme } from "@/constants/theme";
import { NETWORKS } from "@/constants/web3/chains";
import { useMintGiftCard } from "@/hooks/web3/write/useGiftCard";
import { useAppSelector } from "@/store";
import { useFetchGiftCard } from "@/store/hooks/useFetchGiftCard";
import { isValidEthereumAddress } from "@/utils/formatter";
import { showErrorToast } from "@/utils/toast";

type BuyCreditsForm = {
  credits: number;
  send_amount: number;
  send_address: string;
};

export default function CreditsAndGiftCards() {
  const { address, chainId } = useAccount();
  const { userCredit } = useAppSelector((state) => state.user);
  const { updateStoreGift } = useFetchGiftCard();
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      credits: 0,
      send_amount: 0,
      send_address: "",
    },
  });

  const { action: buyGiftCard, isProcessing: isBuyProcessing } =
    useMintGiftCard(
      chainId as NETWORKS,
      address ?? "",
      getValues("credits"),
      "GiftCard have been Purchased Successfully!",
      updateStoreGift
    );

  const { action: transferCredits, isProcessing: isTransferProcessing } =
    useMintGiftCard(
      chainId as NETWORKS,
      getValues("send_address"),
      getValues("send_amount"),
      "GiftCard have been Purchased Successfully!",
      updateStoreGift
    );

  const onBuyGiftCard = (data: BuyCreditsForm) => {
    if (data.credits) {
      buyGiftCard();
    } else {
      showErrorToast("Please enter credit amount");
    }
  };

  const onTransferCredits = (data: BuyCreditsForm) => {
    if (isValidEthereumAddress(data.send_address)) {
      if (data.send_amount) {
        transferCredits();
      } else {
        showErrorToast("Please enter credit amount");
      }
    } else {
      showErrorToast("Please enter valid recipient address");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.creditsContainer}>
        <ZnsText type="medium" style={styles.title}>
          Buy credits
        </ZnsText>
        <View style={styles.creditContainer}>
          <ZnsText style={styles.key}>Current credits</ZnsText>
          <Button
            title={`${userCredit} credits`}
            fontType="medium"
            style={styles.creditButton}
            textStyle={styles.creditText}
          />
        </View>
        <FormTextInput
          control={control}
          name="credits"
          label="Buy credits"
          placeholder="0"
        />
        <InteractiveButton
          title="Buy credits"
          fontType="medium"
          loading={isBuyProcessing}
          onPress={handleSubmit(onBuyGiftCard)}
          requiredConnect
        />
      </View>

      <View style={styles.creditsContainer}>
        <ZnsText type="medium" style={styles.title}>
          Send credits
        </ZnsText>
        <FormTextInput
          control={control}
          name="send_amount"
          placeholder="0"
          label="Enter amount and address to send to"
        />
        <FormTextInput
          control={control}
          name="send_address"
          placeholder="Enter address to send credits"
        />
        <InteractiveButton
          title="Transfer"
          fontType="medium"
          loading={isTransferProcessing}
          onPress={handleSubmit(onTransferCredits)}
          requiredConnect
        />
      </View>

      <GiftCardsView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 24,
  },
  creditsContainer: {
    padding: 16,
    gap: 12,
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderRadius: 10,
  },
  creditContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    color: CustomDarkTheme.colors.txtColor,
  },
  key: {
    fontSize: 14,
    color: CustomDarkTheme.colors.body,
  },
  creditButton: {
    borderRadius: 12,
    width: "auto",
    backgroundColor: "#05ABFF",
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  creditText: {
    color: "#243300",
  },
});
