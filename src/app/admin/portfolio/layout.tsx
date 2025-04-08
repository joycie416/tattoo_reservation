import { getPortfolio } from "@/api/portfolio";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "enan.tt 포트폴리오",
  description: "enan.tt 포트폴리오",
  openGraph: {
    title: "enan.tt 포트폴리오",
    description: "enan.tt 포트폴리오",
  },
};

const layout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["portfolio"],
    queryFn: () => getPortfolio(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
