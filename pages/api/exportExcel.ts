import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import { CalendarEvent } from "../../models/CalendarEvent";
import { exportExcel } from "../../utils/excel-helper";
import { parse } from "date-fns";
import { parseQueryDate } from "../../utils/date-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method, query } = req;

  switch (method) {
    case "GET":
      const start = query.start as string;
      const end = query.end as string;

      const buffer = await exportExcel(
        parseQueryDate(start),
        parseQueryDate(end)
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "report.xlsx"
      );
      res.status(200).send(buffer);
      //   res.status(200).json("exportExcel success!");
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
