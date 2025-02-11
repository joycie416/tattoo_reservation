import CalendarContainer from "@/components/schedule/CalendarContainer";
import Link from "next/link";

const SchedulePage = () => {
  return (
    <div>
      <Link href="/admin/schedule/add">일정 추가</Link>
      <h3>일정표</h3>
      <CalendarContainer />
    </div>
  );
};

export default SchedulePage;
