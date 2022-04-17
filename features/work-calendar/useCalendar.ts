import { useCallback, useMemo, useState } from "react";
import { CalendarEvent } from "../../data/models/CalendarEvent";
import { TimeSlot } from "../../data/models/TimeSlot";

export const useCalendar = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot>();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

  const handleSelectSlot = useCallback(({ start, end }) => {
    setSelectedTimeSlot({ start, end });
  }, []);

  const handleSelectEvent = useCallback((event) => {
    setSelectedEvent(event);
  }, []);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const clearSelectedEvent = () => {
    setSelectedEvent(undefined);
  };

  const clearSelectedTimeSlot = () => {
    setSelectedTimeSlot(undefined);
  };

  return {
    defaultDate,
    scrollToTime,
    handleSelectEvent,
    handleSelectSlot,
    selectedTimeSlot,
    selectedEvent,
    clearSelectedEvent,
    clearSelectedTimeSlot,
  };
};
