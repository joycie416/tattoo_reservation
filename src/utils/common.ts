import browserClient from "./supabase/client";

export const getPublicUrl = (bucket: string, id: string, index: number) => {
  return browserClient.storage.from(bucket).getPublicUrl(`${id}/${index}_${id}`)
    .data.publicUrl;
};

export const convertBlobToFile = (blob: Blob, id: string) => {
  return new File([blob], `0_${id}${crypto.randomUUID()}`);
};
