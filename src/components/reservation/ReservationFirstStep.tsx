"use client";

import Calendar from "../shared/Calendar";
import { colorDate, sortSchedule } from "@/utils/schedule";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { useGetSchedule } from "@/hooks/useSchedule";
import { useRef, useState } from "react";
import TimeRadioGroup from "../shared/TimeRadioGroup";
import { reservationDateStore } from "@/store/reservationStore";

export type ReservationType = {
  fullDate: string;
  time: string;
  style: string;
  description: string;
  photos: File[];
};
const DEFAULT_RESERVATION: ReservationType = {
  fullDate: "",
  time: "",
  style: "",
  description: "",
  photos: [],
};

const ReservationFirstStep = () => {
  const [dateStore, setDate] = useAtom(reservationDateStore);
  const [curYear, curMonth] = dateStore.date.split("-");

  const { data: scheduleDate } = useGetSchedule(curYear, curMonth);
  const [, sortedSchedule] = sortSchedule(scheduleDate ?? []);

  const [, setReservation] = useState<ReservationType>(DEFAULT_RESERVATION);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextarea = () => {
    // textarea 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const handleDateClick = (curDate: string) => {
    setDate({ ...dateStore, date: curDate });
    // setBasicInfo(prev => ({...prev, fullDate:curDate}))
  };

  return (
    <div>
      <div>
        <h3>원하는 날자를 선택해주세요</h3>
        <p className="text-xs">* 작업자의 일정에 따라 변경될 수 있습니다</p>
      </div>
      <form>
        <Calendar
          dateFn={([date, day], i) => (
            <div
              key={`date_${date}`}
              className={cn("h-20 border", {
                "bg-gray-100": date === dateStore.date,
                "border-gray-500": sortedSchedule.has(date),
              })}
              onClick={(e) => {
                e.preventDefault();
                handleDateClick(date);
              }}
            >
              <p className={`${colorDate(date, dateStore.date, i)}`}>{day}</p>
            </div>
          )}
        />
        <hr className="my-4" />
        <div>
          <h3>원하는 시간을 선택해주세요</h3>
          <p className="text-xs">* 작업자의 일정에 따라 변경될 수 있습니다</p>
        </div>
        <TimeRadioGroup
          schedules={sortedSchedule}
          setReservation={setReservation}
        />
        <hr className="my-4" />
        <div>
          <h3>문의사항을 입력해주세요</h3>
          <p className="text-xs">* 상세하게~</p>
        </div>
        <div className="h-fit p-0 m-0 flex border border-background">
          <textarea
            className="w-full min-h-[250px] resize-none focus:outline-none"
            ref={textareaRef}
            onInput={() => resizeTextarea()}
          />
        </div>
        <hr className="my-4" />
      </form>
    </div>
  );
};

export default ReservationFirstStep;
