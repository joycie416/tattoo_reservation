"use client";

import { useGetFullNotice } from "@/hooks/useNotice";
import React from "react";
import NoticeCard from "./NoticeCard";
import { useAdmin } from "@/hooks/useQueryData";

const NoticeList = () => {
  const admin = useAdmin();
  const { data: noticeList } = useGetFullNotice();

  return (
    <div>
      {(noticeList ?? [])
        .filter((notice) => {
          // 관리자면 다 보이고
          if (admin) return true;
          // 아니면 숨김은 안 보이고
          return !notice.hidden;
        })
        .map((notice) => (
          <NoticeCard notice={notice} key={notice.id} />
        ))}
    </div>
  );
};

export default NoticeList;
