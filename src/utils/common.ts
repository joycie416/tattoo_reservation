import browserClient from "./supabase/client";

export const getPublicUrl = (bucket: string, id: string, index: number) => {
  return browserClient.storage.from(bucket).getPublicUrl(`${id}/${index}_${id}`)
    .data.publicUrl;
};
