import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, authenticateAdmin } from "@/lib";
import { Courses } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await connectToDb();
      await authenticateAdmin(req, res);

      const newCourse = req.body;
      await Courses.create(newCourse);

      res
        .status(200)
        .json({ message: "Course Created successfully", course: newCourse });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else if (req.method === "GET") {
    try {
      await connectToDb();
      await authenticateAdmin(req, res);

      const courses = await Courses.find({});
      res.status(200).json(courses);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).end();
  }
}
