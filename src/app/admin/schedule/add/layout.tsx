import { ReactNode } from "react";
import { Provider } from "jotai";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: '일정 등록'
}

const ScheduleLayout = ({ children }: { children: ReactNode }) => {
  // 일정 등록 후 원래 페이지로 돌아와도 선택한 날짜가 유지됨
  return <Provider>{children}</Provider>;
};

export default ScheduleLayout;
