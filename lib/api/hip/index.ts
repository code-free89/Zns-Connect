import axios from "@/lib/api/axios";

export const getAllHIPs = async () => {
  try {
    const { data } = await axios.get("/hip");
    return data.data;
  } catch (e) {
    console.error("hipAll", e);
    return null;
  }
};

export const getHIPByAddress = async (address: string) => {
  try {
    const { data } = await axios.get(`/hip/address?address=${address}`);
    return data.data;
  } catch (e) {
    console.error("hip", e);
    return null;
  }
};
