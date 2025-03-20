"use client";

import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { ReservationType } from "@/components/reservation/ReservationFirstStep";
import { cn } from "@/lib/utils";
import { Schedule } from "@/types/supabase";
import { useAtomValue } from "jotai";
import { reservationDateStore } from "@/store/reservationStore";

// const TIMES = {
//   "09:00": "오전 09:00",
//   "10:00": "오전 10:00",
//   "11:00": "오전 11:00",
//   "12:00": "오후 12:00",
//   "13:00": "오후 01:00",
//   "14:00": "오후 02:00",
//   "15:00": "오후 03:00",
//   "16:00": "오후 04:00",
//   "17:00": "오후 05:00",
//   "18:00": "오후 06:00",
//   "19:00": "오후 07:00",
//   "20:00": "오후 08:00",
//   "21:00": "오후 09:00",
// };

const TIMES = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
];

const TimeRadioGroup = ({
  schedules,
  setReservation,
}: {
  schedules: Map<string, Schedule[]>;
  setReservation: React.Dispatch<SetStateAction<ReservationType>>;
}) => {
  const [checkedTime, setCheckedTime] = useState("");
  const { date: curDate } = useAtomValue(reservationDateStore);

  const availableTimes = (schedules.get(curDate) ?? []).map(
    (schedule) => schedule.time
  );

  useEffect(() => {
    // 선택한 날짜가 바뀌면 선택 시간 초기화
    setCheckedTime("");
  }, [curDate]);

  const handleClick = (
    e: React.ChangeEvent<HTMLInputElement>,
    time: string
  ) => {
    const isAvailable = availableTimes.includes(time);

    if (isAvailable) {
      setReservation((prev) => ({ ...prev, time: e.target.value }));
      setCheckedTime(e.target.value);
    }
  };

  const itemStyle = (time: string) => {
    const isAvailable = availableTimes.includes(time);
    const isChecked = checkedTime === time;

    return cn(
      "py-2 bg-white border rounded-[5px] text-[14px] text-center tracking-[-0.025em]",
      {
        "border-font3 cursor-pointer": isAvailable,
        "border-backgound text-background": !isAvailable,
        "bg-font4 border-0 text-font3": isChecked,
      }
    );
  };

  return (
    <fieldset className="w-full">
      <div className="grid grid-cols-4 gap-2">
        {TIMES.map((time) => (
          // <label htmlFor={time} key={time}>
          //   <input
          //     value={time}
          //     type="radio"
          //     id={time}
          //     onChange={onItemClick}
          //     checked={checkedTime === time}
          //   />
          //   {time}
          // </label>
          <TimeRadioItem
            time={time}
            isChecked={checkedTime === time}
            onItemClick={(e) => handleClick(e, time)}
            key={time}
            className={itemStyle(time)}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default TimeRadioGroup;

const TimeRadioItem = ({
  time,
  isChecked,
  onItemClick,
  className,
}: {
  time: string;
  isChecked: boolean;
  onItemClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) => {
  const itemRef = useRef<HTMLLabelElement>(null);
  return (
    <label htmlFor={time} ref={itemRef} className={cn(className, {})}>
      <input
        value={time}
        type="radio"
        id={time}
        onChange={onItemClick}
        checked={isChecked}
        className="hidden"
      />
      {time}
    </label>
  );
};
