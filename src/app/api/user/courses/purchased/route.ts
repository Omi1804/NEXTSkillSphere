import { authenticateUser } from "@/lib";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const user = await authenticateUser(req);
    const userEmail = user?.email;

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
      return NextResponse.json(
        { Courses: userCourses.courses },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error finding course:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
