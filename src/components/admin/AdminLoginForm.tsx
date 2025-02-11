"use client";

import { login } from "@/api/auth";
import { LoginType } from "@/types/auth";

const AdminLoginForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const error = await login(data as LoginType);
    console.log(error);

    if (error) {
      alert(`${error.name}: ${error.code}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[300px] flex flex-col gap-4 p-5 sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100"
    >
      <h2 className="mx-auto">관리자 로그인</h2>
      <div className="flex flex-col">
        <label>이메일</label>
        <input type="email" name="email" className="px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label>비밀번호</label>
        <input type="password" name="password" className="px-3 py-2" />
      </div>
      <button>로그인</button>
    </form>
  );
};

export default AdminLoginForm;
