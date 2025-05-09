import { useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Button from "@/components/ui/Button";
import CartSummary from "@/components/zns/cart/CartSummary";
import EmptyCart from "@/components/zns/cart/EmptyCart";
import DomainCartItem from "@/components/zns/DomainCartItem";
import DomainTypeSelect from "@/components/zns/DomainTypeSelect";
import { CHAIN_IDS, NETWORKS } from "@/constants/web3/chains";
import { useAppDispatch, useAppSelector } from "@/store";
import { selectChain } from "@/store/slices/cart";
import { getHeightSize } from "@/utils/size";
interface CartItemListProps {
  onCheckout: () => void;
}

export default function CartItemList({ onCheckout }: CartItemListProps) {
  const dispatch = useAppDispatch();
  const { isInited, isPurchased, carts } = useAppSelector(
    (state) => state.setting
  );
  const { domains, selectedChain } = useAppSelector((state) => state.cart);

  const domainsByChain = useMemo(
    () => domains.filter((item) => item.chainId === selectedChain),
    [domains, selectedChain]
  );

  const updateChain = (chain: NETWORKS) => {
    dispatch(selectChain(chain));
  };

  // Filter CHAINS to include only those with associated domains and get the count
  const chainsWithDomainCount = useMemo(() => {
    return CHAIN_IDS.map((chainId) => {
      const count = domains.filter(
        (domain) => domain.chainId === chainId
      ).length;
      return { chainId: chainId, data: count };
    }).filter((chain) => chain.data > 0);
  }, [domains]);

  const chains = useMemo(
    () => chainsWithDomainCount.map((c) => c.chainId),
    [chainsWithDomainCount]
  );

  useEffect(() => {
    if (
      chainsWithDomainCount.length > 0 &&
      chainsWithDomainCount.findIndex(
        (item) => item.chainId === selectedChain
      ) < 0
    ) {
      dispatch(selectChain(chainsWithDomainCount[0].chainId));
    }
  }, [chainsWithDomainCount, selectedChain]);

  return !isPurchased && isInited && carts.length < 1 ? (
    <EmptyCart />
  ) : (
    <View style={styles.container}>
      <CartSummary />

      <View>
        <DomainTypeSelect
          chains={chains}
          chainData={chainsWithDomainCount}
          value={selectedChain}
          onSelect={(chainId) => updateChain(chainId)}
        />
      </View>

      <FlatList
        data={domainsByChain}
        renderItem={({ item }) => <DomainCartItem data={item} />}
        contentContainerStyle={styles.domainContainer}
        keyExtractor={(_, index) => `cart-item-${index}`}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      <Button title={"Checkout"} onPress={onCheckout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: getHeightSize(30),
  },
  domainContainer: {
    flex: 1,
  },
});
