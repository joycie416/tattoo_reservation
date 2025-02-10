"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { scheduleStore } from "@/store/scheduleStore";
import { colorDate } from "@/utils/schedule";
import { useAtom } from "jotai";
import Link from "next/link";

type AddScheuleDrawerProps = { dateInfo: [string, number]; dateIndex: number };

const AddScheduleDrawer = ({ dateInfo, dateIndex }: AddScheuleDrawerProps) => {
  const [currentDate, day] = dateInfo;
  const [date, setDate] = useAtom(scheduleStore);

  const currentMonth = currentDate.split("-")[1];
  const month = date.date.split("-")[1];

  const isValidMonth = currentMonth === month;
  const isToday = currentDate === date.date

  const onClick = () => {
  console.log('isValidMonth:', isValidMonth);

    if (isValidMonth) {
      console.log("clicked:", currentDate);
      setDate({...date, date: currentDate });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild disabled={!isValidMonth}>
        <div className={`h-20 border ${isToday && 'bg-gray-100'}`} onClick={onClick}>
          <p className={`${colorDate(currentDate, date.date, dateIndex)}`}>{day}</p>
        </div>
      </DrawerTrigger>
      {isValidMonth && <DrawerContent overlay={false} displayDrawerButton={false}>
        <DrawerTitle className="hidden">일정 추가</DrawerTitle>
        <Link
          href={"/schedule/add/" + date.date}
          className="mx-auto w-full max-w-sm"
        >
          일정 추가하기
        </Link>
      </DrawerContent>}
    </Drawer>
  );
};

export default AddScheduleDrawer;
