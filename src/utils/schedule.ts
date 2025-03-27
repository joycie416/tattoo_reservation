import { Schedule } from "@/types/supabase";

const options: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false, // 24시간
};

// 현재 시각 및 날짜를 반환하는 함수
export const getCurrentTime = () => {
  const current = new Date()
    .toLocaleString("ko-KR", options)
    .replace(". ", "-")
    .replace(". ", "-")
    .replace(". ", " ");

  return [current, current.split(" ")[0]];
};

// yyyy-mm-dd 형식으로 변환
export const formatDate = (date: Date) => {
  return date
    .toLocaleString("ko-KR", options)
    .replace(". ", "-")
    .replace(". ", "-")
    .replace(". ", " ")
    .split(" ")[0];
};

// 한달 달력을 주별 array로 반환하는 함수
export const getOneMonth = ([year, month]: [number, number]): [
  string,
  number
][][] => {
  // 이번달 첫
  // const startDate = new Date(year, month - 1, 1).getDate();
  const startDay = new Date(year, month - 1, 1).getDay();
  // 이번달 마지막 요일
  // const endDate = new Date(year, month, 0).getDate();
  const endDay = new Date(year, month, 0).getDay();

  const currentDate = new Date(year, month - 1, 1 - startDay);
  const lastDate = new Date(year, month, 6 - endDay);

  const Month: [string, number][][] = [];
  let week: [string, number][] = [];
  while (currentDate <= lastDate) {
    week.push([formatDate(currentDate), currentDate.getDate()]);
    if (week.length === 7 || currentDate.getDay() === 6) {
      Month.push(week);
      week = [];
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (week.length > 0) {
    Month.push(week);
    week = [];
  }

  if (Month.length < 5) {
    for (let i = 0; i < 7; i++) {
      week.push([formatDate(currentDate), currentDate.getDate()]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    Month.push(week);
  }

  return Month;
};

// 날짜 색 결정하는 함수
export const colorDate = (currentDate: string, date: string, i: number) => {
  const currentMonth = currentDate.split("-")[1];
  const month = date.split("-")[1];
  if (month !== currentMonth) return "text-gray-100";
  if (i === 0) return "text-red-500";
  if (i === 6) return "text-blue-500";
  return "";
};

// 유효한 날짜인지 확인하는 함수
export const isValidDate = (date: string) => {
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(date);
  const [parsedYear, parsedMonth, parsedDay] = [
    parsedDate.getFullYear(),
    parsedDate.getMonth() + 1,
    parsedDate.getDate(),
  ];

  return parsedDay === day && parsedMonth === month && parsedYear === year;
};

type ReservationDataType = {
  user_id: string | null;
  user_name: string;
  contact: string;
};
// const reservationDefaultData = {
//   user_id: null,
//   user_name: "",
//   contact: "",
// };
export const parseSchedule = (
  date: string,
  times: string[],
  reservationData: ReservationDataType = {
    user_id: null,
    user_name: "",
    contact: "",
  }
): Omit<Schedule, "id" | "created_at">[] => {
  const [year, month, parsedDate] = date.split("-");
  const { user_id, user_name, contact } = reservationData;
  const scheduleData = [];

  for (const time of times) {
    scheduleData.push({
      full_date: date,
      year,
      month,
      date: parsedDate,
      time,
      user_id,
      user_name,
      contact,
    });
  }

  return scheduleData;
};

export const sortSchedule = (
  scheduleData: Schedule[]
): [string[], Map<string, Schedule[]>] => {
  const sortedSchedule: Map<string, Schedule[]> = new Map();
  const availableDates: string[] = [];

  scheduleData.forEach((schedule) => {
    const { full_date } = schedule;

    if (!sortedSchedule.has(full_date)) {
      sortedSchedule.set(full_date, [schedule]);
      availableDates.push(full_date);
    } else {
      sortedSchedule.set(full_date, [
        ...(sortedSchedule.get(full_date) ?? []),
        schedule,
      ]);
    }
  });

  return [availableDates, sortedSchedule];
};

export const formatContact = (contact: string): string => {
  if (contact.length <= 3) return contact;
  if (contact.length <= 7) {
    return contact.slice(0, 3) + "-" + contact.slice(3);
  }
  return (
    contact.slice(0, 3) + "-" + contact.slice(3, 7) + "-" + contact.slice(7)
  );
};
