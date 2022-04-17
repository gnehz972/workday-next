import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../features/auth/User";
import { sessionOptions } from "../../../features/auth/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, pwd } = await req.body;
  if (
    username &&
    pwd &&
    username === process.env.USER_NAME &&
    pwd === process.env.USER_PWD
  ) {
    const user = { username: username } as User;
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } else {
    res.status(400).json({ message: "error username or password" });
  }
}
