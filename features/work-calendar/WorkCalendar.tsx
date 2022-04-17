import { Box } from "@mui/system";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import zhCN from "date-fns/locale/zh-CN";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { find } from "lodash";
import { FC } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { CalendarEvent } from "../../data/models/CalendarEvent";
import { Employee } from "../../data/models/Employee";
import { AddEventDialog } from "./AddEventDialog";
import { DeleteEventDialog } from "./DeleteEventDialog";
import { useWorkCalendar } from "./useWorkCalendar";
import { useCalendar } from "./useCalendar";

const locales = {
  "zh-CN": zhCN,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const messages = {
  date: "日期",
  time: "时间",
  event: "安排",
  allDay: "全天",
  week: "周",
  day: "天",
  month: "月",
  previous: "往前",
  next: "往后",
  yesterday: "昨天",
  tomorrow: "明天",
  today: "今天",
  agenda: "排班",
  noEventsInRange: "该时间范围内没有安排",
};

type Props = {
  visible: boolean;
  employees: Employee[];
};

export const WorkCalendar: FC<Props> = ({ visible, employees }) => {
  const { events, saveCalendarEvent, deleteCalendarEvent } = useWorkCalendar();
  const {
    defaultDate,
    scrollToTime,
    handleSelectEvent,
    handleSelectSlot,
    selectedTimeSlot,
    selectedEvent,
    clearSelectedTimeSlot,
    clearSelectedEvent,
  } = useCalendar();

  if (!visible) {
    return null;
  }

  return (
    <Box>
      <Calendar
        culture={"zh-CN"}
        defaultView={Views.MONTH}
        events={events}
        localizer={localizer}
        messages={messages}
        views={["month"]}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        eventPropGetter={eventPropGetter(employees)}
        style={{ height: 1400 }}
      />
      {selectedTimeSlot && (
        <AddEventDialog
          employees={employees}
          saveEvent={saveCalendarEvent}
          timeSlot={selectedTimeSlot}
          close={clearSelectedTimeSlot}
        />
      )}
      {selectedEvent && (
        <DeleteEventDialog
          event={selectedEvent}
          deleteEvent={deleteCalendarEvent}
          close={clearSelectedEvent}
        />
      )}
    </Box>
  );
};

const eventPropGetter = (employees: Employee[]) => (event: CalendarEvent) => {
  const backgroundColor =
    find(employees, (it) => it.name === event.employee)?.group === "A"
      ? "#FCE4D6"
      : "#DCEBF7";
  return { style: { backgroundColor, color: "black" } };
};
