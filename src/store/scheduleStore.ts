import { getCurrentTime } from "@/utils/schedule";
import { atomWithReset } from "jotai/utils";

type ScheduleType = {date: string}

export const scheduleStore = atomWithReset<ScheduleType>({date: getCurrentTime()[0].split(' ')[0]});

