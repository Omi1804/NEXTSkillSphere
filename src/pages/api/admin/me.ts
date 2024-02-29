import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, authenticateAdmin } from "@/lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await connectToDb();
    await authenticateAdmin(req, res);

    const { userEmail } = req.headers;

    if (userEmail) {
      res.status(200).json({ email: userEmail });
    } else {
      res.status(404).json({ message: "Invalid email" });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
}
