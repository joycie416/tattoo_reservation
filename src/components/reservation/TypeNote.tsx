import React from "react";
import { TabsContent } from "../ui/tabs";
import { CircleAlert } from "lucide-react";

export type ValueType = keyof typeof typeNoteContent;
const typeNoteContentStyle =
  "text-font3 text-[12px] tracking-[-0.025em] leading-[16px] font-normal";
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

const TypeNote = ({ value }: { value: "own" | "custom" | "coverup" }) => {
  return (
    <TabsContent value={value}>
      <div className="w-full px-[11px] py-2 flex gap-2 bg-font4 rounded-sm">
        <CircleAlert size={16} color="#FF003C" /> {typeNoteContent[value]}
      </div>
    </TabsContent>
  );
};

export default TypeNote;
