"use client";

import { Notice } from "@/types/supabase";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import LeftArrow from "/public/icons/left-arrow.svg";
import SeeMore from "/public/icons/ellipsis-vertical.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useGetSingleNotice } from "@/hooks/useNotice";
import { useEffect, useState } from "react";
import { getPublicUrl } from "@/utils/common";
import { useAuth } from "@/hooks/useAuth";
import Toggle from "../shared/Toggle";

const NoticeDetail = ({ noticeId }: { noticeId: string }) => {
  const queryClient = useQueryClient();
  const cachedNotice = queryClient
    .getQueryData<Notice[]>(["notice"])
    ?.find((data) => data.id === noticeId);
  const { data: noticeData } = useGetSingleNotice(noticeId);
  const imageUrl = getPublicUrl("notice", noticeId, 0);
  const [notice, setNotice] = useState<Partial<Notice>>(
    cachedNotice ?? { title: "", content: "", modified_at: "" }
  );

  useEffect(() => {
    if (!cachedNotice?.title && !!noticeData) setNotice(noticeData[0]);
    console.log(notice);
  }, [noticeData]);

  const { data: admin } = useAuth();

  return (
    <>
      <header className="w-full h-[59px] sticky top-0 flex justify-center items-center bg-white border-b-[3px] border-background text-font1 text-title-lg text-center relative z-10">
        <Link href={"/notice"} className="absolute left-5">
          <Image
            src={LeftArrow}
            alt="이전 페이지로"
            className="w-[28px] h-[29px]"
          />
        </Link>
        소식 · 이벤트
        <Popover>
          <PopoverTrigger className="absolute right-4">
            <Image
              src={SeeMore}
              alt="수정 · 삭제"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </PopoverTrigger>
          <PopoverContent className="w-fit px-3 py-2 mt-[13px] flex flex-col gap-2 text-body text-gray-70 border-gray-30 rounded-md shadow-none">
            <Link href={`/notice/add?id=${noticeId}&modify=${true}`}>
              수정하기
            </Link>
            <button>삭제하기</button>
          </PopoverContent>
        </Popover>
      </header>
      <div>
        <div className="p-6 flex gap-2 justify-between items-center">
          <h3 className="break-all line-clamp-1">{notice.title}</h3>
          <p className="text-body-sm text-gray-70">
            {notice.modified_at?.split("T")[0].replaceAll("-", ".") ?? ""}
          </p>
        </div>
        <div className="w-full aspect-square">
          <Image
            src={imageUrl}
            alt="공지사항 이미지"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6 text-body">
          <p className="break-all whitespace-pre-line">{notice.content}</p>
        </div>
        {admin && (
          <>
            <hr className="h-[3px] border-0 bg-gray-10" />
            <div className="px-6 py-2 grid grid-cols-2 gap-[3px] text-body font-medium text-gray-70">
              <div>
                <div className="flex gap-3 items-center">
                  <p>게시물 상단 고정</p>
                  <Toggle bool={!!notice.fixed} />
                </div>
              </div>
              <div>
                <div className="pl-6 flex gap-3 items-center">
                  <p>게시물 숨김</p>
                  <Toggle bool={!!notice.hidden} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NoticeDetail;
