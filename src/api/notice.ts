import { Notice } from "@/types/supabase";
import { getCurrentTime } from "@/utils/schedule";
import browserClient from "@/utils/supabase/client";

export type NoticeFormType = {
  title: string;
  image: File[];
  content: string;
  fixed: boolean;
  hidden: boolean;
  id?: boolean;
};

export const addNotice = async ({
  title,
  content,
  fixed,
  hidden,
}: Omit<NoticeFormType, "image">) => {
  const { data, error } = await browserClient
    .from("notice")
    .insert({ title, content, fixed, hidden })
    .select();
  if (error) {
    throw new Error(error.message);
  }
  const id = data[0].id;
  return id;
};

export const getFullNotice = async () => {
  const { data, error } = await browserClient
    .from("notice")
    .select()
    .order("fixed")
    .order("modified_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const getSingleNotice = async (id: string) => {
  const { data, error } = await browserClient
    .from("notice")
    .select()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const updateNotice = async (formData: Partial<Notice>) => {
  const { error } = await browserClient
    .from("notice")
    .update({
      ...formData,
      modified_at: getCurrentTime()[0],
    })
    .eq("id", formData.id!);

  if (error) {
    throw new Error(error.message);
  }
  return null;
};

export const addNoticeImage = async (id: string, image: File[]) => {
  const { error } = await browserClient.storage
    .from("notice")
    .upload(`${id}/0_${id}`, image[0]);
  if (error) {
    throw new Error(error.message);
  }
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
    .from("notice")
    .update({ fixed, hidden })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return null;
};
