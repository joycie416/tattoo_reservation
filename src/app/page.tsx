import LogoutButton from "@/components/admin/LogoutButton";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container flex flex-col">
      <h2>메인 페이지</h2>
      <hr className="border-black" />
      <p className="mx-auto">관리자 서비스</p>
      <Link href="/admin/login">관리자 로그인</Link>
      <LogoutButton />
      <Link href="/admin/schedule">일정 보기</Link>
      <hr className="border-black" />
      <p className="mx-auto">손님 서비스</p>
      <Link href="/reservation/add/1">예약하기</Link>
      <Link href="/reservation/search">내 예약 확인하기</Link>
    </div>
  );
}
