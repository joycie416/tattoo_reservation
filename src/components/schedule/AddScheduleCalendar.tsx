"use client";

import { useAtom } from "jotai";
import Calendar from "@/components/shared/Calendar";
import { scheduleStore } from "@/store/scheduleStore";
import { useEffect, useState } from "react";
import AddScheduleDrawer from "./AddScheduleDrawer";

const AddScheduleCalendar = () => {
  const [dateStore, setDate] = useAtom(scheduleStore);
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

  useEffect(() => {
    // 다른 페이지(일정 추가 페이지)에서 뒤로가기로 넘어온 경우 기존에 클릭한 날짜 유지
    const curMonth = dateStore.date.split("-").map(Number);
    if (currentMonth[0] === curMonth[0] && currentMonth[1] === curMonth[1]) {
      return;
    }
    setDate({
      ...dateStore,
      date: `${currentMonth[0]}-${("0" + currentMonth[1]).slice(-2)}-01`,
    });
  }, [currentMonth]);

  useEffect(() => {
    // 맨 처음 렌더링 시 현재 달로 설정
    const curMonth = dateStore.date.split("-").map(Number);
    setCurrentMonth([curMonth[0], curMonth[1]]);
  }, []);

  return (
    <Calendar
      dateFn={([date, day], i) => (
        <AddScheduleDrawer
          dateInfo={[date, day]}
          dateIndex={i}
          key={`day_${day}`}
        />
      )}
    />
  );
};

export default AddScheduleCalendar;
