import { getFullNotice } from "@/api/notice";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "enan.tt 소식·이벤트",
  description: "enan.tt 소식과 이벤트 확인하기",
  openGraph: {
    title: "enan.tt 소식·이벤트",
    description: "enan.tt 소식과 이벤트 확인하기",
  },
};

const layout = async ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notice"],
    queryFn: () => getFullNotice(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default layout;
