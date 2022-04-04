import type { NextApiRequest, NextApiResponse } from "next";
import { receiver } from "../../utils/date-helper";
import { saveEvent } from "../../utils/db-helper";
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
      res.status(200).json("result");
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
