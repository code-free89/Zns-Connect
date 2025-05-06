import { useCallback } from "react";

import { showSuccessToast } from "@/utils/toast";
import { Linking } from "react-native";

export const useShare = () => {
  const onCopyShareLink = useCallback(() => {
    // copyToClipboard(`${window.location.origin}${window.location.pathname}`);
    showSuccessToast("Share Link has been Copied");
  }, []);

  const onTweet = useCallback(() => {
    let description =
      "Exciting news for our @znsconnect community! 🟢\n" +
      "\n" +
      "Join me by following back! 🚀✨\n" +
      "\n" +
      "Visit:";

    let url = window.location.href.split("?")[0];
    let hashtags = "zns,znsconnect,nameservise";
    Linking.openURL(
      `https://twitter.com/intent/tweet?text=${description}&url=${url}&hashtags=${hashtags}`
    );
  }, []);

  return { onCopyShareLink, onTweet };
};
