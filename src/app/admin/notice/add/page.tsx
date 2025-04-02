import AddNoticeForm from "@/components/notice/AddNoticeForm";
import PageHeader from "@/components/shared/PageHeader";
import React from "react";

const NoticeAddPage = async ({
  searchParams,
}: {
  searchParams: { id?: string; modify?: string };
}) => {
  return (
    <>
      <PageHeader title="소식 · 이벤트 등록" backTo="/admin" />
      <div className="container min-h-[calc(100vh-59px)]">
        <AddNoticeForm searchParams={searchParams} />
      </div>
    </>
  );
};

export default NoticeAddPage;
