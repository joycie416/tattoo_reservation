import { Reservation } from "@/types/supabase";

const dayToString = ["일", "월", "화", "수", "목", "금", "토"];

export const parseReservation = (reservation: Reservation) => {
  console.log(reservation.created_at);
  const registerDate = new Date(reservation.created_at);
  const registerDay = registerDate.getDay();
  const registerDayString = dayToString[registerDay];
  const registerTime = Number(
    reservation.created_at.split("T")[1].split(":")[0]
  );
  const registerAmpm = registerTime < 12 ? "오전" : "오후";

  const wantDate = new Date(reservation.date);
  const wantDay = wantDate.getDay();
  const wantDayString = dayToString[wantDay];
  const wantTime = Number(reservation.time.split(":")[0]);
  const wantAmpm = wantTime < 12 ? "오전" : "오후";

  return [
    `${reservation.created_at
      .split("T")[0]
      .replaceAll("-", ".")} (${registerDayString}) ${registerAmpm} ${
      registerTime - 12 > 0 ? registerTime - 12 : registerTime
    }시`,
    `${reservation.date.replaceAll("-", ".")} (${wantDayString}) ${wantAmpm} ${
      wantTime - 12 > 0 ? wantTime - 12 : wantTime
    }시`,
  ];
};
