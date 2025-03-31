import { Provider } from "jotai";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default layout;
