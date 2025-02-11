import { getSchedules } from "@/api/schedule";
import AddScheduleForm from "@/components/schedule/AddScheduleForm";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { date: string };
}): Metadata => {
  return {
    title: `${params.date} 일정 추가`,
  };
};

type AddPageParams = { params: { date: string } };

const AddPage = async ({ params }: AddPageParams) => {
  const queryClient = new QueryClient();
  const [year, month] = params.date.split("-");

  await queryClient.prefetchQuery({
    queryKey: ["schedule", year, month],
    queryFn: () => getSchedules(year, month),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        AddPage {params.date}
        <AddScheduleForm date={params.date}/>
      </div>
    </HydrationBoundary>
  );
};

export default AddPage;
