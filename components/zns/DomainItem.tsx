import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import ChainSelector from "@/components/zns/ChainSelector";
import DomainPrice from "@/components/zns/DomainPrice";
import DomainText from "@/components/zns/DomainText";
import {
  CartIconFilled,
  CartIconOutline,
  HeartIcon,
  HeartIconFill,
} from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { CHAINS, getChainIcon } from "@/constants/web3/chains";
import useFavourite from "@/hooks/useFavourite";
import { useDomain } from "@/hooks/web3/useDomain";
import { useTLD } from "@/hooks/web3/useTLD";
import { useAppDispatch, useAppSelector } from "@/store";
import { cartDomain } from "@/store/slices/setting";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";
import { showSuccessToast } from "@/utils/toast";
import { fontStyles } from "@/constants/fonts";

type Props = {
  showIndex?: boolean;
  index: number;
  domainName: string;
  chainId?: number;
  showEdit?: boolean;
  showCart?: boolean;
  showChainSelect?: boolean;
  chainDirection?: "up" | "down";
};

const defaultChainId = CHAINS[0].id;

export default function DomainItem({
  showIndex = false,
  index,
  domainName,
  chainId = defaultChainId,
  showEdit = false,
  showCart = false,
  showChainSelect = true,
  chainDirection = "down",
}: Props) {
  const dispatch = useAppDispatch();
  const [selectedChainId, setSelectedChainId] = useState(chainId);
  const { carts } = useAppSelector((state) => state.setting);
  const chainIcon = useMemo(() => getChainIcon(chainId), [chainId]);
  const tld = useTLD(selectedChainId);
  const {
    id: domainId,
    price,
    symbol,
    isLoading,
  } = useDomain(domainName, selectedChainId);
  const fullDomain = useMemo(() => `${domainName}.${tld}`, [domainName, tld]);
  const domainData = useMemo(
    () => ({ domainName, chainId: selectedChainId }),
    [domainName, selectedChainId]
  );
  const { isFavourite, onFavourite } = useFavourite(domainData);

  const profileLink = useMemo(() => {
    return `/${fullDomain}`;
  }, [fullDomain]);

  const isCarted = useMemo(
    () =>
      carts.filter(
        (item) =>
          item.domainName === domainName && item.chainId === selectedChainId
      ).length !== 0,
    [carts, domainName, selectedChainId]
  );

  const onAddCart = () => {
    if (fullDomain === "") return;
    showSuccessToast("Added to your cart");
    dispatch(cartDomain(domainData));
  };

  const onDeleteCart = () => {
    if (fullDomain === "") return;
    showSuccessToast("Removed from your cart");
    dispatch(cartDomain(domainData));
  };

  useEffect(() => {
    setSelectedChainId(chainId);
  }, [chainId]);

  return (
    <View style={styles.container}>
      {showIndex && <Text style={styles.index}>{index.toString()}</Text>}
      <Pressable onPress={onFavourite}>
        {isFavourite ? <HeartIconFill /> : <HeartIcon />}
      </Pressable>
      <Image source={chainIcon} style={styles.icon} />
      <View style={styles.domainContainer}>
        <DomainText domainName={domainName} chainId={selectedChainId} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={CustomDarkTheme.colors.primary}
          />
        ) : (
          <DomainPrice price={price} symbol={symbol} color="white" />
        )}
      </View>

      {showEdit && (
        <TouchableOpacity style={styles.actionContainer}>
          <FontAwesome6
            name="edit"
            size={12}
            color={CustomDarkTheme.colors.p700}
          />
        </TouchableOpacity>
      )}

      {showChainSelect && (
        <ChainSelector
          domainName={domainName}
          selectedChainId={selectedChainId}
          setSelectedChainId={setSelectedChainId}
          chainDirection={chainDirection}
        />
      )}

      {Number(domainId) ? (
        <View style={styles.actionIcon}>
          <AntDesign
            name="right"
            size={13}
            color={CustomDarkTheme.colors.p500}
          />
        </View>
      ) : showCart ? (
        <TouchableOpacity
          onPress={isCarted ? onDeleteCart : onAddCart}
          style={styles.actionIcon}
        >
          {isCarted ? <CartIconFilled /> : <CartIconOutline />}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: getWidthSize(12),
    backgroundColor: CustomDarkTheme.colors.grey2,
    padding: getWidthSize(12),
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(6),
  },
  index: {
    ...fontStyles["Poppins-Bold"],
    fontSize: getFontSize(12),
    color: CustomDarkTheme.colors.caption,
    marginRight: getWidthSize(8),
  },
  domainContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: getWidthSize(24),
    height: getHeightSize(24),
    borderRadius: 9999,
  },
  actionContainer: {
    padding: getWidthSize(8),
    borderRadius: getWidthSize(10),
    borderColor: CustomDarkTheme.colors.p700,
    borderWidth: 0.65,
  },
  viewProfileBtn: {},
  actionIcon: {
    width: getWidthSize(24),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
