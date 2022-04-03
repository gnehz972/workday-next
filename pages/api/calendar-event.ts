import type { NextApiRequest, NextApiResponse } from "next";
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
      const result = await saveEvent(body);

      console.log(result);
      res.status(200).json("result");
      break;
    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
