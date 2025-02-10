import { getCurrentTime } from "@/utils/schedule";
import { atomWithReset } from "jotai/utils";

type ScheduleType = {date: string; today:string}

export const scheduleStore = atomWithReset<ScheduleType>({date: getCurrentTime()[1], today: getCurrentTime()[1]});

