import { ReactNode } from "react";
import { Provider } from "jotai";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '일정 보기'
}

const ScheduleLayout = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ScheduleLayout;
