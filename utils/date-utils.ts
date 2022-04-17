import {
  parse,
  format,
  differenceInDays,
  addDays,
  startOfMonth,
  addMonths,
} from "date-fns";
import { CalendarEvent } from "../data/models/CalendarEvent";
import { DayEvent } from "../data/models/DayEvent";

const queryDatePattern = "yyyyMMdd";

export const parseQueryDate = (dateString: string) =>
  parse(dateString, queryDatePattern, new Date());

export const formatQueryDate = (date: Date) => format(date, queryDatePattern);

export const formatReadDate = (date: Date) => format(date, "yyyy年MM月dd日");

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
export const jsonReceiver = (key: string, value: any) => {
  if (typeof value === "string" && dateFormat.test(value)) {
    return new Date(value);
  }

  return value;
};

export const splitToDayEvent = (calendarEvents: CalendarEvent[]) => {
  const dayEvents: DayEvent[] = [];

  calendarEvents.forEach((event) => {
    const days = getDaysBetweenDates(event.start, event.end);
    days.forEach((day) => {
      const dayEvent = {
        day: day,
        shift: event.shift,
        employee: event.employee,
      };
      dayEvents.push(dayEvent);
    });
  });

  return dayEvents;
};

export const getDaysBetweenDates = (start: Date, end: Date) => {
  const days = [];
  let day = start;
  while (day < end) {
    days.push(day);
    day = addDays(day, 1);
  }
  return days;
};

export const getCurrentMonthSpan = () => {
  const start = startOfMonth(new Date());
  const end = addMonths(start, 1);
  return { start, end };
};
