import type { NextApiRequest, NextApiResponse } from "next";
import { jsonReceiver } from "../../utils/date-helper";
import { deleteEvent, saveEvent } from "../../utils/db-helper";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../auth/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, session } = req;
  const user = session.user;

  if (!user || !user.username) {
    res.status(401).end();
    return;
  }

  switch (method) {
    case "PUT":
      const body = req.body;
      console.log("body=", body);

      const event = JSON.parse(JSON.stringify(body), jsonReceiver);
      console.log("event=", event);

      const result = await saveEvent(event);

      console.log(result);
      res.json(result);
      break;
    case "DELETE":
      const id = req.body;
      console.log("DELETE id=", id);
      const deleteResult = await deleteEvent(id);
      console.log(deleteResult);
      res.json(deleteResult);
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
