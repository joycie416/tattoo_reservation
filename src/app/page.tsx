import LogoutButton from "@/components/admin/LogoutButton";
import Link from "next/link";

export default function Home() {

  return (
    <div className="w-full min-h-screen flex flex-col">
      <h2>메인 페이지</h2>
      <Link href="/admin/login">관리자 로그인</Link>
      <LogoutButton />
      <Link href="/schedule">일정 보기</Link>
    </div>
  );
}
