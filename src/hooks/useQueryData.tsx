import { Portfolio } from "@/types/supabase";
import { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<User>(["admin"]);
};

export const usePortfolio = (id?: string) => {
  const queryClient = useQueryClient();
  const portfolios = queryClient.getQueryData<Portfolio[]>(["portfolio"]);

  if (!id) return null;
  if (!portfolios) return null;
  return portfolios.find((portfolio) => portfolio.id === id) ?? null;
};
