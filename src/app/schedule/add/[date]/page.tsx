import AddScheduleForm from "@/components/schedule/AddScheduleForm";
import { Metadata } from "next";

export const generateMetadata = ({
  params,
}: {
  params: { date: string };
}):Metadata => {
  return {
    title: `${params.date} 일정 추가`,
  };
}

type AddPageParams = {params: {date: string}}

const AddPage = ({params}: AddPageParams) => {
  return <div>AddPage {params.date}
  
  <AddScheduleForm />
  </div>;
};

export default AddPage;
