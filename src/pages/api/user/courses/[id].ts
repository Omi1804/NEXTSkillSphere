import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, authenticateUser } from "@/lib";
import { Users, Courses } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await connectToDb();
    await authenticateUser(req, res);

    const courseId = req.query.id;
    const userEmail = req.headers.userEmail;

    const existingCourse = await Courses.findById(courseId);
    if (existingCourse) {
      const user = await Users.findOne({
        email: userEmail,
      });
      if (user) {
        user.purchasedCourses.push(existingCourse._id);
        await user.save();
        res.status(200).json({ message: "Course purchased successfully!" });
      } else {
        res.status(403).json({ message: "Please singin first!" });
      }
    } else {
      res.status(404).json({ message: "Requested Course not found!" });
    }
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
}
