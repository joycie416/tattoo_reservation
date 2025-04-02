"use client";

import { login } from "@/api/auth";
import { LoginType } from "@/types/auth";
import { useState } from "react";

const AdminLoginForm = () => {
  const [disable, setDisable] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const error = await login(data as LoginType);
    console.error(error);

    if (error) {
      alert(`로그인 실패: ${error.name}`);
    }
  };

  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    setDisable(!formData.get("id") || !formData.get("password"));
  };

  return (
    <div className="w-full self-center">
      <form
        onSubmit={onSubmit}
        onChange={onChange}
        className="w-full flex flex-col gap-6"
      >
        <h2 className="mx-auto text-title-lg">로그인해주세요</h2>
        <div className="space-y-2">
          <div className="flex flex-col gap-2">
            <label className="text-subtitle-md">사용자 아이디</label>
            <input type="id" name="id" placeholder="아이디를 입력해주세요" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-subtitle-md">비밀번호</label>
            <input
              type="password"
              name="password"
              placeholder="영문, 숫자, 특수문자를 포함한 비밀번호를 입력해주세요"
            />
          </div>
        </div>
        <button
          disabled={disable}
          className="h-11 bg-gray-70 rounded-md text-button-md text-gray-10 disabled:bg-gray-30"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default AdminLoginForm;
