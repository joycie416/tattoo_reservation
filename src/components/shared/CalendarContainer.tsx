"use client";

import { useAtom } from "jotai";
import Calendar from "./Calendar";
import { scheduleStore } from "@/store/dateStore";
import { useEffect } from "react";
import { useResetAtom } from "jotai/utils";

const CalendarContainer = () => {
  const [date, setDate] = useAtom(scheduleStore);
  const resetDate = useResetAtom(scheduleStore);

  useEffect(() => {
    resetDate();
  }, []);

  const colorDate = (currentDate: string, i: number) => {
    const month = currentDate.split("-")[1];
    const currentMonth = date.date.split("-")[1];
    if (month !== currentMonth) return "text-gray-100";
    if (i === 0) return "text-red-500";
    if (i === 6) return "text-blue-500";
    return "";
  };

  const handleClick = (curDate: string) => {
    setDate({ ...date, date: curDate });
  };

  return (
    <Calendar
      dateFn={([date, day], i) => (
        <div
          key={`day_${day}`}
          className="h-20 border"
          onClick={() => handleClick(date)}
        >
          <p className={`${colorDate(date, i)}`}>{day}</p>
        </div>
      )}
      // handlePrevMonth={prevMonth}
      // handleNextMonth={nextMonth}
      // currentMonth={currentMonth}
    />
  );
};

export default CalendarContainer;
