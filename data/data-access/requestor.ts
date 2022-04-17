import { CalendarEvent } from "../models/CalendarEvent";

export const fetchEvents = (start: string, end: string) => () => {
  return fetch(
    `/api/calendar-events?start=${start}
        &end=${end}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
};

export const putEvent = (event: CalendarEvent) => () => {
  return fetch("/api/calendar-event", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(event),
  });
};

export const deleteEvent = (event: CalendarEvent) => () => {
 return  fetch("/api/calendar-event", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(event._id),
  });
};
