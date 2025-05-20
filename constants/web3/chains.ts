import { Chain } from "viem";

export enum NETWORKS {
  DEFAULT = 57073,
  INKMAINNET = 57073,
  SONEIUMMAINNET = 1868,
  ABSTRACTMAINNET = 2741,
  BERA = 80094,
  UNICHAIN = 130,
  // COTI = 2632500,
  ZORA = 7777777,
  PLUMEMAINNET = 98865,
  APE = 33139,
  HEMI = 43111,
  CZ = 56,
  BASE = 8453,
  SONICMAINNET = 146,
  SCROLL = 534352,
  BLAST = 81457,
  TAIKO = 167000,
  POLY = 137,
  CREATOR_CHAIN = 66665,
  MONAD = 10143,
  // NEXUS = 393,
  // TABI_V2 = 9788,
  // ATHENE = 281123,
  // XRPL = 1449000,
  // SAHARA = 313313,
}

export const rpcs: { [key in NETWORKS]: string } = {
  [NETWORKS.BERA]: process.env.EXPO_PUBLIC_RPC_BERA!,
  [NETWORKS.CZ]: process.env.EXPO_PUBLIC_RPC_CZ!,
  [NETWORKS.INKMAINNET]: process.env.EXPO_PUBLIC_RPC_INK!,
  [NETWORKS.ZORA]: process.env.EXPO_PUBLIC_RPC_ZORA!,
  [NETWORKS.BASE]: process.env.EXPO_PUBLIC_RPC_BASE!,
  [NETWORKS.SONICMAINNET]: process.env.EXPO_PUBLIC_RPC_SONIC!,
  [NETWORKS.ABSTRACTMAINNET]: process.env.EXPO_PUBLIC_RPC_ABSTRACT!,
  [NETWORKS.SONEIUMMAINNET]: process.env.EXPO_PUBLIC_RPC_SONEIUM!,
  [NETWORKS.PLUMEMAINNET]: process.env.EXPO_PUBLIC_RPC_PLUME!,
  [NETWORKS.SCROLL]: process.env.EXPO_PUBLIC_RPC_SCROLL!,
  [NETWORKS.BLAST]: process.env.EXPO_PUBLIC_RPC_BLAST!,
  [NETWORKS.TAIKO]: process.env.EXPO_PUBLIC_RPC_TAIKO!,
  [NETWORKS.POLY]: process.env.EXPO_PUBLIC_RPC_POLY!,
  [NETWORKS.UNICHAIN]: process.env.EXPO_PUBLIC_RPC_UNICHAIN!,
  [NETWORKS.APE]: process.env.EXPO_PUBLIC_RPC_APE!,
  [NETWORKS.HEMI]: process.env.EXPO_PUBLIC_RPC_HEMI!,
  [NETWORKS.CREATOR_CHAIN]: process.env.EXPO_PUBLIC_RPC_CREATOR_CHAIN!,
  [NETWORKS.MONAD]: process.env.EXPO_PUBLIC_RPC_MONAD!,
};

export const ChainMap = {
  ZETA: "ZETA",
  BERA: "BERA",
  BERAMAINNET: "BERAMAINNET",
  BASE: "BASE",
  POLY: "POLY",
  MINT: "MINT",
  HONEY: "HONEY",
  XTERIO: "XTERIO",
  CZ: "CZ",
  XLAYER: "XLAYER",
  NFT: "NFT",
  TABI: "TABI",
  TABI_V2: "TABI_V2",
  TAIKO: "TAIKO",
  FIRE: "FIRE",
  SCROLL: "SCROLL",
  CANDY: "CANDY",
  ARTHERA: "ARTHERA",
  NEOX: "NEOX",
  BLAST: "BLAST",
  BOBA: "BOBA",
  XRP: "XRP",
  GOLD: "GOLD",
  ZKLINK: "ZKLINK",
  ZIRCUIT: "ZIRCUIT",
  ZORA: "ZORA",
  PLUME: "PLUME",
  PLUMEMAINNET: "PLUMEMAINNET",
  SONEIUM: "SONEIUM",
  SONEIUMMAINNET: "SONEIUMMAINNET",
  SONICMAINNET: "SONICMAINNET",
  SONIC: "SONIC",
  ATHENE: "ATHENE",
  MORPH: "MORPH",
  STORY: "STORY",
  INKMAINNET: "INKMAINNET",
  INK: "INK",
  CREATOR_CHAIN: "CREATOR_CHAIN",
  FORM: "FORM",
  ABSTRACT: "ABSTRACT",
  ABSTRACTMAINNET: "ABSTRACTMAINNET",
  SAHARA: "SAHARA",
  UNICHAIN: "UNICHAIN",
  MONAD: "MONAD",
  APE: "APE",
  HEMI: "HEMI",
  NEXUS: "NEXUS",
  MEGAETH: "MEGAETH",
  COTI: "COTI",
  XRPL: "XRPL",
};

export interface NETWORK_TYPE extends Chain {
  chain: PrismaChain;
  shortName?: string;
  color?: string;
  sellMarket?: string;
  icon?: any;
}

export type PrismaChain = (typeof ChainMap)[keyof typeof ChainMap];

export const CHAIN_COLOR: { [key in NETWORKS]: string } = {
  [NETWORKS.BERA]: "#FD7108",
  [NETWORKS.CZ]: "#f0b90b",
  [NETWORKS.INKMAINNET]: "#7132f4",
  [NETWORKS.ZORA]: "#72E1EA",
  [NETWORKS.BASE]: "#1653f0",
  [NETWORKS.SONICMAINNET]: "#fff",
  [NETWORKS.ABSTRACTMAINNET]: "#08ce6e",
  [NETWORKS.SONEIUMMAINNET]: "#fff",
  [NETWORKS.PLUMEMAINNET]: "#f53a39",
  // [NETWORKS.FORM]: "#fff",
  [NETWORKS.SCROLL]: "#FFDBB3",
  [NETWORKS.BLAST]: "#F4F53A",
  [NETWORKS.TAIKO]: "#E81899",
  // [NETWORKS.MORPH]: "#fff",
  [NETWORKS.POLY]: "#8247E5",
  [NETWORKS.UNICHAIN]: "#f60cb2",
  // [NETWORKS.COTI]: "#207ec3",
  [NETWORKS.APE]: "#0052f0",
  [NETWORKS.HEMI]: "#ff6c15",
  // [NETWORKS.MINT]: "#30BF54",
  // [NETWORKS.XLAYER]: "#fff",
  [NETWORKS.CREATOR_CHAIN]: "#F4F53A",
  [NETWORKS.MONAD]: "#826df9",
  // [NETWORKS.NEXUS]: "#5c5c5e",
  // [NETWORKS.MEGA]: "#fff",
  // [NETWORKS.BARTIO]: "#FD7108",
  // [NETWORKS.TABI_V2]: "#FF8311",
  // [NETWORKS.STORY]: "#fff",
  // [NETWORKS.ATHENE]: "#04D693",
  // [NETWORKS.XRPL]: "#FEFEFE",
  // [NETWORKS.SAHARA]: "#f7ff98",
  // [NETWORKS.SOMNIA]: "#db045a",
  // [NETWORKS.BOBA]: "#CCFE3F",
  // [NETWORKS.ZKLINK]: "#04D693",
  // [NETWORKS.ARTHERA]: "#B10C90",
  // [NETWORKS.TABI]: "#FF8311",
  // [NETWORKS.ZIRCUIT]: "#277E29",
  // [NETWORKS.NEOX]: "#00E599",
  // [NETWORKS.ZKCANDY]: "#D125D6",
  // [NETWORKS.MORPHHOLESKY]: "#00AB00",
  // [NETWORKS.FIRE]: "#4848AC",
};

export const CHAIN_ICON: { [key in NETWORKS]: string } = {
  [NETWORKS.INKMAINNET]: "https://icons.llamao.fi/icons/chains/rsz_ink.jpg",
  [NETWORKS.SONEIUMMAINNET]:
    "https://icons.llamao.fi/icons/chains/rsz_soneium.jpg",
  [NETWORKS.ABSTRACTMAINNET]:
    "https://icons.llamao.fi/icons/chains/rsz_abstract.jpg",
  [NETWORKS.BERA]: "https://icons.llamao.fi/icons/chains/rsz_berachain.jpg",
  [NETWORKS.UNICHAIN]: "https://icons.llamao.fi/icons/chains/rsz_unichain.jpg",
  // [NETWORKS.COTI]: "",
  [NETWORKS.ZORA]: "https://icons.llamao.fi/icons/chains/rsz_zora.jpg",
  [NETWORKS.PLUMEMAINNET]: "",
  [NETWORKS.APE]: "https://icons.llamao.fi/icons/chains/rsz_apechain.jpg",
  [NETWORKS.HEMI]: "https://icons.llamao.fi/icons/chains/rsz_hemi.jpg",
  [NETWORKS.CZ]: "https://icons.llamao.fi/icons/chains/rsz_binance.jpg",
  [NETWORKS.BASE]: "https://icons.llamao.fi/icons/chains/rsz_base.jpg",
  [NETWORKS.SONICMAINNET]: "https://icons.llamao.fi/icons/chains/rsz_sonic.jpg",
  [NETWORKS.SCROLL]: "https://icons.llamao.fi/icons/chains/rsz_scroll.jpg",
  [NETWORKS.BLAST]: "https://icons.llamao.fi/icons/chains/rsz_blast.jpg",
  [NETWORKS.TAIKO]: "https://icons.llamao.fi/icons/chains/rsz_taiko.jpg",
  [NETWORKS.POLY]: "https://icons.llamao.fi/icons/chains/rsz_polygon.jpg",
  [NETWORKS.CREATOR_CHAIN]: "",
  [NETWORKS.MONAD]: "",
  // [NETWORKS.NEXUS]: "",
  // [NETWORKS.TABI_V2]: "",
  // [NETWORKS.ATHENE]: "",
  // [NETWORKS.XRPL]: "",
  // [NETWORKS.SAHARA]: "",
};

export const CHAINS: NETWORK_TYPE[] = [
  {
    id: NETWORKS.INKMAINNET,
    name: "Ink Mainnet",
    shortName: "Ink",
    chain: ChainMap.INKMAINNET,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/ink.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.INKMAINNET]] },
    },
    blockExplorers: {
      default: {
        name: "ETH",
        url: "https://explorer.inkonchain.com/",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.SONEIUMMAINNET,
    name: "Soneium Mainnet",
    shortName: "Soneium",
    chain: ChainMap.SONEIUMMAINNET,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/soneium.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.SONEIUMMAINNET]] },
    },
    blockExplorers: {
      default: {
        name: "ETH",
        url: "https://soneium.blockscout.com/",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.ABSTRACTMAINNET,
    name: "Abstract",
    shortName: "Abstract",
    chain: ChainMap.ABSTRACTMAINNET,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/abstract.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.ABSTRACTMAINNET]] },
    },
    blockExplorers: {
      default: { name: "ETH", url: "https://abscan.org/" },
    },
    contracts: {
      multicall3: {
        address: "0xAa4De41dba0Ca5dCBb288b7cC6b708F3aaC759E7",
      },
    },
  },
  {
    id: NETWORKS.BERA,
    name: "Berachain Mainnet",
    shortName: "Berachain",
    chain: ChainMap.BERAMAINNET,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "BERA", symbol: "BERA", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/berachain.png"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.BERA]] },
    },
    blockExplorers: {
      default: { name: "BERA", url: "https://berascan.com/" },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        // blockCreated: 109269,
      },
    },
  },
  {
    id: NETWORKS.UNICHAIN,
    name: "Unichain Mainnet",
    shortName: "Unichain",
    chain: ChainMap.UNICHAIN,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/unichain.png"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.UNICHAIN]] },
    },
    blockExplorers: {
      default: {
        name: "ETH",
        url: "https://uniscan.xyz",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  // {
  //   id: NETWORKS.COTI,
  //   name: "COTI Mainnet",
  //   shortName: "COTI",
  //   chain: ChainMap.COTI,
  //   sellMarket: "https://element.market",
  //   nativeCurrency: { name: "COTI", symbol: "COTI", decimals: 18 },
  //   icon: "/img/chainLogos/coti.png",
  //   rpcUrls: {
  //     default: { http: [rpcs[NETWORKS.COTI]] },
  //   },
  //   blockExplorers: {
  //     default: {
  //       name: "COTI",
  //       url: "https://mainnet.cotiscan.io",
  //     },
  //   },
  // },
  {
    id: NETWORKS.ZORA,
    name: "Zora",
    shortName: "Zora",
    chain: ChainMap.GOLD,
    sellMarket: "https://element.market",
    icon: require("@/assets/images/icons/chainLogos/zora.png"),
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: [rpcs[NETWORKS.ZORA]],
        webSocket: ["wss://rpc.zora.energy"],
      },
    },
    blockExplorers: {
      default: {
        name: "Explorer",
        url: "https://explorer.zora.energy",
        apiUrl: "https://explorer.zora.energy/api",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.PLUMEMAINNET,
    name: "Plume Mainnet",
    shortName: "Plume",
    chain: ChainMap.PLUMEMAINNET,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/plume.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.PLUMEMAINNET]] },
    },
    blockExplorers: {
      default: {
        name: "ETH",
        url: "https://explorer.plumenetwork.xyz/",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.APE,
    name: "ApeChain",
    shortName: "Apechain",
    chain: ChainMap.APE,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "APE", symbol: "APE", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/ape.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.APE]] },
    },
    blockExplorers: {
      default: {
        name: "APE",
        url: "https://apechain.calderaexplorer.xyz/",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.HEMI,
    name: "Hemi Mainnet",
    shortName: "Hemi",
    chain: ChainMap.HEMI,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/hemi.png"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.HEMI]] },
    },
    blockExplorers: {
      default: {
        name: "ETH",
        url: "https://explorer.hemi.xyz",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.CZ,
    name: "BNB Smart Chain Mainnet",
    shortName: "BSC Mainnet",
    chain: ChainMap.CZ,
    sellMarket: "https://element.market/collections/zns-connect-bnb",
    nativeCurrency: {
      decimals: 18,
      name: "BNB",
      symbol: "BNB",
    },
    icon: require("@/assets/images/icons/chainLogos/bnbchain.png"),
    rpcUrls: {
      default: {
        http: [rpcs[NETWORKS.CZ]],
        webSocket: ["wss://bsc-rpc.publicnode.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "BscScan",
        url: "https://bscscan.com",
        apiUrl: "https://api.bscscan.com/api",
      },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 15921452,
      },
    },
  },
  {
    id: NETWORKS.BASE,
    name: "Base",
    shortName: "Base",
    chain: ChainMap.BASE,
    sellMarket: "https://element.market/collections/zns-connect-base",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/base.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.BASE]] },
    },
    blockExplorers: {
      default: {
        name: "ETH",
        url: "https://basescan.org/",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.SONICMAINNET,
    name: "Sonic Mainnet",
    shortName: "Sonic",
    chain: ChainMap.SONICMAINNET,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "S", symbol: "S", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/sonic.jpg"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.SONICMAINNET]] },
    },
    blockExplorers: {
      default: {
        name: "S",
        url: "https://sonicscan.org/",
      },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
  },
  {
    id: NETWORKS.SCROLL,
    name: "Scroll",
    shortName: "Scroll",
    chain: ChainMap.SCROLL,
    sellMarket: "https://element.market/collections/zns-connect-scroll",
    icon: require("@/assets/images/icons/chainLogos/scroll.png"),
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: [rpcs[NETWORKS.SCROLL]],
        webSocket: ["wss://wss-rpc.scroll.io/ws"],
      },
    },
    blockExplorers: {
      default: {
        name: "Scrollscan",
        url: "https://scrollscan.com",
        apiUrl: "https://api.scrollscan.com/api",
      },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 14,
      },
    },
  },
  {
    id: NETWORKS.BLAST,
    name: "Blast",
    shortName: "Blast",
    chain: ChainMap.BLAST,
    sellMarket: "https://element.market/collections/zns-connect-blast",
    icon: require("@/assets/images/icons/chainLogos/blast.jpeg"),
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.BLAST]] },
    },
    blockExplorers: {
      default: { name: "Blastscan", url: "https://blastscan.io" },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        blockCreated: 212929,
      },
    },
  },
  {
    id: NETWORKS.TAIKO,
    name: "Taiko Mainnet",
    shortName: "Taiko",
    chain: ChainMap.TAIKO,
    sellMarket: "https://element.market",
    icon: require("@/assets/images/icons/chainLogos/taiko.png"),
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: [rpcs[NETWORKS.TAIKO]],
      },
    },
    blockExplorers: {
      default: { name: "Taiko Mainnet", url: "https://taikoscan.io" },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        blockCreated: 11269,
      },
    },
  },
  {
    id: NETWORKS.POLY,
    name: "Polygon",
    shortName: "Polygon",
    chain: ChainMap.POLY,
    sellMarket: "https://element.market/collections/zns-connect-poly",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/polygon.png"),
    rpcUrls: {
      default: {
        http: [rpcs[NETWORKS.POLY]],
      },
    },
    blockExplorers: {
      default: {
        name: "PolygonScan",
        url: "https://polygonscan.com",
        apiUrl: "https://api.polygonscan.com/api",
      },
    },
    contracts: {
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 25770160,
      },
    },
  },
  {
    id: NETWORKS.CREATOR_CHAIN,
    name: "Creator Testnet",
    shortName: "Creator",
    chain: ChainMap.CREATOR_CHAIN,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/creatorchain.png"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.CREATOR_CHAIN]] },
    },
    blockExplorers: {
      default: { name: "ETH", url: "https://explorer.creatorchain.io" },
    },
    contracts: {
      multicall3: {
        address: "0x9062BfAdE2AA883361F02C87E831e0fcB15a833B",
      },
    },
    testnet: true,
  },
  {
    id: NETWORKS.MONAD,
    name: "Monad Testnet",
    shortName: "MONAD",
    chain: ChainMap.MONAD,
    sellMarket: "https://element.market",
    nativeCurrency: { name: "MON", symbol: "MON", decimals: 18 },
    icon: require("@/assets/images/icons/chainLogos/monad.png"),
    rpcUrls: {
      default: { http: [rpcs[NETWORKS.MONAD]] },
    },
    blockExplorers: {
      default: { name: "MON", url: "http://testnet.monadexplorer.com/" },
    },
    contracts: {
      multicall3: {
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      },
    },
    testnet: true,
  },
  // {
  //   id: NETWORKS.NEXUS,
  //   name: "Nexus Testnet",
  //   shortName: "Nexus",
  //   chain: ChainMap.NEXUS,
  //   sellMarket: "https://element.market",
  //   nativeCurrency: { name: "NEX", symbol: "NEX", decimals: 18 },
  //   icon: "/img/chainLogos/nexus.svg",
  //   rpcUrls: {
  //     default: { http: [rpcs[NETWORKS.NEXUS]] },
  //   },
  //   blockExplorers: {
  //     default: { name: "NEX", url: "https://explorer.nexus.xyz/" },
  //   },
  //   testnet: true,
  // },
  // {
  //   id: NETWORKS.TABI_V2,
  //   name: "Tabi Testnet V2",
  //   shortName: "Tabi",
  //   chain: ChainMap.TABI_V2,
  //   sellMarket: "https://element.market",
  //   nativeCurrency: { name: "Tabi", symbol: "TABI", decimals: 18 },
  //   icon: "/img/chainLogos/tabi.jpeg",
  //   rpcUrls: {
  //     default: { http: [rpcs[NETWORKS.TABI_V2]] },
  //   },
  //   blockExplorers: {
  //     default: { name: "Tabi", url: "https://testnetv2.tabiscan.com/" },
  //   },
  //   contracts: {
  //     multicall3: {
  //       address: "0x237B529ABD68C4b2DedCc644F9772b46007be441",
  //     },
  //   },
  //   testnet: true,
  // },
  // {
  //   id: NETWORKS.ATHENE,
  //   name: "Athene Parthenon",
  //   shortName: "Athene",
  //   chain: ChainMap.ATHENE,
  //   sellMarket: "https://element.market",
  //   nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
  //   icon: "/img/chainLogos/athene.jpg",
  //   rpcUrls: {
  //     default: { http: [rpcs[NETWORKS.ATHENE]] },
  //   },
  //   blockExplorers: {
  //     default: {
  //       name: "ETH",
  //       url: "https://athenescan.io/",
  //     },
  //   },
  //   contracts: {
  //     multicall3: {
  //       address: "0xcA11bde05977b3631167028862bE2a173976CA11",
  //     },
  //   },
  //   testnet: true,
  // },
  // {
  //   id: NETWORKS.XRPL,
  //   name: "XRPL EVM Sidechain Testnet",
  //   shortName: "XRPL",
  //   chain: ChainMap.XRPL,
  //   sellMarket: "https://element.market",
  //   nativeCurrency: { name: "XRP", symbol: "XRP", decimals: 18 },
  //   icon: "/img/chainLogos/xrp.jpeg",
  //   rpcUrls: {
  //     default: { http: [rpcs[NETWORKS.XRPL]] },
  //   },
  //   blockExplorers: {
  //     default: { name: "XRP", url: "https://explorer.testnet.xrplevm.org/" },
  //   },
  //   contracts: {
  //     multicall3: {
  //       address: "0x82Cc144D7d0AD4B1c27cb41420e82b82Ad6e9B31",
  //     },
  //   },
  //   testnet: true,
  // },
  // {
  //   id: NETWORKS.SAHARA,
  //   name: "SaharaAI Testnet",
  //   shortName: "SaharaAI",
  //   chain: ChainMap.SAHARA,
  //   sellMarket: "https://element.market",
  //   nativeCurrency: { name: "SAHARA", symbol: "SAHARA", decimals: 18 },
  //   icon: "/img/chainLogos/sahara.svg",
  //   rpcUrls: {
  //     default: { http: [rpcs[NETWORKS.SAHARA]] },
  //   },
  //   blockExplorers: {
  //     default: {
  //       name: "SAHARA",
  //       url: "https://testnet-explorer.saharalabs.ai/",
  //     },
  //   },
  //   testnet: true,
  // },
];

export const chains = CHAINS as unknown as [NETWORK_TYPE, ...NETWORK_TYPE[]];

export const CHAIN_IDS = chains.map((c) => c.id);

export const mainnets = chains.filter((c) => !c.testnet).map((c) => c.id);
export const testnets = chains.filter((c) => c.testnet).map((c) => c.id);

export const getChainByID = (id?: NETWORKS) =>
  CHAINS.find((chain) => chain.id === id) ?? CHAINS[0];
export const getChainByChain = (chain: PrismaChain) =>
  CHAINS.find((item) => item.chain === chain) ?? CHAINS[0];

export const getChainColor = (id: NETWORKS) => CHAIN_COLOR[id];
export const getChainIcon = (id: NETWORKS) =>
  CHAINS.find((chain) => chain.id === id)?.icon;
export const isChainSupported = (chainId: number) =>
  (CHAIN_IDS as number[]).includes(chainId);
