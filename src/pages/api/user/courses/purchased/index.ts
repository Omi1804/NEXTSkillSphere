import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, authenticateUser } from "@/lib";
import { Users } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await connectToDb();
    await authenticateUser(req, res);

    const userEmail = req.headers.userEmail;
    const userCourses = await Users.findOne({
      email: userEmail,
    }).populate("purchasedCourses");
    if (userCourses) {
      res.status(200).json(userCourses.purchasedCourses);
    }
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
