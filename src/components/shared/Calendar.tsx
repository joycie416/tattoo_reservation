"use client";

import useConditionalDateAtom from "@/hooks/useConditionalDateAtom";
import { getOneMonth } from "@/utils/schedule";
import { useEffect, useState } from "react";

type CalendarProps = {
  // currentMonth: [number, number];
  dateFn: (
    value: [string, number],
    index: number,
    array: [string, number][]
  ) => JSX.Element;
  handlePrevMonth?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  handleNextMonth?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const Calendar = ({
  // currentMonth,
  dateFn,
  handlePrevMonth = () => {},
  handleNextMonth = () => {},
}: CalendarProps) => {
  const [dateStore, setDate] = useConditionalDateAtom();
  const [currentMonth, setCurrentMonth] = useState<[number, number]>(() => {
    // 게으른 초기화 : 첫 렌더링 시에만 실행
    // const today = getCurrentTime()[1];
    const { date: curDate, today } = dateStore;
    if (curDate !== today) {
      const curMonth = curDate.split("-").map(Number);
      return [curMonth[0], curMonth[1]];
    }
    const curMonth = today.split("-").map(Number);
    return [curMonth[0], curMonth[1]];
  });

  const calendar = getOneMonth(currentMonth);

  useEffect(() => {
    // 이전/다음 달 버튼 클릭시 렌더링 경고 해결 위함
    const { date: curDate, today } = dateStore;
    const curMonth = `${currentMonth[0]}-${("0" + currentMonth[1]).slice(-2)}`;

    if (curMonth === curDate.slice(0, 7)) {
      // 이번달이 됐으면 오늘로 설정
      setDate({
        ...dateStore,
        date: today,
      });
      return;
    }
    setDate({
      ...dateStore,
      date: `${currentMonth[0]}-${("0" + currentMonth[1]).slice(-2)}-01`,
    });
  }, [currentMonth]);

  const nextMonth = () => {
    if (currentMonth[1] === 12) {
      setCurrentMonth((prev) => {
        // setDate({ ...dateStore, date: `${prev[0] + 1}-01-01` });
        return [prev[0] + 1, 1];
      });
      return;
    }
    setCurrentMonth((prev) => {
      // setDate({
      //   ...dateStore,
      //   date: `${prev[0]}-${("0" + (prev[1] + 1)).slice(-2)}-01`,
      // });
      return [prev[0], prev[1] + 1];
    });
  };

  const prevMonth = () => {
    if (currentMonth[1] === 1) {
      setCurrentMonth((prev) => {
        // setDate({ ...dateStore, date: `${prev[0] - 1}-12-01` });

        return [prev[0] - 1, 12];
      });
      return;
    }
    setCurrentMonth((prev) => {
      // setDate({
      //   ...dateStore,
      //   date: `${prev[0]}-${("0" + (prev[1] - 1)).slice(-2)}-01`,
      // });

      return [prev[0], prev[1] - 1];
    });
  };

  const onPrevMonthClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    prevMonth();
    handlePrevMonth();
  };

  const onNextMonthClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    nextMonth();
    handleNextMonth();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3">
        <button onClick={onPrevMonthClick}>{"<"}</button>
        <p>
          {currentMonth[0]}.{("0" + currentMonth[1]).slice(-2)}
        </p>
        <button onClick={onNextMonthClick}>{">"}</button>
      </div>
      <div className="w-full bg-white">
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
