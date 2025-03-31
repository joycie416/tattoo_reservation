"use client";

import { useGetFullNotice } from "@/hooks/useNotice";
import React from "react";
import NoticeCard from "./NoticeCard";

const NoticeList = () => {
  const { data: noticeList } = useGetFullNotice();

  return (
    <div>
      {noticeList?.map((notice) => (
        <NoticeCard notice={notice} key={notice.id} />
      ))}
    </div>
  );
};

export default NoticeList;
