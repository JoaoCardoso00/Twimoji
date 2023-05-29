import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const Time = (date: Date) => {
  dayjs.extend(relativeTime);
  return dayjs(date);
};
