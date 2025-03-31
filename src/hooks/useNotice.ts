import {
  addNotice,
  addNoticeImage,
  getFullNotice,
  getSingleNotice,
  NoticeFormType,
  updateFixedHidden,
} from "@/api/notice";
import { Notice } from "@/types/supabase";
import browserClient from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetFullNotice = () => {
  return useQuery({
    queryKey: ["notice"],
    queryFn: () => getFullNotice(),
    staleTime: Infinity,
  });
};

export const useGetSingleNotice = (id: string) => {
  return useQuery({
    queryKey: ["notice", id],
    queryFn: () => getSingleNotice(id),
    staleTime: Infinity,
    enabled: !!id,
  });
};

export const useAddNotice = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: NoticeFormType) => {
      const { image, ...noticeData } = formData;
      const id = await addNotice(noticeData);

      if (!!id) {
        try {
          await addNoticeImage(id, image);
          return id;
        } catch {
          await browserClient.from("notice").delete().eq("id", id);
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        }
      }
    },
    onSuccess: (id) => {
      router.push(`/notice?id=${id}`);
    },
    onSettled: (id) => {
      queryClient.invalidateQueries({
        queryKey: ["notice", id],
      });
    },
  });
};

export const useUpdateFixed = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData: { id: string; fixed: boolean; hidden: boolean }) =>
      updateFixedHidden(updateData),
    onMutate: async (updateData: {
      id: string;
      fixed: boolean;
      hidden: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["notice"] });
      const prevNotices = queryClient.getQueryData<Notice[]>(["notice"]) ?? [];
      const newtNoticeIndex = prevNotices.findIndex(
        (data) => data.id === updateData.id
      );

      if (newtNoticeIndex > -1) {
        const newNotice = prevNotices[newtNoticeIndex];
        newNotice.fixed = !!updateData.fixed;
        newNotice.hidden = !!updateData.hidden;

        queryClient.setQueryData<Notice[]>(
          ["notice"],
          prevNotices.splice(newtNoticeIndex, 1, newNotice)
        );
      }
      return { prevNotices };
    },
    onError: (_, __, context) => {
      if (context?.prevNotices) {
        queryClient.setQueryData<Notice[]>(["notice"], context.prevNotices);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notice"] });
    },
  });
};
