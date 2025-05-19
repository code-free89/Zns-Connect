import axios from "@/lib/api/axios";

export const followDomain = async (
  domainId: string,
  userPDomainId: string,
  isOwner: boolean
) => {
  try {
    const { data: updateResponse } = await axios.post("/domain/follow", {
      domainId,
      userPDomainId,
      isOwner,
    });
    return updateResponse;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const updateProfile = (profileId: string, address: string, data: any) =>
  axios.post("/domain/update", {
    profileId,
    data,
    address,
  });
