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
import { useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import TypeNote, { ValueType } from "./TypeNote";
import { CircleAlert } from "lucide-react";
import NoticeCheckbox, { noticeCheckboxContent } from "./NoticeCheckbox";

type ReservationStepProps = { step: string };

const ReservationStep = ({ step }: ReservationStepProps) => {
  const [reservation, setReservation] = useConditionalDateAtom();
  const [curYear, curMonth] = reservation.date.split("-");

  const [checks, setChecks] = useState<boolean[]>(
    Array(noticeCheckboxContent.length).fill(false)
  );

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

  const isFirstStepFilled =
    !!reservation.type &&
    !!reservation.size &&
    !!reservation.part &&
    !!reservation.images?.length;
  const onToSecondStepClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isFirstStepFilled) {
      e.preventDefault();
      alert("예약 사항을 모두 입력해주세요. (사진 최소 1장)");
    }
  };

  const isSecondStepFilled = !!reservation.date && !!reservation.time;
  const onToLastStepClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isSecondStepFilled) {
      e.preventDefault();
      alert("예약 날짜와 시간을 모두 선택해주세요.");
    }
  };

  const contactReg = /^\d{11}$/;
  const instagramReg = /^(?!.*\.\.)(?!.*\.$)[a-z0-9._]{5,30}$/;
  const passwordReg = /^\d{4}$/;
  const isLastStepFilled =
    !!reservation.name &&
    !!reservation.contact &&
    contactReg.test(reservation.contact) &&
    !!reservation.instagram &&
    instagramReg.test(reservation.instagram) &&
    !!reservation.password &&
    passwordReg.test(reservation.password);
  const isAllChecked = () => {
    return checks.every((check) => check);
  };

  const onConfirmClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (
      !isFirstStepFilled ||
      !isSecondStepFilled ||
      !isLastStepFilled ||
      !isAllChecked()
    ) {
      e.preventDefault();
      alert("작성한 고객 정보와 안내사항을 모두 확인해주세요.");
      return;
    }
    addReservation(reservation as UserReservation & { images: File[] });
  };

  return (
    <div id="reservation_wrapper" className="text-font1">
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

            <div className="w-full py-2 bg-white">
              <Link
                href={"/reservation/add/2"}
                aria-disabled={!isFirstStepFilled}
                onClick={onToSecondStepClick}
                className={cn(
                  "w-full h-8 flex justify-center items-center bg-font2 rounded-[4px] text-white",
                  {
                    "bg-guide": !isFirstStepFilled,
                  }
                )}
              >
                다음
              </Link>
            </div>
          </>
        )}
        {step === "2" && (
          <>
            <div>
              <h3>원하는 날짜를 선택해주세요.</h3>
              <p className="text-xs">
                * 작업자의 일정에 따라 변경될 수 있습니다.
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
              <h3>원하는 시간을 선택해주세요.</h3>
              <p className="text-xs">
                * 작업자의 일정에 따라 변경될 수 있습니다.
              </p>
            </div>
            <TimeRadioGroup
              schedules={sortedSchedule}
              setReservation={setReservation}
            />
            <div className="w-full py-2 bg-white">
              <Link
                href={"/reservation/add/3"}
                aria-disabled={!isSecondStepFilled}
                onClick={onToLastStepClick}
                className={cn(
                  "w-full h-8 flex justify-center items-center bg-font2 rounded-[4px] text-white",
                  {
                    "bg-guide": !isSecondStepFilled,
                  }
                )}
              >
                다음
              </Link>
            </div>
          </>
        )}
        {step === "3" && (
          <>
            <div className="mt-6">
              <h3 className="text-title-md">고객 정보를 입력해주세요.</h3>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-subtitle-md">
                  예약하실 분 성함을 입력해주세요.
                </label>
                <input
                  id="name"
                  placeholder="이름을 입력해주세요"
                  defaultValue={reservation.name}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact" className="text-subtitle-md">
                  연락처를 입력해주세요.
                </label>
                <input
                  id="contact"
                  pattern="[0-9]*" // 일부 안드로이드 브라우저 숫자 키패드 트리거
                  inputMode="numeric" // 모바일에서 숫자 키패드 표시
                  placeholder="010-0000-0000"
                  defaultValue={reservation.contact}
                  onChange={(e) => {
                    setReservation((prev) => ({
                      ...prev,
                      contact: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="space-y-1">
                  <label htmlFor="instagram" className="text-subtitle-md">
                    인스타 ID를 입력해주세요.
                  </label>
                  <p className="text-subtitle-sm text-font3">
                    * 예약 시 DM을 통해 안내가 갈 예정입니다.
                  </p>
                </div>
                <input
                  id="instagram"
                  placeholder="@를 뺀 아이디를 입력해주세요"
                  defaultValue={reservation.instagram}
                  onChange={(e) => {
                    setReservation((prev) => ({
                      ...prev,
                      instagram: e.target.value.toLowerCase(),
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-subtitle-md">
                  예약 확인용 비밀번호를 입력해주세요.
                </label>
                <input
                  id="password"
                  pattern="[0-9]$" // 일부 안드로이드 브라우저 숫자 키패드 트리거
                  inputMode="numeric" // 모바일에서 숫자 키패드 표시
                  maxLength={4}
                  placeholder="숫자 4자리를 입력해주세요"
                  defaultValue={reservation.password}
                  onChange={(e) => {
                    setReservation((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <hr className="h-[0.75px] bg-guide border-0 my-[28px]" />
            <div className="space-y-3 mb-6">
              <div className="flex gap-1 items-center">
                <CircleAlert
                  size={18}
                  className="w-[18px] h-[18px]"
                  color="#FF003C"
                />
                <p className="text-font3 text-[16px] font-semibold">
                  예약 전 안내사항
                </p>
              </div>
              {Array.from(
                { length: noticeCheckboxContent.length },
                (_, i) => i
              ).map((i) => (
                <NoticeCheckbox
                  checked={checks[i]}
                  setChecks={setChecks}
                  i={i}
                  key={`notice_${i}`}
                />
              ))}
            </div>
            <div className="w-full py-2 bg-white">
              <Link
                href={"/reservation/add/complete"}
                aria-disabled={!isLastStepFilled}
                onClick={onConfirmClick}
                className={cn(
                  "w-full h-8 flex justify-center items-center bg-font2 rounded-[4px] text-white",
                  {
                    "bg-guide": !isLastStepFilled,
                  }
                )}
              >
                확인
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default ReservationStep;
