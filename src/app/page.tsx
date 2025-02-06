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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button onClick={handleLogout}>로그아웃</button>
      <Link href="/admin/login">관리자 로그인</Link>
    </div>
  );
}
