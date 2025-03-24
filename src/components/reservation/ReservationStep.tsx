"use client";

import Calendar from "@/components/shared/Calendar";
import TimeRadioGroup from "@/components/shared/TimeRadioGroup";
import useConditionalDateAtom from "@/hooks/useConditionalDateAtom";
import { useGetSchedule } from "@/hooks/useSchedule";
import { useAddUserReservation } from "@/hooks/useUserReservation";
import { cn } from "@/lib/utils";
import { UserReservation } from "@/types/supabase";
import { colorDate, sortSchedule } from "@/utils/schedule";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import TypeNote, { ValueType } from "./TypeNote";

type ReservationStepProps = { step: string };

const ReservationStep = ({ step }: ReservationStepProps) => {
  const [reservation, setReservation] = useConditionalDateAtom();
  const [curYear, curMonth] = reservation.date.split("-");

  const { data: schedule } = useGetSchedule(curYear, curMonth);
  const [, sortedSchedule] = sortSchedule(schedule ?? []);

  const { mutate: addReservation } = useAddUserReservation();

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
      images: (prev.images ?? []).filter((_, idx) => idx !== i),
    }));
  };

  const handleDateClick = (curDate: string) => {
    setReservation((prev) => ({ ...prev, date: curDate }));
  };

  return (
    <div id="reservation_wrapper">
      <form>
        {step === "1" && (
          <>
            <h1>예약 사항</h1>
            <h3>타투할 부위와 사이즈를 입력해주세요</h3>
            <Tabs
              defaultValue="own"
              onValueChange={(value) =>
                setReservation((prev) => ({ ...prev, type: value }))
              }
            >
              <TabsList className="w-full grid grid-cols-3 gap-2">
                <TabsTrigger value="own">
                  <div>
                    <p>작업자 도안</p>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="custom">
                  <div>
                    <p>커스텀 타투</p>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="coverup">
                  <div>
                    <p>커버업 타투</p>
                  </div>
                </TabsTrigger>
              </TabsList>
              {["own", "custom", "coverup"].map((value) => (
                <TypeNote value={value as ValueType} key={value} />
              ))}
            </Tabs>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label htmlFor="part" className="text-sm">
                  부위
                </label>
                <input
                  id="part"
                  defaultValue={reservation.part}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      part: e.target.value,
                    }))
                  }
                  className="border border-background rounded-[5px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="size" className="text-sm">
                  사이즈
                </label>
                <input
                  id="size"
                  defaultValue={reservation.size}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      size: e.target.value,
                    }))
                  }
                  className="border border-background rounded-[5px]"
                />
              </div>
            </div>
            <hr className="my-4" />
            <div>
              <h3>세부사항을 입력해주세요</h3>
              <p className="text-xs">* 상세하게~</p>
            </div>
            <textarea
              ref={textareaRef}
              defaultValue={reservation.description}
              onInput={() => resizeTextarea()}
              onChange={() =>
                setReservation((prev) => ({
                  ...prev,
                  description: textareaRef.current?.value ?? "",
                }))
              }
              className="w-full min-h-[250px] resize-none border border-backgound rounded-md focus:outline-none"
            />
            <hr className="my-4" />
            <div className="mb-4">
              <h3>참고 이미지를 첨부해주세요(최대 4장)</h3>
              <p className="text-xs">
                * 작업자의 일정에 따라 변경될 수 있습니다
              </p>
            </div>
            <div className="w-full overflow-x-scroll">
              <div className="w-max flex gap-5">
                <div
                  className="w-20 h-20 bg-button text-center cursor-pointer"
                  onClick={() => imgRef.current?.click()}
                >
                  <input
                    type="file"
                    multiple // 여러 파일 선택 가능
                    accept="image/*"
                    ref={imgRef}
                    className="hidden"
                    onChange={() => handleImageChange()}
                  />
                  +
                </div>
                {(reservation.images ?? []).map((file, i) => (
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

            <div className="w-full px-[3.5px] py-2 bg-white">
              <Link
                href={"/reservation/add/2"}
                className="w-full h-8 flex justify-center items-center bg-font2 rounded-[5px] text-white"
              >
                다음
              </Link>
            </div>
          </>
        )}
        {step === "2" && (
          <>
            <div>
              <h3>원하는 날짜를 선택해주세요</h3>
              <p className="text-xs">
                * 작업자의 일정에 따라 변경될 수 있습니다
              </p>
            </div>
            <Calendar
              dateFn={([date, day], i) => (
                <div
                  key={`date_${date}`}
                  className={cn("h-20 border", {
                    "bg-gray-100": date === reservation.date,
                    "border-gray-500": sortedSchedule.has(date),
                  })}
                  onClick={(e) => {
                    e.preventDefault();
                    handleDateClick(date);
                  }}
                >
                  <p className={`${colorDate(date, reservation.date, i)}`}>
                    {day}
                  </p>
                </div>
              )}
            />
            <hr className="my-4" />
            <div>
              <h3>원하는 시간을 선택해주세요</h3>
              <p className="text-xs">
                * 작업자의 일정에 따라 변경될 수 있습니다
              </p>
            </div>
            <TimeRadioGroup
              schedules={sortedSchedule}
              setReservation={setReservation}
            />
            <div className="w-full px-[3.5px] py-2 bg-white">
              <Link
                href={"/reservation/add/3"}
                className="w-full h-8 flex justify-center items-center bg-font2 rounded-[5px] text-white"
              >
                다음
              </Link>
            </div>
          </>
        )}
        <hr className="my-4" />
        {step === "3" && (
          <>
            <div>
              <h3>고객 정보를 입력해주세요</h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm">
                  이름*
                </label>
                <input
                  id="name"
                  defaultValue={reservation.name}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="border border-background rounded-[5px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact" className="text-sm">
                  전화번호*{" "}
                  <p className="inline text-xs">(숫자만 입력해주세요)</p>
                </label>
                <input
                  id="contact"
                  defaultValue={reservation.contact}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }))
                  }
                  className="border border-background rounded-[5px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="instagram" className="text-sm">
                  인스타 ID{" "}
                  <p className="inline text-xs">(DM이 편하시면 남겨주세요)</p>
                </label>
                <input
                  id="instagram"
                  defaultValue={reservation.instagram}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      instagram: e.target.value,
                    }))
                  }
                  className="border border-background rounded-[5px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-sm">
                  비밀번호*{" "}
                  <p className="inline text-xs">
                    (예약확인용, 숫자만 입력해주세요)
                  </p>
                </label>
                <input
                  id="password"
                  defaultValue={reservation.password}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="border border-background rounded-[5px]"
                />
              </div>
            </div>
            <div className="w-full px-[3.5px] py-2 bg-white">
              <button
                className="w-full h-8 flex justify-center items-center bg-font2 rounded-[5px] text-white"
                onClick={() => {
                  addReservation(
                    reservation as UserReservation & { images: File[] }
                  );
                }}
              >
                확인
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ReservationStep;
