"use client";

import useConditionalDateAtom from "@/hooks/useConditionalDateAtom";

const CompletePage = () => {
  const [reservation] = useConditionalDateAtom();
  return (
    <div className="w-full">
      <p>예약 완료</p>
      <p>{reservation.date}</p>
    </div>
  );
};

export default CompletePage;
