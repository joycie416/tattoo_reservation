import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "enan.tt 소식·이벤트",
  description: "enan.tt 소식과 이벤트 확인하기",
  openGraph: {
    title: "enan.tt 소식·이벤트",
    description: "enan.tt 소식과 이벤트 확인하기",
  },
};

const layout = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default layout;
