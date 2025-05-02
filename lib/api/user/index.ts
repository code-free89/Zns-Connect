import axios from "@/lib/api/axios";

export const getCurrentUser = async (address: string) => {
  try {
    const response = await axios.get("/user/lookup", { params: { address } });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

export const getOrCreateUserIdByAddress = async (walletAddress: string) => {
  try {
    const response = await axios.post("/user/id", { walletAddress });
    return response.data;
  } catch (error) {
    throw error;
  }
};
