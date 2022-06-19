import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);

export const relativeTimeFromNow = (isoDateString: string): string => dayjs().to(dayjs(isoDateString));
