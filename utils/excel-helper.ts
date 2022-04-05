import { endOfMonth, format, startOfMonth } from "date-fns";
import { Workbook } from "exceljs";
import { chain, find } from "lodash";
import { getDaysBetweenDates, splitToDayEvent } from "./date-helper";
import { getAllEventByRange } from "./db-helper";

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
