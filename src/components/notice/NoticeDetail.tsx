"use client";

import { Notice } from "@/types/supabase";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import SeeMore from "/public/icons/ellipsis-vertical.svg";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  useDeleteNotice,
  useGetSingleNotice,
  useUpdateFixedHidden,
} from "@/hooks/useNotice";
import { useEffect, useState } from "react";
import { getPublicUrl } from "@/utils/common";
import Toggle from "../shared/Toggle";
import { cn } from "@/lib/utils";
import DataLoading from "../shared/DataLoading";
import { useAdmin } from "@/hooks/useQueryData";
import PageHeaderWithButton from "../shared/PageHeaderWithButton";

const NoticeDetail = ({ noticeId }: { noticeId: string }) => {
  const queryClient = useQueryClient();
  const cachedNotice = queryClient
    .getQueryData<Notice[]>(["notice"])
    ?.find((data) => data.id === noticeId);
  const { data: noticeData } = useGetSingleNotice(noticeId);
  const imageUrl = getPublicUrl("notice", noticeId, 0);
  const [notice, setNotice] = useState<Partial<Notice>>(
    cachedNotice ?? {
      title: "",
      content: "",
      modified_at: "",
      fixed: false,
      hidden: false,
    }
  );

  const { mutate: deleteNotice, isPending: isDeletePending } =
    useDeleteNotice();
  const { mutate: updateFixedHidden, isPending: isUpdatePending } =
    useUpdateFixedHidden();

  const [fixedHidden, setFixedHidden] = useState<{
    fixed: boolean;
    hidden: boolean;
  }>({ fixed: !!notice.fixed, hidden: !!notice.hidden });

  useEffect(() => {
    if (!cachedNotice?.title && !!noticeData) setNotice(noticeData[0]);
  }, [noticeData]);

  const admin = useAdmin();

  const handleFixedToggleClick = () => {
    const { fixed, hidden } = fixedHidden;
    updateFixedHidden({ id: noticeId, fixed: !fixed, hidden });
  };

  const handleHiddenToggleClick = () => {
    const { fixed, hidden } = fixedHidden;
    updateFixedHidden({ id: noticeId, fixed, hidden: !hidden });
  };

  return (
    <>
      <PageHeaderWithButton title="소식 · 이벤트" backTo="/notice">
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
          <PopoverContent className="w-fit px-3 py-2 mt-[13px] flex flex-col gap-2 text-body-md text-gray-70 border-gray-30 rounded-md shadow-none">
            <Link href={`/notice/add?id=${noticeId}&modify=${true}`}>
              수정하기
            </Link>
            <button onClick={() => deleteNotice({ id: noticeId })}>
              삭제하기
            </button>
          </PopoverContent>
        </Popover>
      </PageHeaderWithButton>
      <div>
        <div className="p-6 flex gap-2 justify-between items-center">
          <h3 className="text-title-md leading-[100%] break-all line-clamp-1">
            {notice.title}
          </h3>
          <p className="text-body-md-sm text-gray-70 leading-[100%]">
            {notice.modified_at?.split("T")[0].replaceAll("-", ".") ?? ""}
          </p>
        </div>
        <div className="w-full aspect-square drag-forbidden">
          <Image
            src={`${imageUrl}?cache=${crypto.randomUUID()}`}
            alt="공지사항 이미지"
            width={1000}
            height={1000}
            className="w-full h-full object-cover drag-forbidden"
          />
        </div>
        <div className="p-6 text-body-md">
          <p className="break-all whitespace-pre-line drag-forbidden">
            {notice.content}
          </p>
        </div>
        {!!admin && (
          <>
            <hr className="h-[3px] border-0 bg-gray-10" />
            <div className="px-6 py-2 grid grid-cols-2 gap-[3px] text-body-md font-medium text-gray-70">
              <div
                onClick={() => {
                  setFixedHidden((prev) => ({ ...prev, fixed: !prev.fixed }));
                  handleFixedToggleClick();
                }}
                className={cn("", { "pointer-events-none": isUpdatePending })}
              >
                <div className="flex gap-3 items-center">
                  <p>게시물 상단 고정</p>
                  <Toggle bool={fixedHidden.fixed} />
                </div>
              </div>
              <div
                onClick={() => {
                  setFixedHidden((prev) => ({ ...prev, hidden: !prev.hidden }));
                  handleHiddenToggleClick();
                }}
                className={cn("", { "pointer-events-none": isUpdatePending })}
              >
                <div className="pl-6 flex gap-3 items-center">
                  <p>게시물 숨김</p>
                  <Toggle bool={fixedHidden.hidden} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      {isDeletePending && <DataLoading />}
    </>
  );
};

export default NoticeDetail;
