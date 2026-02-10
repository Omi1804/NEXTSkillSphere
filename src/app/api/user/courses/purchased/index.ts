import { NextApiRequest, NextApiResponse } from "next";
import { authenticateUser } from "@/lib";
import { PrismaClient } from "@prisma/client";

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

    const userEmail: any = req.headers.userEmail;

    const userCourses = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
      select: {
        courses: {
          select: {
            id: true,
            imageLink: true,
            price: true,
            time: true,
            level: true,
            heading: true,
            description: true,
            category: true,
            instructor: true,
          },
        },
      },
    });

    if (userCourses) {
      res.status(200).json({ Courses: userCourses.courses });
    }
  } catch (error) {
    console.error("Error finding course:", error);
    res.status(500).send({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
