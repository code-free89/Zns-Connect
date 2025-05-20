import axios from "@/lib/api/axios";

export const fetchDomainCategories = async () => {
  try {
    const { data } = await axios.get("/domain/category");
    return data.data;
  } catch (e: any) {
    console.error(e.response.data);
    return null;
  }
};

export const updateDomainCategories = async (data: {
  [prop: string]: number;
}) => {
  try {
    const { data: updateResponse } = await axios.post("/domain/category", data);
    return updateResponse;
  } catch (e: any) {
    console.error(e.response.data);
    return null;
  }
};
