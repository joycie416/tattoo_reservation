import AddScheduleForm from "@/components/schedule/AddScheduleForm";
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

const AddPage = ({ params }: AddPageParams) => {
  return (
    <div className="container">
      AddPage {params.date}
      <AddScheduleForm date={params.date} />
    </div>
  );
};

export default AddPage;
