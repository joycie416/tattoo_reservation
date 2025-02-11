import LogoutButton from "@/components/admin/LogoutButton";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "관리자 페이지",
};

const AdminPage = async () => {
  return (
    <div className="flex flex-col">
      <h2>관리자 페이지</h2>
      <Link href="/admin/schedule">일정 보기</Link>
      <LogoutButton />
    </div>
  );
};

export default AdminPage;
