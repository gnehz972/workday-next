import type { NextApiRequest, NextApiResponse } from "next";
import { receiver } from "../../utils/date-helper";
import { deleteEvent, saveEvent } from "../../utils/db-helper";
import { connectToDatabase } from "../../utils/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;

  switch (method) {
    case "PUT":
      const body = req.body;
      console.log("body=", body);

      const event = JSON.parse(JSON.stringify(body), receiver);
      console.log("event=", event);

      const result = await saveEvent(event);

      console.log(result);
      res.status(200).json(result);
      break;
    case "DELETE":
      const id = req.body;
      console.log("DELETE id=", id);
      const deleteResult = await deleteEvent(id);
      console.log(deleteResult);
      res.status(200).json(deleteResult);
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
