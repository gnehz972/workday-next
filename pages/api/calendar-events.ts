import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import { CalendarEvent } from "../../models/CalendarEvent";
import { getAllEventByRange } from "../../utils/db-helper";
import { parseQueryDate } from "../../utils/date-helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const { query } = req;
      const start = query.start as string;
      const end = query.end as string;

      const events = await getAllEventByRange(
        parseQueryDate(start),
        parseQueryDate(end)
      );

      console.log(events);
      res.status(200).json(events);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
