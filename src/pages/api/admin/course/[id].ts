import { NextApiRequest, NextApiResponse } from "next";
import { connectToDb, authenticateAdmin } from "@/lib";
import { Courses } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await connectToDb();
      await authenticateAdmin(req, res);

      const newCourseData = req.body;
      const courseId = req.query.id;

      if (!newCourseData || !courseId) {
        return res.status(400).send({ message: "Invalid course ID format" });
      }

      const existingCourse = await Courses.findById(courseId);
      if (!existingCourse) {
        return res.status(404).send({ message: "Course not found!" });
      }

      try {
        const updatedCourse = await Courses.findByIdAndUpdate(
          courseId,
          newCourseData,
          { new: true }
        );
        res.status(200).json({
          message: "Course Updated successfully",
          course: updatedCourse,
        });
      } catch (updateError) {
        console.error("Error updating course:", updateError);
        res.status(500).send({ message: "Error updating course" });
      }
    } catch (error) {
      console.error("Error finding course:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else if (req.method === "DELETE") {
    await connectToDb();
    await authenticateAdmin(req, res);

    const courseId = req.query.id;

    try {
      const deleteCourse = await Courses.deleteOne({ _id: courseId });

      if (deleteCourse.deletedCount === 0) {
        return res.status(404).json({ message: "Course not found." });
      }

      res.json({ message: "Course successfully deleted." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error." });
    }
  } else {
    return res.status(405).end();
  }
}
