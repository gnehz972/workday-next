import { useFetchEvent } from "../../usecases/useFetchEvent";
import { getCurrentMonthSpan } from "../../utils/date-utils";
import { useEffect } from "react";
import { deleteEvent, putEvent } from "../../data/data-access/requestor";
import { CalendarEvent } from "../../data/models/CalendarEvent";
import { useSnackbar } from "notistack";
import { useRequest } from "../../data/data-access/useRequest";

export const useWorkCalendar = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { request } = useRequest();

  const { events, fetchEvent, appendEvent } = useFetchEvent(
    getCurrentMonthSpan()
  );

  useEffect(() => {
    fetchEvent();
  }, []);

  const saveCalendarEvent = async (event: CalendarEvent) => {
    const { data, errorMsg } = await request(putEvent(event));
    if (data) {
      appendEvent(event);
      enqueueSnackbar("添加成功", { variant: "success" });
    } else {
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };

  const deleteCalendarEvent = async (event: CalendarEvent) => {
    const { data, errorMsg } = await request(deleteEvent(event));
    if (data) {
      enqueueSnackbar("删除成功");
    } else {
      enqueueSnackbar(errorMsg, { variant: "error" });
    }
  };

  return { events, saveCalendarEvent, deleteCalendarEvent };
};
