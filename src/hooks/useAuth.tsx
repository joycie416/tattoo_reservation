import { getUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["admin"],
    queryFn: () => getUser(),
  });
};
