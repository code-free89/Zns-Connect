import { useCallback } from "react";
import { Linking } from "react-native";

import { CombinedProfile } from "@/store/slices/profile";
import { copyToClipboard } from "@/utils/helpers";
import { showSuccessToast } from "@/utils/toast";
import { tlds } from "@/constants/web3/tlds";
import { CHAINS } from "@/constants/web3/chains";

type ShareProps = {
  profile: CombinedProfile | null;
  callback?: () => void;
};

export const useShare = ({ profile, callback }: ShareProps) => {
  const onCopyShareLink = useCallback(() => {
    if (profile) {
      const chain = CHAINS.find((chain) => chain.chain === profile.chain);
      const tld = tlds.find((tld) => tld.chainId === chain?.id)?.label;
      copyToClipboard(
        `${process.env.EXPO_PUBLIC_APP_URL}/${profile?.domainName}.${tld}`
      );
      showSuccessToast("Share Link has been Copied");
      callback?.();
    }
  }, [profile, callback]);

  const onTweet = useCallback(() => {
    if (profile) {
      let description =
        "Exciting news for our @znsconnect community! 🟢\n" +
        "\n" +
        "Join me by following back! 🚀✨\n" +
        "\n" +
        "Visit:";

      const chain = CHAINS.find((chain) => chain.chain === profile.chain);
      const tld = tlds.find((tld) => tld.chainId === chain?.id)?.label;
      const url = `${process.env.EXPO_PUBLIC_APP_URL}/${profile?.domainName}.${tld}`;
      let hashtags = "zns,znsconnect,nameservise";
      Linking.openURL(
        `${process.env.EXPO_PUBLIC_TWITTER_URL}/intent/tweet?text=${description}&url=${url}&hashtags=${hashtags}`
      );
      callback?.();
    }
  }, [profile, callback]);

  return { onCopyShareLink, onTweet };
};
