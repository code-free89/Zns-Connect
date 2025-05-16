import axios from "../axios";

export const uploadPhoto = async (
  asset: any,
  type: "banner" | "avatar",
  profileId: string
) => {
  try {
    const formData = new FormData();
    formData.append("photo", {
      uri: asset.uri,
      name: asset.fileName ?? asset.uri.split("/").pop(),
      type: asset.mimeType,
    } as any);
    formData.append("type", type);
    formData.append("userId", profileId);

    if (asset.exif) {
      formData.append("exif", JSON.stringify(asset.exif));
    }

    const response = await fetch("https://zns.bio/api/upload/photo", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    return await response.json();
  } catch (error: any) {
    throw error;
  }
};
