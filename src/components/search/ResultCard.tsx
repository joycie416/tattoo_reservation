"use client";

import { cn } from "@/lib/utils";
import { Reservation } from "@/types/supabase";
import { parseReservation } from "@/utils/reservation";
import browserClient from "@/utils/supabase/client";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ResultCard = ({ reservation }: { reservation: Reservation }) => {
  const [open, setOpen] = useState(false);

  const imageUrls = [];
  for (let i = 0; i < reservation.image_num; i++) {
    browserClient.storage
      .from("user_reservations")
      .getPublicUrl(`${reservation.id}/${i}_${reservation.id}`);
    imageUrls.push(
      `https://lvyzvqzgcqydicbpxwkt.supabase.co/storage/v1/object/public/user_reservations/${reservation.id}/${i}_${reservation.id}`
    );
  }

  const [registerDate, wantDate] = parseReservation(reservation);

  const tattooType = {
    own: "작업자 도안",
    custom: "커스텀 타투",
    coverup: "커버업 타투",
  };
  const detailTextStyle = cn("break-word", {
    "line-clamp-1": !open,
    "whitespace-pre-line": open,
  });

  return (
    <div className="border border-gray-30 rounded-md">
      <ReservationHeader
        date={registerDate}
        condition={reservation.condition as ConditionKeyType}
      />

      <div className="px-4 pt-4 pb-2 space-y-[13px] text-body">
        <div className="flex space-x-4">
          <p className="w-12 shrink-0 text-gray-70">신청날짜</p>
          <p>{wantDate}</p>
        </div>
        <div className="flex space-x-4">
          <p className="w-12 shrink-0 text-gray-70">종류</p>
          <p>{tattooType[reservation.type as keyof typeof tattooType]}</p>
        </div>
        <div className="flex space-x-4">
          <p className="w-12 shrink-0 text-gray-70">사이즈</p>
          <p className={detailTextStyle}>{reservation.size}</p>
        </div>
        <div className="flex space-x-4">
          <p className="w-12 shrink-0 text-gray-70">부위</p>
          <p className={detailTextStyle}>{reservation.part}</p>
        </div>
        <div className="flex space-x-4 overflow-hidden">
          <p className="w-12 shrink-0 text-gray-70">세부사항</p>
          <p className={detailTextStyle}>{reservation.description}</p>
        </div>
      </div>
      {open && (
        <div className="px-4 pb-2 space-y-[5px]">
          <p className="text-body text-gray-70">첨부사진</p>
          <div className="w-full overflow-x-scroll">
            <div className="w-max flex gap-2">
              {imageUrls.map((url, i) => (
                <div
                  className={`w-[84px] h-[84px] rounded-lg overflow-hidden relative`}
                  key={`${reservation.id}_image_${i}`}
                >
                  <Image
                    src={url}
                    alt={`이미지 미리보기 ${i}`}
                    width={84}
                    height={84}
                    className="w-[84px] h-[84px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div onClick={() => setOpen((prev) => !prev)}>
        <ChevronDown
          strokeWidth={1.5}
          color="#636363"
          className={cn("place-self-center", {
            "rotate-180": open,
          })}
        />
      </div>
    </div>
  );
};

export default ResultCard;

type ConditionKeyType =
  | "new"
  | "checking"
  | "confirmed"
  | "canceled"
  | "finished";
type ConditionObjectType = Record<ConditionKeyType, string>;
const ReservationHeader = ({
  date,
  condition,
}: {
  date: string;
  condition: ConditionKeyType;
}) => {
  const bgColor: ConditionObjectType = {
    new: "bg-blue-20",
    checking: "bg-blue-20",
    confirmed: "bg-gray-10",
    canceled: "bg-gray-10",
    finished: "bg-gray-10",
  };
  const tagBgColor: ConditionObjectType = {
    new: "bg-blue-50",
    checking: "bg-blue-50",
    confirmed: "bg-gray-50",
    canceled: "bg-gray-50",
    finished: "bg-gray-50",
  };
  const tagTextColor: ConditionObjectType = {
    new: "text-white",
    checking: "text-white",
    confirmed: "text-gray-70",
    canceled: "text-gray-70",
    finished: "text-gray-70",
  };
  const parseCondition: ConditionObjectType = {
    new: "신규 접수",
    checking: "예약 확인",
    confirmed: "예약 완료",
    canceled: "예약 취소",
    finished: "작업 완료",
  };

  return (
    <div
      className={`h-10 pl-4 pr-[10px] py-[10px] flex justify-between items-center ${bgColor[condition]}`}
    >
      <p
        className={cn("text-body", {
          "text-gray-70": condition === "confirmed" || condition === "canceled",
        })}
      >
        {date}
      </p>
      <div
        className={`p-1 ${tagBgColor[condition]} rounded-md text-[12px] font-medium ${tagTextColor[condition]}`}
      >
        {parseCondition[condition]}
      </div>
    </div>
  );
};
