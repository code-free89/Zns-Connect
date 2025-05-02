import { NETWORKS } from "@/constants/web3/chains";
import axios from "@/lib/api/axios";

export const updateRefer = async (refer: string, chainId: NETWORKS) => {
  try {
    const { data } = await axios.post("/referral", { refer, chainId });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const getReferrals = async (chainId: NETWORKS, address?: string) => {
  try {
    const { data } = await axios.get("/referral", {
      params: { chainId, address },
    });
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};
