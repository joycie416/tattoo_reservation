import LogoutButton from "@/components/admin/LogoutButton";
import PageHeader from "@/components/shared/PageHeader";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "관리자 페이지",
};

const AdminPage = async () => {
  return (
    <>
      <PageHeader title="관리자" backTo="/" />
      <div className="container flex flex-col">
        <h2>관리자 페이지</h2>
        <Link href="/admin/schedule">일정 보기</Link>
        <Link href="/admin/notice/add">공지사항 추가</Link>
        <hr className="my-5" />
        <Link href="/notice">공지사항 보기</Link>
        <hr className="my-5" />
        <LogoutButton />
      </div>
    </>
  );
};

export default AdminPage;
