"use client";

import { useGetUserReservation } from "@/hooks/useUserReservation";
import { searchStore } from "@/store/searchStore";
import { formatContact } from "@/utils/schedule";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ResultCard from "./ResultCard";

const SearchResultsList = () => {
  const router = useRouter();
  const searchData = useAtomValue(searchStore);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    contact: string;
    instagram: string;
  }>({ name: searchData.name, contact: "", instagram: searchData.instagram });

  const { data: searchResults } = useGetUserReservation(
    searchData.name,
    searchData.instagram,
    searchData.password
  );

  useEffect(() => {
    if (!!searchResults && searchResults.length > 0) {
      setUserInfo((prev) => ({ ...prev, contact: searchResults[0].contact }));
    }
  }, [searchResults]);

  useEffect(() => {
    if (!searchData.name) {
      alert("올바른 접근이 아닙니다. 예약 확인 페이지로 이동합니다.");
      router.replace("/search");
    }
  }, []);

  return (
    <div>
      <div className="p-6 space-y-2">
        <div className="space-y-4">
          <h3 className="text-title-md">예약 정보</h3>
          <p className="text-body">* 예약 접수 시 입력한 고객님 정보입니다.</p>
        </div>
        <div className="px-6 py-4 grid grid-cols-[repeat(2,_max-content)] gap-x-6 gap-y-2 bg-button rounded-md">
          <p className="text-body text-font2">성함</p>
          <p className="text-body">{userInfo.name}</p>
          <p className="text-body text-font2">연락처</p>
          <p className="text-body">{formatContact(userInfo.contact)}</p>
          <p className="text-body text-font2">인스타 ID</p>
          <p className="text-body">{userInfo.instagram}</p>
        </div>
      </div>
      <hr className="h-[3px] border-0 bg-gray-10" />
      <div className="p-6 space-y-4">
        <h3 className="text-title-md">예약 목록</h3>
        <div className="space-y-2">
          {(searchResults ?? []).map((result) => (
            <ResultCard reservation={result} key={result.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsList;
