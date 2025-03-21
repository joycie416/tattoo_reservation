import { reservationStore, scheduleStore } from "@/store/dateStore";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";

const useConditionalDateAtom = () => {
  const pathname = usePathname();
  const isReservation = pathname.startsWith("/reservation");

  const [reservationState, setReservationState] = useAtom(reservationStore);
  const [scheduleState, setScheduleState] = useAtom(scheduleStore);

  return isReservation
    ? ([reservationState, setReservationState] as const)
    : ([scheduleState, setScheduleState] as const);
};

export default useConditionalDateAtom;

export type ConditionalDateAtomType = ReturnType<typeof useConditionalDateAtom>;
