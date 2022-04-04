import { getAllEventByRange, getAllEventOfCurrentMonth } from "./db-helper";
import { Workbook } from "exceljs";
import {
  addDays,
  differenceInDays,
  endOfMonth,
  format,
  getDaysInMonth,
  startOfMonth,
} from "date-fns";
import { da } from "date-fns/locale";
import { CalendarEvent } from "../models/CalendarEvent";
import { DayEvent } from "../models/DayEvent";
import { chain, find, flow, groupBy, map, orderBy } from "lodash";
import { getDaysBetweenDates, splitToDayEvent } from "./date-helper";

export const exportExcel = async (startTime: Date, endTime: Date) => {
  const allEvent = await getAllEventByRange(startTime, endTime);

  console.log("allevent=", allEvent);

  const workbook = new Workbook();
  workbook.creator = "work-day";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("My Sheet", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  const columns = [{ header: "姓名", width: 10 }];

  const date = new Date();
  const start = startOfMonth(date);
  const end = endOfMonth(date);
  const monthDays = getDaysBetweenDates(start, end);
  monthDays.forEach((day) => {
    const formated = formatDateAsHeader(day);
    columns.push({
      header: formated,
      width: 10,
    });
  });
  console.log("columns=", columns);

  sheet.columns = columns;

  const dayEvents = splitToDayEvent(allEvent);

  console.log("dayEvents=", dayEvents);

  const rows = chain(dayEvents)
    .groupBy("employee")
    .toPairs()
    .map((pair) => {
      const employee = pair[0];
      const shifts = monthDays.map((day) => {
        return find(pair[1], (event) => event.day.getTime() === day.getTime())
          ?.shift;
      });

      return [employee, ...shifts];
    })
    .value();

  console.log("rows=", rows);

  sheet.addRows(rows);
  return workbook.xlsx.writeBuffer();

  //   await workbook.xlsx.writeFile("export.xlsx");
};

const formatDateAsHeader = (day: Date) => format(day, "yyyy年MM月dd日");
