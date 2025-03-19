"use client";

import { useEffect, useState } from "react";
import Calendar from "../shared/Calendar";
import { colorDate, getCurrentTime } from "@/utils/schedule";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAtom } from "jotai";
import { scheduleStore } from "@/store/scheduleStore";
import { useResetAtom } from "jotai/utils";
import { cn } from "@/lib/utils";

type BasicInfoType = { fullDate: string; time: string; style: string };
const DEFAULT_BASIC_INFO: BasicInfoType = { fullDate: "", time: "", style: "" };

const ReservationFirstStep = () => {
  const [dateStore, setDate] = useAtom(scheduleStore);

  const [basicInfo, setBasicInfo] = useState<BasicInfoType>(DEFAULT_BASIC_INFO);

  const handleDateClick = (curDate: string) => {
    setDate({ ...dateStore, date: curDate });
    // setBasicInfo(prev => ({...prev, fullDate:curDate}))
  };

  return (
    <div>
      <h2>예약 신청하기 - 1</h2>
      <form>
        <Calendar
          dateFn={([date, day], i) => (
            <div
              key={`date_${date}`}
              className={cn("h-20 border", {
                "bg-gray-100": date === dateStore.date,
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
      </form>
    </div>
  );
};

export default ReservationFirstStep;
