import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "@/lib";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //update a course
  if (req.method === "PUT") {
    try {
      await authenticateAdmin(req, res);

      const newCourseData = req.body;
      const courseId: any = req.query.id;

      if (!newCourseData || !courseId) {
        return res.status(400).send({ message: "Invalid course ID format" });
      }

      // const existingCourse = await Courses.findById(courseId);
      const existingCourse = await prisma.courses.findUnique({
        where: {
          id: courseId,
        },
      });
      if (!existingCourse) {
        return res.status(404).send({ message: "Course not found!" });
      }

      try {
        const updatedCourse = await prisma.courses.update({
          where: {
            id: courseId,
          },
          data: newCourseData,
        });
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
    } finally {
      await prisma.$disconnect();
    }
    //delete a course
  } else if (req.method === "DELETE") {
    await authenticateAdmin(req, res);

    const courseId: any = req.query.id;

    try {
      const deleteCourse = await prisma.courses.delete({
        where: {
          id: courseId,
        },
      });

      res.json({ message: "Course successfully deleted.", deleteCourse });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Record to delete does not exist.", error });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    return res.status(405).end();
  }
}
