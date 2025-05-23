import axios from "@/lib/api/axios";

// Read Only
export const fetchFollowersByDomain = async (domainIds: string[]) => {
  try {
    const { data } = await axios.post("/domain/followers", {
      domainIds,
    });
    return data.data;
  } catch (e: any) {
    return null;
  }
};

export const fetchFollowByDomainId = async (domainId: string) => {
  try {
    const { data } = await axios.get("/domain/followers", {
      params: {
        domainId,
      },
    });
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
    return null;
  }
};
