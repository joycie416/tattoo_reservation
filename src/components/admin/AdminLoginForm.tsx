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
    <div className="w-full self-center">
      <form
        onSubmit={handleSubmit}
        className="w-full p-5 flex flex-col gap-4 bg-white border border-guide rounded-md"
      >
        <h2 className="mx-auto">관리자 로그인</h2>
        <div className="flex flex-col">
          <label>이메일</label>
          <input
            type="email"
            name="email"
            className="px-3 py-2 border border-background rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            className="px-3 py-2 border border-background rounded-md"
          />
        </div>
        <button className="h-[42px] bg-button rounded-md">로그인</button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
