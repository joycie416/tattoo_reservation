"use client";

import { Notice } from "@/types/supabase";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

const NoticeDetail = ({ noticeId }: { noticeId: string }) => {
  const queryClient = useQueryClient();
  const notice = queryClient
    .getQueryData<Notice[]>(["notice"])
    ?.find((data) => data.id === noticeId);

  return (
    <div>
      <p>{notice?.title}</p>
      <p>{noticeId}</p>
    </div>
  );
};

export default NoticeDetail;
