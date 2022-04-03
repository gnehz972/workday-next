import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../utils/mongodb";
import { CalendarEvent } from "../../models/CalendarEvent";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const body = req.body;
      console.log("body=", body);
      const { db } = await connectToDatabase();
      const result = (await db
        .collection("Event")
        .find({})
        .toArray()) as CalendarEvent[];

      console.log(result);
      res.status(200).json("result");
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
