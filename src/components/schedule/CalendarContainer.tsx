"use client";

import { useAtom } from "jotai";
import Calendar from "./Calendar";
import { scheduleStore } from "@/store/scheduleStore";
import { useEffect, useState } from "react";
import { getCurrentTime } from "@/utils/schedule";
import { useResetAtom } from "jotai/utils";

const CalendarContainer = () => {
  const [date, setDate] = useAtom(scheduleStore);
  const resetDate = useResetAtom(scheduleStore);
  const [currentMonth, setCurrentMonth] = useState<[number, number]>(() => {
    // 게으른 초기화 : 첫 렌더링 시에만 실행
    const today = getCurrentTime()[1];
    // const { date: curDate } = date;
    // if (curDate !== today) {
    //   const curMonth = curDate.split("-").map(Number);
    //   return [curMonth[0], curMonth[1]];
    // }
    const curMonth = today.split("-").map(Number);
    return [curMonth[0], curMonth[1]];
  });

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
    setDate({...date, date:curDate });
  };

  const nextMonth = () => {
    if (currentMonth[1] === 12) {
      setCurrentMonth((prev) => {
        return [prev[0] + 1, 1];
      });
      return;
    }
    setCurrentMonth((prev) => {
      return [prev[0], prev[1] + 1];
    });
  };

  const prevMonth = () => {
    if (currentMonth[1] === 1) {
      setCurrentMonth((prev) => {
        // setDate({ date: `${prev[0] - 1}-12-01` });

        return [prev[0] - 1, 12];
      });
      return;
    }
    setCurrentMonth((prev) => {
      // setDate({ date: `${prev[0]}-${("0" + (prev[1] - 1)).slice(-2)}-01` });

      return [prev[0], prev[1] - 1];
    });
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
      prevMonth={prevMonth}
      nextMonth={nextMonth}
      currentMonth={currentMonth}
    />
  );
};

export default CalendarContainer;
