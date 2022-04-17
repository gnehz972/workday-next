import { FC, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { formatReadDate } from "../../utils/date-utils";
import { CalendarEvent } from "../../data/models/CalendarEvent";

type Props = {
  event: CalendarEvent;
  deleteEvent: (event: CalendarEvent) => void;
  close: () => void;
};
export const DeleteEventDialog: FC<Props> = ({ event, deleteEvent, close }) => {
  return (
    <Dialog open fullWidth>
      <DialogTitle>排班安排</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {event.title}
          <br></br>
          开始时间：
          {formatReadDate(event.start)}
          <br></br>
          结束时间：
          {formatReadDate(event.end)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>取消</Button>
        <Button
          onClick={() => {
            deleteEvent(event);
            close();
          }}
        >
          删除
        </Button>
      </DialogActions>
    </Dialog>
  );
};
