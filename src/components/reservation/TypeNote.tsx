import React from "react";
import { TabsContent, TabsTrigger } from "../ui/tabs";
import { CircleAlert } from "lucide-react";
import TabContentArrow from "/public/icons/tab-content-arrow.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type ValueType = keyof typeof typeNoteContent;
const typeNoteContentStyle =
  "text-font3 text-[12px] leading-[16px] font-normal";
const typeNoteContent = {
  own: (
    <p className={typeNoteContentStyle}>
      작업자의 인스타그램 계정 내 예약 가능한 도안을 원하시는
      <br />
      경우 선택해주세요 (캡쳐사진 첨부 필수)
    </p>
  ),
  custom: (
    <p className={typeNoteContentStyle}>
      고객님이 원하는 스타일로 커스텀 도안을 제작하고 싶으신
      <br />
      경우 선택해주세요 (원하는 느낌의 참고 사진 첨부 필수)
    </p>
  ),
  coverup: (
    <p className={typeNoteContentStyle}>
      커버하고 싶은 흉터나 기존에 새긴 타투 위에 새로운 작업을
      <br />
      원하시는 경우 선택해주세요
    </p>
  ),
};

type TattooType = { value: "own" | "custom" | "coverup" };

export const TypeTrigger = ({ value }: TattooType) => {
  const typeTriggerDetail = {
    own: ["", "작업자 도안"],
    custom: ["", "커스텀 타투"],
    coverup: ["", "커버업 타투"],
  };
  return (
    <TabsTrigger
      value={value}
      className="h-full w-full p-0 bg-guide data-[state=active]:bg-guide data-[state=active]:border data-[state=active]:border-font1"
    >
      <div className="w-full h-full px-[18px] pb-[10px] flex items-end">
        <p className="text-subtitle-md mx-auto">
          {typeTriggerDetail[value][1]}
        </p>
      </div>
    </TabsTrigger>
  );
};

export const TypeNote = ({ value }: TattooType) => {
  return (
    <TabsContent value={value}>
      <div className="w-full grid grid-cols-3 gap-3">
        <div
          className={cn("flex justify-center", {
            "col-start-1 col-end-2": value === "own",
            "col-start-2 col-end-3": value === "custom",
            "col-start-3 col-end-4": value === "coverup",
          })}
        >
          <Image src={TabContentArrow} alt="타입 화살표" />
        </div>
      </div>
      <div className="w-full px-2">
        <div className="w-full px-[11px] py-2 flex gap-2 bg-font4 rounded-sm">
          <CircleAlert size={16} color="#FF003C" /> {typeNoteContent[value]}
        </div>
      </div>
    </TabsContent>
  );
};
