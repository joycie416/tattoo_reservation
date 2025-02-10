"use client";

import React, { useState } from "react";
import TimeButton from "./TimeButton";
import { cn } from "@/lib/utils";
import AddScheduleButton from "./AddScheduleButton";

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

const AddScheduleForm = () => {
  const [times, setTimes] = useState<string[]>([]);

  const handleClick = (time: string) => {
    if (isIncluded(time)) {
      setTimes((prev) => prev.filter(scheduled => scheduled !== time))
      return 
    }
    setTimes((prev) => [...prev, time]);
  };

  const isIncluded = (time: string) => {
    return times.includes(time);
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
              "border border-blue-300": isIncluded(time),
            })}
            key={time}
          />
        ))}
      </div>
      <AddScheduleButton onClick={() => {}}/>
    </div>
  );
};

export default AddScheduleForm;
