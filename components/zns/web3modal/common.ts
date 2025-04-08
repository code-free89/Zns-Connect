import { arbitrum, mainnet, polygon, polygonMumbai } from "viem/chains";

const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID;

const metadata = {
  name: "Web3Modal cross-platform",
  description: "Web3Modal RN + web cross-platform example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "znsconnect://",
    universal: "https://zns.bio",
  },
};

const chains = [mainnet, polygon, polygonMumbai, arbitrum];

export { chains, metadata, projectId };
