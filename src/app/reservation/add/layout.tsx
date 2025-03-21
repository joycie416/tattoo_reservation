import { getSchedules } from "@/api/schedule";
import PageHeader from "@/components/shared/PageHeader";
import { formatDate } from "@/utils/schedule";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Provider } from "jotai";
import { ReactNode } from "react";

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
      <Provider>
        <PageHeader title="예약 문의" backTo="/reservation" />
        {children}
      </Provider>
    </HydrationBoundary>
  );
};

export default ReservationAddLayout;
