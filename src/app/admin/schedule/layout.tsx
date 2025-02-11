import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '일정 보기'
}

const ScheduleLayout = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

export default ScheduleLayout;
