import { chains } from "@/components/zns/web3modal/common";
import { NETWORKS } from "@/constants/web3/chains";
import { PublicClient, createPublicClient, http } from "viem";

export type CreatePublicClientParams = {
  transportSignal?: AbortSignal;
};

export function createViemPublicClients() {
  return chains.reduce((prev, cur) => {
    return {
      ...prev,
      [cur.id]: createPublicClient({
        chain: cur,
        transport: http(),
        batch: {
          multicall: {
            batchSize: 1024 * 200,
            wait: 16,
          },
        },
        pollingInterval: 6_000,
      }),
    };
  }, {} as Record<NETWORKS, PublicClient>);
}

export const viemClients = createViemPublicClients();

export const getViemClients = createViemPublicClientGetter({ viemClients });

type CreateViemPublicClientGetterParams = {
  viemClients?: Record<NETWORKS, PublicClient>;
} & CreatePublicClientParams;

export function createViemPublicClientGetter({
  viemClients: viemClientsOverride,
}: CreateViemPublicClientGetterParams = {}) {
  const clients = viemClientsOverride || createViemPublicClients();

  return function getClients({
    chainId,
  }: {
    chainId?: NETWORKS;
  }): PublicClient {
    return clients[chainId as NETWORKS];
  };
}

export const CLIENT_CONFIG = {
  batch: {
    multicall: {
      batchSize: 1024 * 200,
      wait: 16,
    },
  },
  pollingInterval: 6_000,
};

export const publicClient = (chainId: NETWORKS = NETWORKS.DEFAULT) => {
  if (chainId && viemClients[chainId]) {
    return viemClients[chainId];
  }

  const chain = chains.find((c) => c.id === chainId);
  return createPublicClient({
    chain,
    transport: http(),
    ...CLIENT_CONFIG,
  });
};
