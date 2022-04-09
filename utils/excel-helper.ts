import { Workbook } from "exceljs";
import { getDaysBetweenDates, splitToDayEvent } from "./date-helper";
import { getAllEventByRange } from "./db-helper";
import { CalendarEvent } from "../models/CalendarEvent";
import { chain, find } from "lodash";
import { format } from "date-fns";

export const exportExcel = async (startTime: Date, endTime: Date) => {
  const allEvent = await getAllEventByRange(startTime, endTime);

  console.log("allevent=", allEvent);

  const workbook = new Workbook();
  workbook.creator = "work-day";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("My Sheet", {
    properties: { tabColor: { argb: "FFC0000" } },
  });

  const columns = generateHeader(startTime, endTime).map((it) => ({
    header: it,
    width: 10,
  }));

  console.log("columns=", columns);

  sheet.columns = columns;

  const dayEvents = splitToDayEvent(allEvent);

  console.log("dayEvents=", dayEvents);

  const rows = generateRow(startTime, endTime, allEvent);

  console.log("rows=", rows);

  sheet.addRows(rows);
  return workbook.xlsx.writeBuffer();

  //   await workbook.xlsx.writeFile("export.xlsx");
};

const generateHeader = (startTime: Date, endTime: Date) => {
  const header = ["姓名"];
  const monthDays = getDaysBetweenDates(startTime, endTime);
  monthDays.forEach((day) => {
    const formatted = formatDateAsHeader(day);
    header.push(formatted);
  });

  return header;
};

const generateRow = (
  startTime: Date,
  endTime: Date,
  allEvents: CalendarEvent[]
) => {
  const dayEvents = splitToDayEvent(allEvents);
  const monthDays = getDaysBetweenDates(startTime, endTime);

  return chain(dayEvents)
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
};

const formatDateAsHeader = (day: Date) => format(day, "yyyy年MM月dd日");
