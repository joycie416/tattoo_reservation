import { getUser } from "@/api/auth";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const AdminProvider = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["admin"],
    queryFn: () => getUser(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default AdminProvider;
