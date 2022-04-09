import { useState } from "react";
import { CalendarEvent } from "../models/CalendarEvent";
import { formatQueryDate, jsonReceiver } from "../utils/date-helper";

export const useFetchEvent = ({ start, end }: { start: Date; end: Date }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const fetchEvent = async () => {
    console.log("zoz fetch event");

    const response = await fetch(
      `/api/calendar-events?start=${formatQueryDate(
        start
      )}&end=${formatQueryDate(end)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const content = await response.json();
    const events = JSON.parse(JSON.stringify(content), jsonReceiver);
    console.log("zoz content=", content);
    console.log("zoz events=", events);

    setEvents(events);
  };

  const appendEvent = (event: CalendarEvent) => {
    setEvents((pre) => [...pre, event]);
  };
  return { events, fetchEvent, appendEvent };
};
