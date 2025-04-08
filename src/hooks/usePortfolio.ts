import {
  addPortfolio,
  addPortfolioImage,
  deletePortfolio,
  getPortfolio,
  PortfolioFormType,
  updateFixedHidden,
  updatePortfolio,
} from "@/api/portfolio";
import { Portfolio } from "@/types/supabase";
import browserClient from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useGetPortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(),
    staleTime: Infinity,
  });
};

export const useAddPortfolio = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: PortfolioFormType) => {
      const { image, ...portfolioData } = formData;
      const id = await addPortfolio(portfolioData);

      if (!!id) {
        try {
          await addPortfolioImage(id, image);
          return id;
        } catch {
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          await browserClient.from("portfolio").delete().eq("id", id);
        }
      } else {
        alert("포트폴리오 등록에 실패했습니다. 다시 시도해주세요.");
      }
    },
    onSuccess: (id) => {
      router.push(`/portfolio/${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["portfolio"],
      });
    },
  });
};

export const useUpdatePortfolio = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: PortfolioFormType) => {
      const { image, ...portfolioData } = formData;
      const id = await updatePortfolio(portfolioData);

      if (!!id) {
        try {
          await addPortfolioImage(id, image, true);
          return id;
        } catch {
          alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
          await browserClient.from("portfolio").delete().eq("id", id);
        }
      }
    },
    onSuccess: (id) => {
      router.push(`/portfolio/${id}`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
};

export const useDeleteNotice = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) => deletePortfolio(id),
    onSuccess: () => {
      router.push("/portfolio");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
};

export const useUpdateFixedHidden = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData: { id: string; fixed: boolean; hidden: boolean }) =>
      updateFixedHidden(updateData),
    onMutate: async (updateData: {
      id: string;
      fixed: boolean;
      hidden: boolean;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["portfolio"] });
      const prevPortfolios =
        queryClient.getQueryData<Portfolio[]>(["portfolio"]) ?? [];
      const newPortfolioIndex = prevPortfolios.findIndex(
        (data) => data.id === updateData.id
      );

      if (newPortfolioIndex > -1) {
        const newPortfolio = prevPortfolios[newPortfolioIndex];
        newPortfolio.fixed = !!updateData.fixed;
        newPortfolio.hidden = !!updateData.hidden;

        queryClient.setQueryData<Portfolio[]>(
          ["portfolio"],
          prevPortfolios.splice(newPortfolioIndex, 1, newPortfolio)
        );
      }
      return { prevPortfolios };
    },
    onError: (_, __, context) => {
      if (context?.prevPortfolios) {
        queryClient.setQueryData<Portfolio[]>(
          ["portfolio"],
          context.prevPortfolios
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
};
