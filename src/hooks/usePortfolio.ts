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
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateData: {
      mode: "fixed" | "hidden";
      initialChecked: string[];
      checkedPortfolios: string[];
    }) => updateFixedHidden(updateData),
    onMutate: async ({}: // mode,
    // initialChecked,
    // checkedPortfolios,
    {
      mode: "fixed" | "hidden";
      initialChecked: string[];
      checkedPortfolios: string[];
    }) => {
      await queryClient.cancelQueries({ queryKey: ["portfolio"] });
      const prevPortfolios =
        queryClient.getQueryData<Portfolio[]>(["portfolio"]) ?? [];

      // const newChecks = checkedPortfolios.filter(
      //   (id) => !initialChecked.includes(id)
      // );
      // const removeChecks = initialChecked.filter(
      //   (id) => !checkedPortfolios.includes(id)
      // );

      // const newPortfolios = prevPortfolios.map((portfolio) => {
      //   if (newChecks.includes(portfolio.id))
      //     return mode === "fixed"
      //       ? { ...portfolio, fixed: true }
      //       : { ...portfolio, hidden: true };
      //   if (removeChecks.includes(portfolio.id))
      //     return mode === "fixed"
      //       ? { ...portfolio, fixed: false }
      //       : { ...portfolio, hidden: false };
      //   return portfolio;
      // });

      // queryClient.setQueryData<Portfolio[]>(["portfolio"], newPortfolios);

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
    onSuccess: () => router.refresh(),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });
};
