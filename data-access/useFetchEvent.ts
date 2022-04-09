import { useState } from "react";
import { CalendarEvent } from "../models/CalendarEvent";
import { formatQueryDate, jsonReceiver } from "../utils/date-helper";
import { useRouter } from "next/router";

export const useFetchEvent = ({ start, end }: { start: Date; end: Date }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const router = useRouter();

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

    if (!response.ok) {
      if (response.status == 401) {
        router.replace("/login");
      }
      return;
    }

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
