import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "@/lib";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await authenticateUser(req, res);

    // const courses = await Courses.find({ published: true });
    const courses = await prisma.course.findMany({});

    res.status(200).json({ allCourses: courses });
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).send({ message: "Internal Server Error", error });
  } finally {
    await prisma.$disconnect();
  }
}
