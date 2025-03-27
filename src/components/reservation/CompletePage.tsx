"use client";

import useConditionalDateAtom from "@/hooks/useConditionalDateAtom";
import { formatContact } from "@/utils/schedule";
import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CompletePage = () => {
  const router = useRouter();
  const [reservation] = useConditionalDateAtom();

  if (!reservation.name) {
    alert("페이지가 만료되어 메인 화면으로 이동합니다.");
    router.replace("/");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col py-[67px] gap-4 items-center">
        <CircleCheckBig size={48} color="#222222" className="w-12 h-12" />
        <p className="text-title-xl text-center">예약이 접수되었습니다.</p>
      </div>
      <div className="py-6 flex flex-col gap-2">
        <p className="text-title-md">예약 접수 안내사항</p>
        <div className="bg-button px-6 py-4 rounded-[4px]">
          <p className="text-[14px] leading-[20px] text-font2">
            작업자가 접수를 확인한 후, 인스타그램 DM으로
            <br />
            일정 조율 및 안내사항 말씀 드릴 예정입니다.
          </p>
        </div>
        <div className="bg-button px-6 py-4 rounded-[4px]">
          <p className="text-[14px] leading-[20px] text-font2">
            접수 변경이나 추가 사항이 있으신 경우 작업자의
            <br />
            인스타그램 DM(
            <Link
              href="https://www.instagram.com/enan.tt"
              target="_blank"
              className="text-font5"
            >
              @enan.tt
            </Link>
            )으로 연락주세요.
          </p>
        </div>
      </div>
      <div className="pt-6 pb-4">
        <p className="text-title-md mb-2">예약자 정보</p>
        <p className="text-body mb-1">
          * 자세한 정보는 ‘내 예약 확인하기’ 로 확인 가능합니다.
        </p>
        <div className="px-6 py-4 grid grid-cols-[repeat(2,_max-content)] gap-x-6 gap-y-2 bg-button rounded-[4px]">
          <p className="text-body text-font2">성함</p>
          <p className="text-body">{reservation.name}</p>
          <p className="text-body text-font2">연락처</p>
          <p className="text-body">
            {formatContact(reservation.contact ?? "")}
          </p>
          <p className="text-body text-font2">인스타 ID</p>
          <p className="text-body">{reservation.instagram}</p>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full py-[6px]">
          <Link
            href="/"
            className="w-full h-11 flex justify-center items-center bg-white border border-guide rounded-md text-button-md text-font2"
          >
            홈으로 돌아가기
          </Link>
        </div>
        <div className="w-full py-[6px]">
          <Link
            href="/"
            className="w-full h-11 flex justify-center items-center bg-font2 rounded-md text-button-md text-button"
          >
            내 예약 확인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CompletePage;
