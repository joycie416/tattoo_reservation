import { cn } from "@/lib/utils";
import { Reservation } from "@/types/supabase";
import { parseReservation } from "@/utils/reservation";
import browserClient from "@/utils/supabase/client";
import Image from "next/image";
import React from "react";

const ResultCard = ({ reservation }: { reservation: Reservation }) => {
  const imageUrls = [];
  for (let i = 0; i < reservation.image_num; i++) {
    browserClient.storage
      .from("user_reservations")
      .getPublicUrl(`${reservation.id}/${i}_${reservation.id}`);
    imageUrls.push(
      `https://lvyzvqzgcqydicbpxwkt.supabase.co/storage/v1/object/public/user_reservations/${reservation.id}/${i}_${reservation.id}`
    );
  }

  const date = parseReservation(reservation);

  return (
    <div className="border border-gray-30 rounded-md">
      <ReservationHeader
        date={date}
        condition={reservation.condition as ConditionKeyType}
      />

      <div className="px-6 py-4 grid grid-cols-[repeat(2,_max-content)] gap-x-6 gap-y-2 text-body">
        <p>종류</p>
        <p>{reservation.type}</p>
        <p>사이즈</p>
        <p>{reservation.size}</p>
        <p>부위</p>
        <p>{reservation.part}</p>
        <p>세부사항</p>
        <p>{reservation.description}</p>
      </div>
      <p className="col-span-2">첨부사진</p>
      <div className="w-full overflow-x-scroll mb-8">
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
  );
};

export default ResultCard;

type ConditionKeyType = "new" | "checking" | "confirmed" | "canceled";
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
  };
  const tagBgColor: ConditionObjectType = {
    new: "bg-blue-50",
    checking: "bg-blue-50",
    confirmed: "bg-gray-50",
    canceled: "bg-gray-50",
  };
  const tagTextColor: ConditionObjectType = {
    new: "text-white",
    checking: "text-white",
    confirmed: "text-gray-70",
    canceled: "text-gray-70",
  };
  const parseCondition: ConditionObjectType = {
    new: "예약 접수",
    checking: "확인 중",
    confirmed: "접수 완료",
    canceled: "취소",
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
