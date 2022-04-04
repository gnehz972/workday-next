import { parse, format, differenceInDays, addDays } from "date-fns";
import { CalendarEvent } from "../models/CalendarEvent";
import { DayEvent } from "../models/DayEvent";

const queryDatePattern = "yyyyMMdd";

export const parseQueryDate = (dateString: string) =>
  parse(dateString, queryDatePattern, new Date());

export const formatQueryDate = (date: Date) => format(date, queryDatePattern);

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;

export const receiver = (key: string, value: any) => {
  if (typeof value === "string" && dateFormat.test(value)) {
    console.log("zoz receiver", value);

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
  const dayCount = differenceInDays(end, start);
  console.log("dayCount=", dayCount);

  const days = [];
  for (let count = 0; count < dayCount; count++) {
    const day = addDays(start, count);
    days.push(day);
  }
  return days;
};
