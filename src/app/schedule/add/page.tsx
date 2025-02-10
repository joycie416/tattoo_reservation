import AddScheduleCalendar from "@/components/schedule/AddScheduleCalendar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '일정 추가'
}

const AddSchedulePage = () => {
  return (
    <div>
      <h1>AddSchedulePage</h1>
      <AddScheduleCalendar />
    </div>
  );
};

export default AddSchedulePage;
