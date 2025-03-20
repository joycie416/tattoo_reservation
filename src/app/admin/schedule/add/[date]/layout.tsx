import { getSchedules } from "@/api/schedule";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const ScheduleAddLayout = async ({
  params,
  children,
}: PropsWithChildren<{ params: { date: string } }>) => {
  const queryClient = new QueryClient();
  const [year, month] = params.date.split("-");
  console.log("schedule add params:", params);

  await queryClient.prefetchQuery({
    queryKey: ["schedule", year, month],
    queryFn: () => getSchedules(year, month),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default ScheduleAddLayout;
