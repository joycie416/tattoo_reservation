import { parseSchedule } from "@/utils/schedule";
import browserClient from "@/utils/supabase/client";

export const getSchedules = async (year: string, month: string) => {
  const { data, error } = await browserClient
    .from("schedules")
    .select()
    .eq("year", year)
    .eq("month", month);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const addSchedules = async (date: string, times: string[]) => {
  if (times.length === 0) return null;

  const parsedSchedule = parseSchedule(date, times);

  const { error } = await browserClient
    .from("schedules")
    .insert(parsedSchedule);
  if (error) {
    throw new Error(error.message);
  }
  return null;
};

export const deleteSchedules = async (ids: string[]) => {
  if (ids.length === 0) return null;
  
  const {status} = await browserClient.from('schedules').delete().in('id', ids);
  if (!String(status).startsWith('2')) {
    throw new Error('정상적으로 데이터가 삭제되지 않았습니다.')
  }
  return null;
};
