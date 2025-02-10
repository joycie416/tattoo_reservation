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

const AddPage = () => {
  return <div>AddPage</div>;
};

export default AddPage;
