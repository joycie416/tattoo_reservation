export const getCurrentTime = () => {
  const current = new Date()
    .toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24시간
    })
    .replace(". ", "-")
    .replace(". ", "-")
    .replace(". ", " ");

  return [current, current.split(" ")[0]];
};

export const formatDate = (date: Date) => {
  return date
    .toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // 24시간
    })
    .replace(". ", "-")
    .replace(". ", "-")
    .replace(". ", " ")
    .split(" ")[0];
};

export const getOneMonth = ([year, month]: [year: number, month: number]) => {
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
