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

  return [current, current.split(' ')[0]];
};
