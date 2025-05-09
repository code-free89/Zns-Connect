import * as Clipboard from "expo-clipboard";

import { NETWORKS } from "@/constants/web3/chains";

const baseUrl = process.env.EXPO_PUBLIC_IMAGE_SEVICE_URL;

export const copyToClipboard = async (value: string) => {
  await Clipboard.setStringAsync(value);
};

export const getDomainUrl = (
  chainId?: NETWORKS | null,
  domainId?: number | string
) => {
  if (chainId && domainId) return `${baseUrl}${chainId}/${domainId}.png`;
  else return "";
};
