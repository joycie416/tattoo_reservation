"use client";

import React, { useEffect, useState } from "react";
import TimeButton from "./TimeButton";
import { cn } from "@/lib/utils";
import AddScheduleButton from "./AddScheduleButton";
import { useEditScheduleMutation, useGetSchedule } from "@/hooks/useSchedule";

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

type AddScheduleFormProps = { date: string };

const AddScheduleForm = ({ date }: AddScheduleFormProps) => {
  // const [year, month, parsedDate] = date.split("-");
  const [year, month] = date.split("-");
  // const { data, isLoading, isError, error } = useGetSchedule(year, month);
  const { data } = useGetSchedule(year, month);
  // const {mutate: editSchedule, isError:isEditError, error: editError} = useEditScheduleMutation(date);
  const {mutate: editSchedule} = useEditScheduleMutation(date);
  const scheduledTimes = data?.filter(({full_date}) => full_date === date).map(({ time, id }) => [time, id]) ?? [];

  const [times, setTimes] = useState<string[]>(() =>
    scheduledTimes.map(([time]) => time)
  );

  useEffect(() => {
    console.log('data:', data)
    console.log('clicked:', times)
  }, [times])

  const handleClick = (time: string) => {
    if (times.includes(time)) {
      setTimes((prev) => prev.filter((cur) => cur !== time));
    } else {
      setTimes((prev) => [...prev, time]);
    }
  };

  const classifyData = () => {
    const addTimes = times.filter(
      (time) => !scheduledTimes.find(([data]) => data === time)
    );
    const deleteIds = scheduledTimes
      .filter(([time]) => !times.includes(time))
      .map(([, id]) => id);

    console.log("toAdd:", addTimes);
    console.log("toDelete:", deleteIds);
    return {addTimes, deleteIds};
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-3 mx-5 mb-6">
        {TIMES.map((time) => (
          <TimeButton
            time={time}
            onClick={() => {
              handleClick(time);
            }}
            className={cn("border rounded-md py-2", {
              "border border-blue-300": times.includes(time),
            })}
            key={time}
          />
        ))}
      </div>
      <AddScheduleButton
        onClick={() => {
          editSchedule(classifyData());
        }}
      />
    </div>
  );
};

export default AddScheduleForm;
