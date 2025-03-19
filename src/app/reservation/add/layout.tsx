import { Provider } from "jotai";
import { ReactNode } from "react";

const ReservationAddLayout = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ReservationAddLayout;
