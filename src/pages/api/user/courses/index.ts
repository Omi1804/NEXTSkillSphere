import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, authenticateUser } from "@/lib";
import { Courses } from "@/models";

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

    const courses = await Courses.find({ published: true });
    res.status(200).json({ allCourses: courses });
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
