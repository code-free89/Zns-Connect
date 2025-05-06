import { NETWORKS } from "@/constants/web3/chains";
import axios from "@/lib/api/axios";
import { DomainInfoType } from "@/store/slices/profile";

export type DomainType = {
  domainName: string;
  chainId: NETWORKS;
};

export const fetchRecentMintedDomain = async () => {
  try {
    const { data } = await axios.get("/recent-minted-domains");
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const createDomain = async (domains: DomainType[]) => {
  try {
    const { data } = await axios.post("/domain/create", { domains });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const fetchDomain = async (
  data: DomainType,
  domainInfo?: DomainInfoType
) => {
  try {
    const { data: responseData } = await axios.post("/domain/fetch", {
      domain: data,
      domainInfo,
    });
    return responseData;
  } catch (e) {
    return null;
  }
};
