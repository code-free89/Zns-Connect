import axios from "../axios";

export const claimBadge = async (userId: string, badge: string) => {
  try {
    const { data } = await axios.post("/user/badge", { userId, badge });
    return data.user;
  } catch (error) {
    throw error;
  }
};
