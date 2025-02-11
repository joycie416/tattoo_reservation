"use client";

import { logout } from "@/api/auth-api";
import Link from "next/link";

export default function Home() {
  const handleLogout = async () => {
    const error = await logout();
    if (!error) {
      alert("로그아웃 되었습니다.");
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Link href="/admin/login">관리자 로그인</Link>
      <button onClick={handleLogout} className="w-fit">로그아웃</button>
      <Link href="/schedule" >일정 보기</Link>
    </div>
  );
}
