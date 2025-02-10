"use client";

import { getOneMonth } from "@/utils/schedule";

type CalendarProps = {
  currentMonth: [number, number];
  dateFn: (
    value: [string, number],
    index: number,
    array: [string, number][]
  ) => JSX.Element;
  prevMonth: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  nextMonth: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Calendar = ({
  currentMonth,
  dateFn,
  prevMonth,
  nextMonth,
}: CalendarProps) => {
  const calendar = getOneMonth(currentMonth);

  return (
    <div className="mx-5 flex flex-col items-center">
      <div className="flex gap-3">
        <button onClick={prevMonth}>{"<"}</button>
        <p>
          {currentMonth[0]}.{("0" + currentMonth[1]).slice(-2)}
        </p>
        <button onClick={nextMonth}>{">"}</button>
      </div>
      <div className="w-full">
        {calendar.map((week, i) => (
          <div key={`week_${i}`} className="grid grid-cols-7">
            {week.map(dateFn)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
