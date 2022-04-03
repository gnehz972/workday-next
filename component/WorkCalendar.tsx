import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { FC, useCallback, useMemo, useState } from "react";
import { CalendarEvent } from "../models/CalendarEvent";
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
  TextField,
} from "@mui/material";
import { connectToDatabase } from "../utils/mongodb";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const eventsSample = [
  // {
  //   title: 'Board meeting xxxx',
  //   start: "2022-03-30T12:51:15.361Z",
  //   end: "2022-03-31T12:51:15.361Z",
  // },
  // {
  //   id: 1,
  //   title: 'MS training',
  //   allDay: true,
  //   start: new Date(2022, 0, 29, 14, 0, 0),
  //   end: new Date(2022, 0, 29, 16, 30, 0),
  //   resourceId: 2,
  // },
  // {
  //   id: 2,
  //   title: 'Team lead meeting',
  //   start: new Date(2022, 0, 29, 8, 30, 0),
  //   end: new Date(2022, 0, 29, 12, 30, 0),
  //   resourceId: 3,
  // },
  // {
  //   id: 11,
  //   title: 'Birthday Party',
  //   start: new Date(2022, 0, 30, 7, 0, 0),
  //   end: new Date(2022, 0, 30, 10, 30, 0),
  //   resourceId: 4,
  // },
];

export type WorkCalendarProps = {
  events: CalendarEvent[];
};

export const WorkCalendar: FC<WorkCalendarProps> = ({ events }) => {
  const [myEvents, setEvents] = useState(events);
  const [timeSlot, setTimeSlot] = useState({
    start: new Date(),
    end: new Date(),
  });

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setTimeSlot({ start, end });
      handleClickOpen();
      // const title = window.prompt('New Event Name')
      // if (title) {
      //   setEvents((prev) => [...prev, { start, end, title } as any])
      // }
    },
    [setEvents]
  );

  const handleSelectEvent = useCallback(
    (event) => window.alert(event.title),
    []
  );

  const { defaultDate, scrollToTime } = useMemo(
    () => ({
      defaultDate: new Date(),
      scrollToTime: new Date(1970, 1, 1, 6),
    }),
    []
  );
  const dayLayoutAlgorithm = "no-overlap";

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [shift, setShift] = useState("白班");
  const [employee, setEmployee] = useState("张三");

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
    // const {db} = await connectToDatabase();

    // await db.collection("Event")
    // .insertOne(event);

    setEvents((pre) => [...pre, event]);
    console.log("save");

    setOpen(false);
  };

  return (
    <div>
      <Calendar
        dayLayoutAlgorithm={dayLayoutAlgorithm}
        defaultDate={defaultDate}
        defaultView={Views.MONTH}
        events={myEvents}
        localizer={localizer}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        style={{ height: 800 }}
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
              <MenuItem value={"白"}>白班</MenuItem>
              <MenuItem value={"中"}>中班</MenuItem>
              <MenuItem value={"晚"}>晚班</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin={"normal"}>
            <InputLabel>职员</InputLabel>

            <Select
              value={employee}
              label="职员"
              onChange={(e: any) => handleEmployeeChange(e.target.value)}
            >
              <MenuItem value={"张三"}>张三</MenuItem>
              <MenuItem value={"李四"}>李四</MenuItem>
              <MenuItem value={"王五"}>王五</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>取消</Button>
          <Button onClick={saveCalendarEvent}>添加</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
