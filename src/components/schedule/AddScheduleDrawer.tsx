"use client";

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { scheduleStore } from "@/store/dateStore";
import { colorDate } from "@/utils/schedule";
import { useAtom } from "jotai";
import Link from "next/link";

type AddScheuleDrawerProps = { dateInfo: [string, number]; dateIndex: number };

const AddScheduleDrawer = ({ dateInfo, dateIndex }: AddScheuleDrawerProps) => {
  const [currentDate, day] = dateInfo;
  const [dateStore, setDate] = useAtom(scheduleStore);

  const currentMonth = currentDate.split("-")[1];
  const month = dateStore.date.split("-")[1];

  const isValidMonth = currentMonth === month;
  const isToday = currentDate === dateStore.date;

  const onClick = () => {
    if (isValidMonth) {
      setDate({ ...dateStore, date: currentDate });
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild disabled={!isValidMonth}>
        <div
          className={`h-20 border ${isToday && "bg-gray-100"}`}
          onClick={onClick}
        >
          <p className={`${colorDate(currentDate, dateStore.date, dateIndex)}`}>
            {day}
          </p>
        </div>
      </DrawerTrigger>
      {isValidMonth && (
        <DrawerContent
          overlay={false}
          displayDrawerButton={false}
          className="max-w-mobile mx-auto px-3 py-3"
        >
          <DrawerTitle className="hidden">일정 추가</DrawerTitle>
          <Link
            href={"/admin/schedule/add/" + dateStore.date}
            className="w-full py-3 mx-auto bg-blue-400 rounded-md text-center text-white"
          >
            일정 추가
          </Link>
        </DrawerContent>
      )}
    </Drawer>
  );
};

export default AddScheduleDrawer;
