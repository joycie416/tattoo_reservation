'use client';

import { logout } from "@/api/auth";

const LogoutButton = () => {
  // const router = useRouter();
  const handleLogout = async () => {
    const error = await logout();
    if (!error) {
      alert("로그아웃 되었습니다.");
      // // 로그아웃 후 새로고침 : 관리자 로그인 페이지로 이동
      // router.refresh();
    }
  };
  return (
    <button onClick={handleLogout} className="w-fit">
      로그아웃
    </button>
  );
};

export default LogoutButton;
