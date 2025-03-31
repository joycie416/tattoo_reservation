import NoticeDetail from "@/components/notice/NoticeDetail";
import React from "react";

const NoticeDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  return <NoticeDetail noticeId={id} />;
};

export default NoticeDetailPage;
