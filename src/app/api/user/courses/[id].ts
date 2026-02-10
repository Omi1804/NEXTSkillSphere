import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { authenticateUser } from "@/lib";

const prisma = new PrismaClient();

//purchase the course
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    await authenticateUser(req, res);

    const courseId: any = req.query.id;
    const userEmail: any = req.headers.userEmail;

    const existingCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!existingCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        courses: {
          connect: { id: courseId },
        },
      },
      include: {
        courses: true,
      },
    });
    res.status(200).json({
      message: "Course purchased successfully",
      userDetails: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error", err });
  } finally {
    await prisma.$disconnect();
  }
}
