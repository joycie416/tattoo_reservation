"use client";

import Calendar from "@/components/shared/Calendar";
import TimeRadioGroup from "@/components/shared/TimeRadioGroup";
import useConditionalDateAtom from "@/hooks/useConditionalDateAtom";
import { useGetSchedule } from "@/hooks/useSchedule";
import { useAddUserReservation } from "@/hooks/useUserReservation";
import { cn } from "@/lib/utils";
import { UserReservation } from "@/types/supabase";
import {
  colorDate,
  formatContact,
  getCurrentTime,
  sortSchedule,
} from "@/utils/schedule";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Tabs, TabsList } from "../ui/tabs";
import { TypeNote, TypeTrigger, ValueType } from "./TypeNote";
import { CircleAlert, Plus, X } from "lucide-react";
import NoticeCheckbox, { noticeCheckboxContent } from "./NoticeCheckbox";

type ReservationStepProps = { step: string };

const ReservationStep = ({ step }: ReservationStepProps) => {
  const [reservation, setReservation] = useConditionalDateAtom();
  const [curYear, curMonth] = getCurrentTime()[1].split("-");

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
      setReservation((prev) => ({
        ...prev,
        image_num: files.length,
        images: files,
      }));
    }
    // 취소시 기존 이미지 파일 유지
  };

  const handleImageDelete = (i: number) => {
    setReservation((prev) => {
      const newImages = (prev.images ?? []).filter((_, idx) => idx !== i);
      return {
        ...prev,
        image_num: newImages.length,
        images: newImages,
      };
    });
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
  const isAllChecked = () => {
    return checks.every((check) => check);
  };
  const isLastStepFilled =
    !!reservation.name &&
    !!reservation.contact &&
    contactReg.test(reservation.contact) &&
    !!reservation.instagram &&
    instagramReg.test(reservation.instagram) &&
    !!reservation.password &&
    passwordReg.test(reservation.password) &&
    isAllChecked();

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
      <form className="mt-6">
        {step === "1" && (
          <>
            <h1 className="text-title-md mb-4">예약 사항</h1>

            <h3 className="text-subtitle-md mb-2">타투 종류를 선택해주세요</h3>
            <Tabs
              defaultValue="own"
              onValueChange={(value) =>
                setReservation((prev) => ({ ...prev, type: value }))
              }
              className="mb-4"
            >
              <TabsList className="w-full h-[119px] grid grid-cols-3 gap-3 bg-transparent">
                {["own", "custom", "coverup"].map((value) => (
                  <TypeTrigger
                    value={value as ValueType}
                    key={`trigger_${value}`}
                  />
                ))}
              </TabsList>
              {["own", "custom", "coverup"].map((value) => (
                <TypeNote value={value as ValueType} key={`content_${value}`} />
              ))}
            </Tabs>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="size" className="text-subtitle-md">
                  생각하는 사이즈를 말씀해주세요.
                </label>
                <input
                  id="size"
                  placeholder="예시) 10cm, 신용카드 세로 크기 등"
                  defaultValue={reservation.size}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      size: e.target.value,
                    }))
                  }
                  className="placeholder:text-font2 placeholder:text-body-md"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="part" className="text-subtitle-md">
                  작업할 부위를 말씀해주세요.
                </label>
                <input
                  id="part"
                  placeholder="예시) 오른팔 상박, 왼쪽 어깨 뒷편 등"
                  defaultValue={reservation.part}
                  onChange={(e) =>
                    setReservation((prev) => ({
                      ...prev,
                      part: e.target.value,
                    }))
                  }
                  className="placeholder:text-font2 placeholder:text-body-md"
                />
              </div>
            </div>
            <div className="mb-4 space-y-1 mb-4">
              <h3 className="text-title-md">
                참고 이미지를 첨부해주세요. (최대 4장)
              </h3>
              <p className="text-subtitle-sm text-font2">
                * 사진 1장당 50mb 제한 있습니다.
              </p>
            </div>
            <div className="w-full overflow-x-scroll mb-8">
              <div className="w-max flex gap-2">
                <div
                  className="w-[84px] h-[84px] flex justify-center items-center bg-background rounded-[8px] text-center cursor-pointer"
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
                  <Plus size={48} color="#636363" className="w-12 h-12" />
                </div>
                {(reservation.images ?? []).map((file, i) => (
                  <div
                    className={`w-[84px] h-[84px] rounded-[8px] overflow-hidden relative`}
                    key={`image_${i}`}
                  >
                    <Image
                      src={URL.createObjectURL(file)}
                      alt={`이미지 미리보기 ${i}`}
                      width={84}
                      height={84}
                      className="w-[84px] h-[84px] object-cover"
                    />
                    <div className="w-full h-full bg-gradient-to-b from-black/50 to-transparent absolute top-0 left-0" />
                    <button
                      type="button"
                      className="absolute top-1 right-1"
                      onClick={() => handleImageDelete(i)}
                    >
                      <X size={16} color="#FFF" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <h3 className="text-title-md mb-2">세부사항을 말씀해주세요</h3>
            <textarea
              ref={textareaRef}
              placeholder="내용을 입력해주세요"
              defaultValue={reservation.description}
              onInput={() => resizeTextarea()}
              onChange={() =>
                setReservation((prev) => ({
                  ...prev,
                  description: textareaRef.current?.value ?? "",
                }))
              }
              className="w-full min-h-[160px] p-4 mb-4 resize-none border border-backgound rounded-[4px] text-body-md placeholder:text-font2 placeholder:text-body-md"
            />

            <div className="w-full py-[6px] bg-white">
              <Link
                href={"/reservation/add/2"}
                aria-disabled={!isFirstStepFilled}
                onClick={onToSecondStepClick}
                className={cn(
                  "w-full h-11 flex justify-center items-center bg-font2 rounded-[4px] text-white",
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
            <div className="space-y-1 mb-5">
              <h3 className="text-title-md">원하는 날짜를 선택해주세요.</h3>
              <p className="text-subtitle-sm text-font2">
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
            <hr className="h-[0.75px] bg-guide border-0 mt-[23px] mb-[26px]" />
            <div className="space-y-1 mb-[18px]">
              <h3 className="text-title-md">원하는 시간을 선택해주세요.</h3>
              <p className="text-subtitle-sm text-font2">
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
                  "w-full h-11 flex justify-center items-center bg-font2 rounded-[4px] text-white",
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
                  value={reservation.name}
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
                  maxLength={13}
                  value={formatContact(reservation.contact ?? "")}
                  onChange={(e) => {
                    setReservation((prev) => ({
                      ...prev,
                      contact: e.target.value.replace(/\D/g, ""),
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="space-y-1">
                  <label htmlFor="instagram" className="text-subtitle-md">
                    인스타그램 ID를 입력해주세요.
                  </label>
                  <p className="text-subtitle-sm text-font3">
                    * 예약 시 DM을 통해 안내가 갈 예정입니다.
                  </p>
                </div>
                <input
                  id="instagram"
                  placeholder="@를 뺀 아이디를 입력해주세요"
                  value={reservation.instagram}
                  onChange={(e) => {
                    setReservation((prev) => ({
                      ...prev,
                      instagram: e.target.value.toLowerCase().trim(),
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
                  value={reservation.password}
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
                  "w-full h-11 flex justify-center items-center bg-font2 rounded-[4px] text-white",
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
