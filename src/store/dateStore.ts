import { getCurrentTime } from "@/utils/schedule";
import { atomWithReset } from "jotai/utils";

// export type ReservationType = {
//   fullDate: string;
//   time: string;
//   name: string;
//   contact: string;
//   part: string;
//   size: string;
//   description: string;
//   images: File[];
// };

export type commmonDateType = {
  date: string;
  today: string;
  time?: string;
  part?: string;
  size?: string;
  description?: string;
  images?: File[];
  name?: string;
  contact?: string;
  instagram?: string;
  password?: string;
};

export const scheduleStore = atomWithReset<commmonDateType>({
  date: getCurrentTime()[1],
  today: getCurrentTime()[1],
});

// const DEFAULT_RESERVATION: ReservationType = {
//   fullDate: "",
//   time: "",
//   name: "",
//   contact: "",
//   part: "",
//   size: "",
//   description: "",
//   images: [],
// };

export const reservationStore = atomWithReset<commmonDateType>({
  date: getCurrentTime()[1],
  today: getCurrentTime()[1],
  time: "",
  name: "",
  contact: "",
  part: "",
  size: "",
  description: "",
  images: [],
});
