import { Reservation } from "@/types/supabase";

const dayToString = ["일", "월", "화", "수", "목", "금", "토"];

export const parseReservation = (reservation: Reservation) => {
  const date = new Date(reservation.date);
  const day = date.getDay();
  const dayString = dayToString[day];
  const time = Number(reservation.time.split(":")[0]);
  const ampm = time < 12 ? "오전" : "오후";
  return `${reservation.date.replaceAll("-", ".")} (${dayString}) ${ampm} ${
    time - 12 > 0 ? time - 12 : time
  }시`;
};
