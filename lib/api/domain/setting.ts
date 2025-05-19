import axios from "@/lib/api/axios";

export const burnDomain = (
  domainId: string,
  chainId: number,
  address: string
) =>
  axios.post("/domain/burn", {
    dId: domainId,
    chainId,
    address,
  });
