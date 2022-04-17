import { useState } from "react";
import { CalendarEvent } from "../data/models/CalendarEvent";
import { formatQueryDate } from "../utils/date-utils";
import { fetchEvents } from "../data/data-access/requestor";
import { useRequest } from "../data/data-access/useRequest";
import { TimeSlot } from "../data/models/TimeSlot";

export const useFetchEvent = ({ start, end }: TimeSlot) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { request } = useRequest();

  const fetchEvent = async () => {
    const { data } = await request(
      fetchEvents(formatQueryDate(start), formatQueryDate(end))
    );
    setEvents(data);
  };

  const appendEvent = (event: CalendarEvent) => {
    setEvents((pre) => [...pre, event]);
  };

  return { events, fetchEvent, appendEvent };
};
