"use client";
import React, { useRef } from "react";
import { Checkbox } from "../ui/checkbox";

export const noticeCheckboxContent: { bold: string; normal: string }[] = [
  {
    bold: "미성년자 대상으로 작업이 불가능합니다.",
    normal: `${
      new Date().getFullYear() - 19
    }년생부터 예약이 가능합니다. (${new Date()
      .getFullYear()
      .toLocaleString("ko-KR")
      .slice(-2)}년도 기준)`,
  },
  {
    bold: "예약 일정이 조율될 수 있습니다.",
    normal: "접수 이후 작업자의 일정에 따라 변경될 수 있습니다.",
  },
  {
    bold: "예약 확정 이후 취소 시 환불이 어렵습니다.",
    normal: "(작업 전날까지 변경 1회 가능)",
  },
  {
    bold: "작업한 사진은 포트폴리오로 활용됩니다.",
    normal: "타투 작업 사진만 사용됩니다. (얼굴 노출 X)",
  },
];

type NoticeCheckboxProps = {
  checked: boolean;
  setChecks: React.Dispatch<React.SetStateAction<boolean[]>>;
  i: number;
};

const NoticeCheckbox = ({ checked, setChecks, i }: NoticeCheckboxProps) => {
  // div 클릭시 setState 전달 depth가 깊다는 런타임 에러가 발생해 useRef 사용
  const checkboxRef = useRef<HTMLButtonElement>(null);
  const handleClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };
  return (
    <div
      className="px-[18px] py-[14px] flex justify-between items-center bg-font4 rounded-[4px] cursor-pointer"
      onClick={() => {
        handleClick();
      }}
    >
      <div>
        <p className="text-[14px] font-semibold tracking-[-0.025em]">
          {noticeCheckboxContent[i].bold}
        </p>
        <p className="text-[12px] tracking-[-0.025em]">
          {noticeCheckboxContent[i].normal}
        </p>
      </div>
      <Checkbox
        id={`notice_checkbox_${i}`}
        ref={checkboxRef}
        checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          setChecks((prev) => {
            const newChecks = [...prev];
            newChecks[i] = !prev[i];
            return newChecks;
          });
        }}
        className="w-4 h-4 border-font3 rounded-[4px] data-[state=checked]:bg-font3"
      />
    </div>
  );
};

export default NoticeCheckbox;
