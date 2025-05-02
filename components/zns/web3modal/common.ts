import {
  ink,
  soneium,
  abstract,
  berachain,
  unichain,
  zora,
  plume,
  apeChain,
  hemi,
  bsc,
  base,
  sonic,
  scroll,
  blast,
  taiko,
  polygon,
  creatorTestnet,
  monadTestnet,
} from "viem/chains";

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID!;

const metadata = {
  name: "ZNS Connect",
  description: "ZNS Connect",
  url: "https://zns.bio",
  icons: ["https://zns.bio/favicon.ico"],
  redirect: {
    native: "znsconnect://",
    universal: "https://zns.bio",
  },
};

const chains = [
  ink,
  soneium,
  abstract,
  berachain,
  unichain,
  zora,
  plume,
  apeChain,
  hemi,
  bsc,
  base,
  sonic,
  scroll,
  blast,
  taiko,
  polygon,
  creatorTestnet,
  monadTestnet,
];

export { chains, metadata, projectId };
