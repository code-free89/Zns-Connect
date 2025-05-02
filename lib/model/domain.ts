import { NETWORKS } from "@/constants/web3/chains";
import { UserConfigStoreType } from "@/store/slices/user";

export interface Domain {
  domainName: string;
  chainId: NETWORKS;
  useChainColor?: boolean;
  rowIndex?: number;
}

export type TLD = {
  chainId: NETWORKS;
  label: string;
  tld: string;
};

export type RegisterDomainType = {
  owner: string;
  domainName: string;
  lengthOfDomain: number;
  expirationDate: string;
};

export type UserDomainConfigType = {
  allOwnedDomains: bigint[];
  numberOfReferrals: bigint;
  primaryDomain: bigint;
  totalEarnings: bigint;
};

export interface CartedDomain extends Domain {
  year: number;
  isCategory?: boolean;
  categoryKey?: string;
}

export interface FavouritedDomain extends Domain {}

export function convertUserDomainConfig(config: {
  allOwnedDomains: bigint[];
  numberOfReferrals: bigint;
  primaryDomain: bigint;
  totalEarnings: bigint;
}): UserConfigStoreType {
  return {
    allOwnedDomains: config.allOwnedDomains.map((domain) => domain.toString()),
    numberOfReferrals: config.numberOfReferrals.toString(),
    primaryDomain: config.primaryDomain.toString(),
    totalEarnings: config.totalEarnings.toString(),
  };
}

// export type ProfileAccountsType = Partial<
//   Pick<
//     PrismaDomain,
//     | "wrapcast"
//     | "twitter"
//     | "discord"
//     | "linkedin"
//     | "telegram"
//     | "website"
//     | "application"
//     | "medium"
//     | "mirror"
//   >
// >;

export type AvailableDomainType = {
  chain: number;
  color: string;
  domain: string;
  icon: number;
  id: string;
  label: string;
  status: boolean;
  tld: string;
};
