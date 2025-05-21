import axios from "@/lib/api/axios";

export type HIP = {
  id: string;
  walletAddress: string;
  mainImgUrl: string | null;
  name: string | null;
  bio: string | null;
  position: string | null;
  totalEarnings: number;
  totalPoints: number;
  referralPoints: number;
  domainPoints: number;
  nftPoints: number;
  twitter: string | null;
  telegram: string | null;
  linkedin: string | null;
  discord: string | null;
  wrapcast: string | null;
  twitterVerified: boolean;
  telegramVerified: boolean;
  linkedinVerified: boolean;
  discordVerified: boolean;
  wrapcastVerified: boolean;
};

export const getAllHIPs = async () => {
  try {
    const { data } = await axios.get("/hip");
    return data.data;
  } catch (e: any) {
    return null;
  }
};

export const getHIPByAddress = async (address: string) => {
  try {
    const { data } = await axios.get(`/hip/address?address=${address}`);
    return data.data;
  } catch (e: any) {
    return null;
  }
};

export const mintHIP = async (walletAddress: string) => {
  // Create HIP entry first with initial points
  try {
    const { data } = await axios.post("/hip/mint", { walletAddress });
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
    return null;
  }
};

export const updateHIPReferral = async (refer: string, mintPrice: bigint) => {
  // First find the referral item to get its ID
  try {
    const { data } = await axios.put("/hip/referral", { refer, mintPrice });
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
    return null;
  }
};

export const updateHIPProfile = (
  id: string,
  name: string,
  bio: string,
  position: string
) =>
  axios.put("/hip/profile", {
    id,
    name,
    bio,
    position,
  });

export const updateHIP = async (id: string, data: Partial<HIP>) =>
  axios.put("/hip", {
    id,
    ...data,
  });
