import { Tables } from "../../database.types";

export type Schedule = Tables<"schedules">;
export type Reservation = Tables<"user_reservations">;
export type UserReservation = Omit<Reservation, "id" | "created_at">;
export type ConfirmedReservation = Tables<"confirmed_reservations">;
