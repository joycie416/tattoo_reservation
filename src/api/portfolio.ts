import { convertBlobToFile } from "@/utils/common";
import { getCurrentTime } from "@/utils/schedule";
import browserClient from "@/utils/supabase/client";

export type PortfolioFormType = {
  image: File[];
  content: string;
  part: string;
  size: string;
  fixed: boolean;
  hidden: boolean;
  id?: string;
};

export const addPortfolio = async (
  formData: Omit<PortfolioFormType, "image" | "id">
) => {
  const { data, error } = await browserClient
    .from("portfolio")
    .insert(formData)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  const id = data[0].id;
  return id;
};

export const addPortfolioImage = async (
  id: string,
  image: File[],
  upsert?: boolean
) => {
  const { error } = await browserClient.storage
    .from("portfolio")
    .upload(`${id}/0_${id}`, image[0], { upsert: !!upsert });
  if (error) {
    throw new Error(error.message);
  }
};

export const getPortfolio = async () => {
  const { data, error } = await browserClient
    .from("portfolio")
    .select()
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getPortfolioImage = async (id: string) => {
  const { data, error } = await browserClient.storage
    .from("portfolio")
    .download(`${id}/0_${id}`);

  if (error) {
    throw new Error(error.message);
  }
  return convertBlobToFile(data, id);
};

export const updatePortfolio = async (
  formData: Omit<PortfolioFormType, "image">
) => {
  const { data, error } = await browserClient
    .from("portfolio")
    .update({
      ...formData,
      modified_at: getCurrentTime()[0],
    })
    .eq("id", formData.id!)
    .select();

  if (error) {
    throw new Error(error.message);
  }
  return data[0].id;
};

export const updateFixedHidden = async ({
  id,
  fixed,
  hidden,
}: {
  id: string;
  fixed: boolean;
  hidden: boolean;
}) => {
  const { error } = await browserClient
    .from("portfolio")
    .update({ fixed, hidden })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return null;
};

export const deletePortfolio = async (id: string) => {
  const { error } = await browserClient.from("portfolio").delete().eq("id", id);
  const { error: imgError } = await browserClient.storage
    .from("portfolio")
    .remove([`${id}/0_${id}`]);

  if (error || imgError) {
    throw new Error((error?.message ?? "") + (imgError?.message || ""));
  }
  return null;
};
