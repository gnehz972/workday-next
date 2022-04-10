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
      if (result && result.acknowledged && result.upsertedId) {
        event.id = result.upsertedId;
        res.json(result);
      } else {
        res.status(400).json({ errorMsg: "添加失败" });
      }
      break;
    case "DELETE":
      const id = req.body;
      console.log("DELETE id=", id);
      const deleteResult = await deleteEvent(id);
      console.log(deleteResult);
      if (
        deleteResult &&
        deleteResult.acknowledged &&
        deleteResult.deletedCount == 1
      ) {
        res.json({ id });
      } else {
        res.status(400).json({ errorMsg: "删除失败" });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
