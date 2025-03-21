"use client";

import Calendar from "../shared/Calendar";
import { colorDate, sortSchedule } from "@/utils/schedule";
import { useAtom } from "jotai";
import { cn } from "@/lib/utils";
import { useGetSchedule } from "@/hooks/useSchedule";
import { useRef, useState } from "react";
import TimeRadioGroup from "../shared/TimeRadioGroup";
import { reservationDateStore } from "@/store/reservationStore";
import Image from "next/image";

export type ReservationType = {
  fullDate: string;
  time: string;
  style: string;
  description: string;
  images: File[];
};
const DEFAULT_RESERVATION: ReservationType = {
  fullDate: "",
  time: "",
  style: "",
  description: "",
  images: [],
};

const ReservationFirstStep = () => {
  const [dateStore, setDate] = useAtom(reservationDateStore);
  const [curYear, curMonth] = dateStore.date.split("-");

  const { data: scheduleDate } = useGetSchedule(curYear, curMonth);
  const [, sortedSchedule] = sortSchedule(scheduleDate ?? []);

  const [reservation, setReservation] =
    useState<ReservationType>(DEFAULT_RESERVATION);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextarea = () => {
    // textarea 높이 자동 조절
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  const imgRef = useRef<HTMLInputElement>(null);
  const handleImageChange = () => {
    if (imgRef.current && imgRef.current.files) {
      const files = Array.from(imgRef.current.files);
      if (files.length > 4) {
        alert("이미지는 최대 4장까지 첨부 가능합니다.");
        return;
      }
      setReservation((prev) => ({ ...prev, images: files }));
    }
    // 취소시 기존 이미지 파일 유지
  };
  const handleImageDelete = (i: number) => {
    setReservation((prev) => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== i),
    }));
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
        <div className="mb-4">
          <h3>참고 이미지를 첨부해주세요(최대 4장)</h3>
          <p className="text-xs">* 작업자의 일정에 따라 변경될 수 있습니다</p>
        </div>
        <div className="w-full overflow-x-scroll">
          <div className="w-max flex gap-5">
            <div
              className="w-20 h-20 bg-button text-center cursor-pointer"
              onClick={() => imgRef.current?.click()}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                ref={imgRef}
                className="hidden"
                onChange={() => handleImageChange()}
              />
              +
            </div>
            {reservation.images.map((file, i) => (
              <div className="w-20 h-20 relative" key={`image_${i}`}>
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`이미지 미리보기 ${i}`}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2"
                  onClick={() => handleImageDelete(i)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-4" />
      </form>
    </div>
  );
};

export default ReservationFirstStep;
