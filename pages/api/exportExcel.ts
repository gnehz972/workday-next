import type { NextApiRequest, NextApiResponse } from "next";
import { exportExcel } from "../../utils/excel-utils";
import { parseQueryDate } from "../../utils/date-utils";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../features/auth/session";

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method,query, session } = req;
  const user = session.user;

  if (!user || !user.username) {
    res.status(401).end();
    return;
  }

  switch (method) {
    case "GET":
      const start = query.start as string;
      const end = query.end as string;
      console.log("parsed start=", parseQueryDate(start));
      console.log("parsed end=", parseQueryDate(end));

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
      res.send(buffer);
      //   res.status(200).json("exportExcel success!");
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
