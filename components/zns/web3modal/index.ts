import {
  createAppKit,
  defaultWagmiConfig,
} from "@reown/appkit-wagmi-react-native";

import { CustomDarkTheme } from "@/constants/theme";
import { chains } from "@/constants/web3/chains";

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID!;

// 2. Create config
const metadata = {
  name: "ZNS Connect",
  description: "ZNS Connect",
  url: "https://zns.bio",
  icons: ["https://zns.bio/favicon.ico"],
  redirect: {
    native: "com.zns.app://",
    universal: "https://zns.bio",
    linkMode: true,
  },
};

// Create Wagmi config
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
});

// 3. Create modal
createAppKit({
  projectId,
  wagmiConfig,
  defaultChain: chains[0], // Optional
  themeMode: "dark",
  themeVariables: {
    accent: CustomDarkTheme.colors.primary,
  },
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // MetaMask
    "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", // Phantom
    "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4", // Binance
    "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1", // Rabby Wallet
    "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369", // Rainbow Wallet
    "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66", // Token Pocket
    "aba1f652e61fd536e8a7a5cd5e0319c9047c435ef8f7e907717361ff33bb3588", // Gate Wallet
    "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // Bitget Wallet
  ],
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // MetaMask
  ],
});

// Init Web3Modal RN SDK
// createWeb3Modal({
//   projectId,
//   chains,
//   wagmiConfig,
//   themeMode: "dark",
//   defaultChain: ink,
// includeWalletIds: [
//   "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96", // MetaMask
//   "a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393", // Phantom
//   "8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4", // Binance
//   "18388be9ac2d02726dbac9777c96efaac06d744b2f6d580fccdd4127a6d01fd1", // Rabby Wallet
//   "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369", // Rainbow Wallet
//   "20459438007b75f4f4acb98bf29aa3b800550309646d375da5fd4aac6c2a2c66", // Token Pocket
//   "aba1f652e61fd536e8a7a5cd5e0319c9047c435ef8f7e907717361ff33bb3588", // Gate Wallet
//   "38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662", // Bitget Wallet
// ],
// });

// Re-export components
export { chains, wagmiConfig };
