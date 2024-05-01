import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authenticateAdmin } from "@/lib";
import { Courses } from "@/models";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //creating a new Courses
  if (req.method === "POST") {
    try {
      await authenticateAdmin(req, res);

      const newCourse = req.body;
      // await Courses.create(newCourse);
      await prisma.courses.create({
        data: {
          imageLink: newCourse.imageLink,
          price: newCourse.price,
          time: newCourse.time,
          level: newCourse.level,
          heading: newCourse.heading,
          description: newCourse.description,
          category: newCourse.category,
          instructor: newCourse.instructor,
        },
      });

      res
        .status(200)
        .json({ message: "Course Created successfully", course: newCourse });
    } catch (error: any) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    } finally {
      await prisma.$disconnect();
    }
    //Get all the courses
  } else if (req.method === "GET") {
    try {
      // await connectToDb();
      await authenticateAdmin(req, res);

      // const courses = await Courses.find({});
      const courses = await prisma.courses.findMany();

      res.status(200).json(courses);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  } else {
    return res.status(405).end();
  }
}
