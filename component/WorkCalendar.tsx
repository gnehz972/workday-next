import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Box } from "@mui/system";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import zhCN from "date-fns/locale/zh-CN";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { find } from "lodash";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { Shift, ShiftLabel } from "../config/data";
import { CalendarEvent } from "../models/CalendarEvent";
import { Employee } from "../models/Employee";
import { formatReadDate, getCurrentMonthSpan } from "../utils/date-helper";
import { useFetchEvent } from "../data-access/useFetchEvent";

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

  const {events,fetchEvent,appendEvent} = useFetchEvent(getCurrentMonthSpan());

  useEffect(() => {
    fetchEvent();
  }, []);

  console.log("zoz WorkCalendar event=", events);

  // const [myEvents, setEvents] = useState(events);
  const [timeSlot, setTimeSlot] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = useCallback(({ start, end }) => {
    setTimeSlot({ start, end });
    handleClickOpen();
  }, []);

  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent>();

  const handleSelectEvent = useCallback((event) => {
    console.log("zoz selected event=", event);

    setSelectedEvent(event);
  }, []);

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [shift, setShift] = useState(Shift[0]);
  const [employee, setEmployee] = useState(employees[0].name);

  const handleChange = (value: string) => {
    setShift(value);
  };

  const handleEmployeeChange = (value: string) => {
    setEmployee(value);
  };

  const saveCalendarEvent = async () => {
    const event = {
      title: employee + " " + shift,
      employee: employee,
      shift: shift,
      start: timeSlot.start,
      end: timeSlot.end,
      created: new Date(),
    };

    await fetch("/api/calendar-event", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(event),
    });

    appendEvent(event);
    console.log("save");

    setOpen(false);
  };

  const handleDeleteEvent = async (event: CalendarEvent) => {
    await deleteCalendarEvent(event);
    await fetchEvent();
    setSelectedEvent(undefined);
  };

  const deleteCalendarEvent = async (event: CalendarEvent) => {
    await fetch("/api/calendar-event", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(event._id),
    });
    setSelectedEvent(undefined);
  };

  const eventPropGetter = (event: CalendarEvent) => {
    const backgroundColor =
      find(employees, (it) => it.name === event.employee)?.group === "A"
        ? "#FCE4D6"
        : "#DCEBF7";
    return { style: { backgroundColor, color: "black" } };
  };

  if (!visible) {
    return null;
  }

  return (
    <Box>
      <Calendar
        culture={"zh-CN"}
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={events}
        localizer={localizer}
        messages={messages}
        views={["month"]}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        eventPropGetter={eventPropGetter}
        style={{ height: 1400 }}
      />
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>添加排班</DialogTitle>
        <DialogContent>
          <DialogContentText>选择排班人员和班次</DialogContentText>

          <FormControl fullWidth margin={"normal"}>
            <InputLabel id="demo-simple-select-label">排班</InputLabel>

            <Select
              value={shift}
              label="排班"
              onChange={(e: any) => handleChange(e.target.value)}
            >
              {Shift.map((shift, index) => (
                <MenuItem key={index} value={shift}>
                  {ShiftLabel[index]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin={"normal"}>
            <InputLabel>职员</InputLabel>

            <Select
              value={employee}
              label="职员"
              onChange={(e: any) => handleEmployeeChange(e.target.value)}
            >
              {employees.map((employee, index) => (
                <MenuItem key={index} value={employee.name}>
                  {employee.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={saveCalendarEvent}>添加</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={selectedEvent != undefined} fullWidth>
        <DialogTitle>排班安排</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {selectedEvent && selectedEvent.title}
            <br></br>
            开始时间：
            {selectedEvent && formatReadDate(selectedEvent.start)}
            <br></br>
            结束时间：
            {selectedEvent && formatReadDate(selectedEvent.end)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedEvent(undefined)}>取消</Button>
          <Button onClick={() => handleDeleteEvent(selectedEvent!!)}>
            删除
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
