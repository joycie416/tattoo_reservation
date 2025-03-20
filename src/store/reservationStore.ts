import { getCurrentTime } from "@/utils/schedule";
import { atomWithReset } from "jotai/utils";

type ReservationDateType = { date: string; today: string };

export const reservationDateStore = atomWithReset<ReservationDateType>({
  date: getCurrentTime()[1],
  today: getCurrentTime()[1],
});
