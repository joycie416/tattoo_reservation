import { Provider } from "jotai";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "enan.tt 예약 확인",
  description: "타투 예약 내역을 확인합니다.",
  openGraph: {
    description: "타투 예약 내역을 확인합니다.",
  },
};

const ReservationSearchLayout = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ReservationSearchLayout;
