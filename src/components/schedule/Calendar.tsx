"use client";

import { getCurrentTime, getOneMonth } from "@/utils/schedule";
import { useState } from "react";

type CalendarProps = {dateFn: (value: [string, number], index: number, array: [string, number][]) => JSX.Element};

const Calendar = ({dateFn}: CalendarProps) => {
  const today = getCurrentTime();
  const thisMonth = today[1].split("-").map(Number);
  const [currentMonth, setCurrentMonth] = useState<[number, number]>([
    thisMonth[0],
    thisMonth[1],
  ]);

  const calendar = getOneMonth(currentMonth);

  const nextMonth = () => {
    if (currentMonth[1] === 12) {
      setCurrentMonth(prev => [prev[0] + 1, 1]);
      return;
    }
    setCurrentMonth(prev => [prev[0], prev[1] + 1]);
  }

  const prevMonth = () => {
    if (currentMonth[1] === 1) {
      setCurrentMonth(prev => [prev[0] - 1, 12]);
      return;
    }
    setCurrentMonth(prev => [prev[0], prev[1] - 1]);
  }

  return (
    <div>
      <div>
        <button onClick={prevMonth}>prev</button>
        <p>
          {currentMonth[0]}.{('0'+currentMonth[1]).slice(-2)}
        </p>
        <button onClick={nextMonth}>next</button>
      </div>
      {calendar.map((week, i) => (
        <div key={`week_${i}`}
        className="grid grid-cols-7">
          {week.map(dateFn)}
          </div>

      ))}
    </div>
  );
};

export default Calendar;
