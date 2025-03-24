import { getSchedules } from "@/api/schedule";
import { formatDate } from "@/utils/schedule";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Provider } from "jotai";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "enan.tt 예약 문의",
  description: "enan.tt 예약 문의 페이지입니다.",
  openGraph: {
    title: "enan.tt 예약 문의",
    description: "enan.tt 예약 문의 페이지입니다.",
  },
};

const ReservationAddLayout = async ({ children }: { children: ReactNode }) => {
  const today = new Date();
  const [year, month] = formatDate(today).split("-");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["schedule", year, month],
    queryFn: () => getSchedules(year, month),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Provider>{children}</Provider>
    </HydrationBoundary>
  );
};

export default ReservationAddLayout;
