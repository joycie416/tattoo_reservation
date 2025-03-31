import NoticeDetail from "@/components/notice/NoticeDetail";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

const NoticeDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <PageHeader title="소식 · 이벤트" backTo="/notice" />
      <div className="container">
        <NoticeDetail noticeId={id} />
      </div>
    </>
  );
};

export default NoticeDetailPage;
