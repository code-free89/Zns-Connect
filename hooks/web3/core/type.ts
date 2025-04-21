import { NETWORKS } from "@/constants/web3/chains";
import { CONTRACTS } from "@/constants/web3/contracts";

export type UseContractType = {
  contract: CONTRACTS;
  functionName: string;
  args?: any;
  chainId?: NETWORKS;
  value?: any;
};

// export type UseContractHIPType = {
//   contract: CONTRACTS_HIP;
//   functionName: string;
//   args?: any;
//   chainId?: NETWORKS;
//   value?: any;
// };

// export type UseContractNFTType = {
//   contract: CONTRACTS_NFT;
//   functionName: string;
//   args?: any;
// };
