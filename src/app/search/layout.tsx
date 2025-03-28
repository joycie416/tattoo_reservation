import { Provider } from "jotai";
import { ReactNode } from "react";

const ReservationSearchLayout = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default ReservationSearchLayout;
