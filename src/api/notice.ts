import { Notice } from "@/types/supabase";
import { convertBlobToFile } from "@/utils/common";
import { getCurrentTime } from "@/utils/schedule";
import browserClient from "@/utils/supabase/client";

export type NoticeFormType = {
  title: string;
  image: File[];
  content: string;
  fixed: boolean;
  hidden: boolean;
  id?: string;
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
    .order("hidden")
    .order("fixed", { ascending: false }) // 고정 게시물 상단에 위치
    .order("modified_at", { ascending: false }); // 오래된 글 아래로

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
export const getSingleNotice = async (
  id: string
): Promise<[Notice, File[]]> => {
  const { data, error } = await browserClient
    .from("notice")
    .select()
    .eq("id", id);
  const { data: imgData, error: imgError } = await browserClient.storage
    .from("notice")
    .download(`${id}/0_${id}`);

  if (error || imgError) {
    throw new Error((error?.message ?? "") + (imgError?.message || ""));
  }

  const imgFile = convertBlobToFile(imgData, id);
  return [data[0], [imgFile]];
};

export const updateNotice = async (formData: Omit<NoticeFormType, "image">) => {
  const { data, error } = await browserClient
    .from("notice")
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

export const deleteNotice = async (id: string) => {
  const { error } = await browserClient.from("notice").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
  return null;
};

export const addNoticeImage = async (
  id: string,
  image: File[],
  upsert?: boolean
) => {
  const { error } = await browserClient.storage
    .from("notice")
    .upload(`${id}/0_${id}`, image[0], { upsert: !!upsert });
  if (error) {
    throw new Error(error.message);
  }
};

export const getNoticeImage = async (id: string) => {
  const { data, error } = await browserClient.storage
    .from("notice")
    .download(`${id}/0_${id}`);

  if (error) {
    throw new Error(error.message);
  }
  return convertBlobToFile(data, id);
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
