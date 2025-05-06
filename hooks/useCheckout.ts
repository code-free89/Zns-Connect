import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { formatEther, parseEther } from "viem";
import { useAccount, useBalance, useWaitForTransactionReceipt } from "wagmi";

import { CONTRACTS } from "@/constants/web3/contracts";
import { useCostWithGas } from "@/hooks/web3/core/useEstimateGas";
import { useWriteContract } from "@/hooks/web3/core/useWriteContract";
import usePriceCredit from "@/hooks/web3/usePriceCredit";
import { createDomain } from "@/lib/api/domain";
import { updateDomainCategories } from "@/lib/api/domain/category";
import { updateRefer } from "@/lib/api/referral";
import { useAppDispatch, useAppSelector } from "@/store";
import { useInvalidateQuery } from "@/store/hooks/useInvalidateQuery";
import { CartDomainType, removeCartDomains } from "@/store/slices/cart";
import { cartDomains, setPurchased } from "@/store/slices/setting";
import { getSanitizedValue } from "@/utils/formatter";
import { showErrorToast, showSuccessToast } from "@/utils/toast";

export const useCheckout = (successCallback?: () => void) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, userCredit } = useAppSelector((state) => state.user);
  const { domains, selectedChain } = useAppSelector((state) => state.cart);
  const { address } = useAccount();
  const { data: userBalance } = useBalance({ address });
  const [creditAmount, setCreditAmount] = useState<number | "">(""); // Currently 1 USD = 1 Credit

  const formattedCreditAmount = useMemo(() => {
    if (creditAmount === "") return 0;
    return creditAmount;
  }, [creditAmount]);

  const { invalidateCredit, invalidateUserPDomain, invalidateUserDomains } =
    useInvalidateQuery();
  const refer = useMemo(() => {
    if (!user || user.refer === address || !user.refer) {
      return "0x0000000000000000000000000000000000000000";
    }
    return user.refer ?? "0x0000000000000000000000000000000000000000";
  }, [user, address]);

  const [domainsProcessed, setDomainsProcessed] = useState(false);
  const [extendedProcessing, setExtendedProcessing] = useState(false);

  const { priceInUSD } = usePriceCredit();
  const {
    data: hash,
    error,
    isPending,
    isError,
    reset,
    callWriteContract,
  } = useWriteContract();

  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash,
  });

  const selectedDomains = useMemo(
    () => domains.filter((item) => item.chainId === selectedChain),
    [domains, selectedChain]
  );

  const totalPrice = useMemo(() => {
    return selectedDomains.reduce((sum, item) => {
      const { price, reNewPrice, year: purchaseYear } = item;
      const additionalYears = purchaseYear - 1;
      return (
        sum +
        parseEther(price) +
        parseEther(reNewPrice) * BigInt(additionalYears)
      );
    }, BigInt(0));
  }, [selectedDomains]);

  const creditPrice = useMemo(() => {
    return priceInUSD !== 0 ? formattedCreditAmount / priceInUSD : 0;
  }, [priceInUSD, formattedCreditAmount]);

  const finalPrice = useMemo(() => {
    const _price = totalPrice - parseEther(creditPrice.toString());
    return _price > BigInt(0) ? _price : BigInt(0);
  }, [totalPrice, creditPrice]);

  const creditMaxAmount = useMemo(() => {
    if (!priceInUSD) return 0;
    const predictedPrice = Math.ceil(
      Number(formatEther(totalPrice)) * priceInUSD
    );

    // Get oracle price (priceInUSD is already available from usePriceCredit)
    const oraclePriceBigInt = BigInt(Math.floor(priceInUSD * 1e18));

    // Calculate max: (priceToRegister * oraclePrice) / 1e18
    const maxBigInt = (totalPrice * oraclePriceBigInt) / BigInt(1e18);

    // Convert to number for comparison with userCredit
    const max = Number(formatEther(maxBigInt));

    return userCredit > max ? max : userCredit;
  }, [totalPrice, priceInUSD, userCredit]);

  const isProcessing = useMemo(
    () => (isLoading && !!hash) || isPending || extendedProcessing,
    [isLoading, hash, isPending, extendedProcessing]
  );
  useEffect(() => {
    setCreditAmount("");
  }, [selectedChain]);

  useEffect(() => {
    const handleTransactionSuccess = async () => {
      if (isSuccess && user && !domainsProcessed) {
        try {
          setExtendedProcessing(true);
          reset();
          if (refer !== "0x0000000000000000000000000000000000000000") {
            updateRefer(refer, selectedChain);
          }
          dispatch(setPurchased(true));
          invalidateUserDomains();
          if (formattedCreditAmount > 0) invalidateCredit();
          removePurchasedDomains(selectedDomains);

          // update CategoryDomain "taken"
          const takenCategoryDomains = selectedDomains
            .filter((selectedDomain) => selectedDomain.isCategory)
            .reduce((prev, cur) => {
              return prev[cur.categoryKey!]
                ? {
                    ...prev,
                    [cur.categoryKey!]: prev[cur.categoryKey!] + 1,
                  }
                : { ...prev, [cur.categoryKey!]: 1 };
            }, {} as { [prop: string]: number });
          Object.keys(takenCategoryDomains).length > 0 &&
            (await updateDomainCategories(takenCategoryDomains));

          await createDomain(selectedDomains);
          successCallback && successCallback();
          invalidateUserPDomain();
          router.push("/(tabs)/home");
          // fireConfetti();
          setDomainsProcessed(true);
          showSuccessToast("Your domains are purchased successfully!");
        } catch (error) {
          showErrorToast(`Domain registration failed!`);
        } finally {
          setExtendedProcessing(false);
        }
      }
    };

    handleTransactionSuccess();
  }, [
    isSuccess,
    user,
    refer,
    selectedChain,
    selectedDomains,
    domainsProcessed,
  ]);

  useEffect(() => {
    if (isError) {
      console.error("Error : ", error);
      showErrorToast(`Transaction has canceled`);
    }
  }, [isError, error]);

  const onCreditAmountChange = useCallback(
    (value: string) => {
      const amount = getSanitizedValue(value);
      if (amount > creditMaxAmount) return;
      if (value === "") setCreditAmount("");
      else setCreditAmount(amount);
    },
    [creditMaxAmount]
  );

  const onMaxAmount = () => {
    setCreditAmount(creditMaxAmount);
  };

  const validateDomainsToPurchase = () => {
    if (selectedDomains.length < 1) {
      showErrorToast("Please add your domains to purchase");
      return false;
    }
    const hasInvalidDomain =
      selectedDomains.findIndex((item) => Number(item.id)) > -1;
    if (hasInvalidDomain) {
      showErrorToast("You have some invalid domains");
      return false;
    }
    return true;
  };

  const purchaseCall = useMemo(() => {
    const _creditAmount = parseEther(
      formattedCreditAmount.toString()
    ).toString();

    const _owners: string[] = [];
    const _domains: string[] = [];
    const _expires: number[] = [];
    selectedDomains.forEach((domain) => {
      _owners.push(address ?? "");
      _domains.push(domain.domainName);
      _expires.push(domain.year);
    });
    return {
      contract: CONTRACTS.REGISTRY,
      functionName: "registerDomains",
      value: finalPrice.toString(),
      args: [_owners, _domains, _expires, refer, _creditAmount],
    };
  }, [formattedCreditAmount, address, selectedDomains]);

  const { value: costWithGas } = useCostWithGas(purchaseCall, selectedChain);

  const isEnoughBalance = useMemo(() => {
    if (costWithGas) {
      return userBalance && userBalance?.value >= Number(costWithGas);
    }
    return userBalance && userBalance?.value >= finalPrice;
  }, [costWithGas, userBalance, finalPrice]);

  const onCheckout = useCallback(() => {
    if (!address) {
      showErrorToast("Please connect your wallet");
      return;
    }
    const isValid = validateDomainsToPurchase();
    if (!isValid) {
      return;
    }

    const _creditAmount = parseEther(formattedCreditAmount.toString());

    const _owners: string[] = [];
    const _domains: string[] = [];
    const _expires: number[] = [];
    selectedDomains.forEach((domain) => {
      _owners.push(address);
      _domains.push(domain.domainName);
      _expires.push(domain.year);
    });
    if (isEnoughBalance) {
      callWriteContract({
        contract: CONTRACTS.REGISTRY,
        functionName: "registerDomains",
        value: finalPrice,
        args: [_owners, _domains, _expires, refer, _creditAmount],
      });
    }
  }, [
    isEnoughBalance,
    selectedDomains,
    formattedCreditAmount,
    finalPrice,
    refer,
    userBalance,
    address,
    callWriteContract,
  ]);

  const removePurchasedDomains = useCallback(
    (data: CartDomainType[]) => {
      dispatch(cartDomains(data));
      dispatch(removeCartDomains(data));
    },
    [dispatch]
  );

  return {
    selectedDomains,
    isEnoughBalance,
    isProcessing,
    totalPrice,
    creditPrice,
    finalPrice,
    creditAmount,
    onCreditAmountChange,
    onMaxAmount,
    onCheckout,
  };
};
