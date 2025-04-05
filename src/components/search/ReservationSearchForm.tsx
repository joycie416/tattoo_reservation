"use client";

import { useGetUserReservation } from "@/hooks/useUserReservation";
import { searchStore } from "@/store/searchStore";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ReservationSearchForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useAtom(searchStore);
  const resetFormData = useResetAtom(searchStore);
  const [isFilled, setIsFilled] = useState([false, false, false]);

  const onAction = (form: FormData) => {
    if (
      !!form.get("name") &&
      !!form.get("instagram") &&
      !!form.get("password")
    ) {
      setFormData({
        name: form.get("name")?.toString() ?? "",
        instagram: form.get("instagram")?.toString() ?? "",
        password: form.get("password")?.toString() ?? "",
      });
    }
  };

  const { data, isLoading } = useGetUserReservation(
    formData.name,
    formData.instagram,
    formData.password
  );

  useEffect(() => {
    resetFormData();
  }, []);

  useEffect(() => {
    if (!!data && data.length > 0) {
      router.push("/search/result");
    }
    if (!!data && data.length === 0) {
      alert("등록한 정보를 확인해주세요.");
    }
  }, [data]);
  return (
    <>
      <form action={onAction} className="w-full space-y-6 my-auto">
        <h3 className="text-title-lg">예약 시 등록한 정보를 입력해주세요.</h3>
        <div className="w-full space-y-2">
          <div className="space-y-2">
            <label htmlFor="name">예약하신 분 성함을 입력해주세요.</label>
            <input
              id="name"
              name="name"
              placeholder="이름을 입력해주세요"
              // value={formData.name}
              onChange={(e) => {
                e.target.value = e.target.value.trim();
                setIsFilled((prev) => {
                  const newFilled = [...prev];
                  newFilled[0] = !!e.target.value;
                  return newFilled;
                });
              }}
              className="w-full placeholder:text-gray-70 placeholder:text-body-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="instagram">인스타그램 ID를 입력해주세요.</label>
            <input
              id="instagram"
              name="instagram"
              placeholder="@을 뺀 아이디를 입력해주세요"
              onChange={(e) => {
                e.target.value = e.target.value.trim().toLowerCase();
                setIsFilled((prev) => {
                  const newFilled = [...prev];
                  newFilled[1] = !!e.target.value;
                  return newFilled;
                });
              }}
              className="w-full placeholder:text-gray-70 placeholder:text-body-md"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">
              예약 확인용 비밀번호를 입력해주세요.
            </label>
            <input
              id="password"
              name="password"
              type="password"
              pattern="[0-9]*" // 일부 안드로이드 브라우저 숫자 키패드 트리거
              inputMode="numeric" // 모바일에서 숫자 키패드 표시
              maxLength={4}
              placeholder="숫자 4자리를 입력해주세요"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "");
                setIsFilled((prev) => {
                  const newFilled = [...prev];
                  newFilled[2] = !!e.target.value;
                  return newFilled;
                });
              }}
              className="w-full placeholder:text-gray-70 placeholder:text-body-md"
            />
          </div>
        </div>
        <button
          disabled={!isFilled.every((filled) => filled)}
          className="w-full h-11 flex justify-center items-center bg-gray-70 rounded-md text-button-md text-gray-10 disabled:bg-gray-30"
        >
          확인
        </button>
      </form>
      {isLoading && <div className="absolute top-0 bg-gray-100 z-10"></div>}
    </>
  );
};

export default ReservationSearchForm;
