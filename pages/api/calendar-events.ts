import type { NextApiRequest, NextApiResponse } from "next";
import { getAllEventByRange } from "../../data/db/db-utils";
import { parseQueryDate } from "../../utils/date-utils";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../features/auth/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, session } = req;
  const user = session.user;

  if (!user || !user.username) {
    res.status(401).end();
    return;
  }

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
      res.json(events);
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
