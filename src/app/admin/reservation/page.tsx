import { getUser } from "@/api/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "관리자 예약 관리 페이지",
};

const ReservationPage = async () => {
  const user = getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return <div>ReservationPage</div>;
};

export default ReservationPage;
