import { authenticateUser } from "@/lib";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const user = await authenticateUser(req);

    const courseId: any = (await context.params).id;
    const userEmail: any = user?.email;

    const existingCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!existingCourse) {
      return NextResponse.json(
        { message: "Course not found" },
        { status: 404 },
      );
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
    return NextResponse.json(
      {
        message: "Course purchased successfully",
        userDetails: updatedUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", err },
      { status: 500 },
    );
  }
}
