import { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<User>(["admin"]);
};
