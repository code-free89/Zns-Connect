import { FontAwesome5 } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Linking, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import GradientBorderViewWrapper from "@/components/ui/GradientBorderViewWrapper";
import { fontStyles } from "@/constants/fonts";
import { WarningOutlineIcon } from "@/constants/icons";
import { CustomDarkTheme } from "@/constants/theme";
import { NFT_LIST, NFT_TYPE, NFTS } from "@/constants/web3/nfts";
import { useCheckBalanceNFT } from "@/hooks/web3/useCheckNFT";
import { updateHIP } from "@/lib/api/hip";
import { useAppDispatch, useAppSelector } from "@/store";
import { setHIPData } from "@/store/slices/hip";
import { getFontSize, getHeightSize, getWidthSize } from "@/utils/size";

function NFTCard({ nft, isMinted }: { nft: NFT_TYPE; isMinted: boolean }) {
  const handleBuy = () => {
    if (nft.link) {
      Linking.openURL(nft.link);
    }
  };

  return (
    <View style={styles.nftCard}>
      <View style={styles.row}>
        <Image source={nft.icon} style={styles.nftIcon} />
        <Text style={styles.nftName}>Hold a {nft.name} NFT</Text>
        <Text style={styles.nftXP}>
          {isMinted ? nft.xp : 0}/{nft.xp} XP
        </Text>
      </View>

      <Button
        disabled={isMinted}
        style={[styles.mintButton, isMinted && styles.mintedButton]}
        onPress={handleBuy}
      >
        {isMinted ? (
          <Text style={styles.mintedButtonText}>Bought</Text>
        ) : (
          <Text style={styles.mintButtonText}>Buy</Text>
        )}
        {isMinted && (
          <FontAwesome5 name="check-circle" size={13} color="#A3A3A3" />
        )}
      </Button>
    </View>
  );
}

export default function NFTTab() {
  const dispatch = useAppDispatch();
  const hipData = useAppSelector((state) => state.hip);
  const maxXP = NFT_LIST.reduce((acc, nft) => acc + nft.xp, 0);
  const [mintedNFTs, setMintedNFTs] = useState<Record<string, boolean>>({});

  const { hasNFT: hasNFT0 } = useCheckBalanceNFT(NFT_LIST[0].id as NFTS);
  const { hasNFT: hasNFT1 } = useCheckBalanceNFT(NFT_LIST[1].id as NFTS);
  const { hasNFT: hasNFT2 } = useCheckBalanceNFT(NFT_LIST[2].id as NFTS);
  const { hasNFT: hasNFT3 } = useCheckBalanceNFT(NFT_LIST[3].id as NFTS);

  useEffect(() => {
    setMintedNFTs({
      [NFT_LIST[0].id]: hasNFT0,
      [NFT_LIST[1].id]: hasNFT1,
      [NFT_LIST[2].id]: hasNFT2,
      [NFT_LIST[3].id]: hasNFT3,
    });
  }, [hasNFT0, hasNFT1, hasNFT2, hasNFT3]);

  // Calculate total XP based on individual NFT XP values
  const totalXP = Object.entries(mintedNFTs).reduce(
    (total, [nftId, isMinted]) => {
      if (isMinted) {
        const nft = NFT_LIST.find((item) => item.id === nftId);
        return total + (nft?.xp || 0);
      }
      return total;
    },
    0
  );

  useEffect(() => {
    if (totalXP > 0 && hipData.id) {
      const updateData = async () => {
        try {
          await updateHIP(hipData.id, {
            nftPoints: totalXP,
          });
          dispatch(
            setHIPData({
              nftPoints: totalXP,
              totalPoints: hipData.totalPoints - hipData.nftPoints + totalXP,
            })
          );
        } catch (error) {
          console.error("Failed to update HIP nft:", error);
        }
      };
      updateData();
    }
  }, [totalXP]);

  return (
    <View style={styles.tabContainer}>
      <View style={styles.alertContainer}>
        <WarningOutlineIcon width={24} height={24} />
        <Text style={styles.alertText}>
          Hold a specific NFT from ZNS or from partners up to 220 XP points
        </Text>
      </View>

      {NFT_LIST.map((nft) => {
        const isMinted = mintedNFTs[nft.id];
        return <NFTCard key={nft.id} nft={nft} isMinted={isMinted} />;
      })}

      <GradientBorderViewWrapper
        gradientColors={CustomDarkTheme.gradientColors.linear2}
        borderRadius={getWidthSize(16)}
        style={{ marginTop: getHeightSize(6) }}
      >
        <View style={styles.totalContent}>
          <Text style={styles.totalText}>Total: </Text>
          <Text style={styles.totalPoints}>{totalXP} XP</Text>
          <Text style={styles.totalText}> of {maxXP} XP</Text>
        </View>
      </GradientBorderViewWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    padding: getWidthSize(10),
    borderRadius: getWidthSize(18),
    borderWidth: 1,
    borderColor: "#454545",
    gap: getHeightSize(10),
  },
  alertContainer: {
    paddingHorizontal: getWidthSize(12),
    paddingVertical: getHeightSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    borderWidth: 1,
    borderColor: "#FFFFFF33",
    borderRadius: getWidthSize(16),
    flexDirection: "row",
    gap: getWidthSize(12),
  },
  alertText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
    flex: 1,
  },
  totalContent: {
    borderRadius: getWidthSize(16),
    paddingVertical: getHeightSize(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D0D0EB9",
  },
  totalText: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: "white",
  },
  totalPoints: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: "white",
  },
  nftCard: {
    padding: getWidthSize(16),
    backgroundColor: CustomDarkTheme.colors.grey2,
    gap: getHeightSize(16),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidthSize(10),
  },
  nftIcon: {
    width: getWidthSize(25),
    height: getWidthSize(25),
    borderRadius: 9999,
  },
  nftName: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(14),
    lineHeight: getFontSize(14) * 1.35,
    color: CustomDarkTheme.colors.body,
  },
  nftXP: {
    ...fontStyles["Poppins-Regular"],
    fontSize: getFontSize(16),
    lineHeight: getFontSize(16) * 1.35,
    color: "white",
    marginLeft: "auto",
  },
  mintButton: {
    paddingHorizontal: getWidthSize(10),
    paddingVertical: getHeightSize(12),
    backgroundColor: `${CustomDarkTheme.colors.primary}1A`,
    gap: getWidthSize(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mintedButton: {
    backgroundColor: "#292925CC",
  },
  mintButtonText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: CustomDarkTheme.colors.primary,
  },
  mintedButtonText: {
    ...fontStyles["Poppins-SemiBold"],
    fontSize: getFontSize(12),
    lineHeight: getFontSize(12) * 1.35,
    color: "#A3A3A3",
  },
});
