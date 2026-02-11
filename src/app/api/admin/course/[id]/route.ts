import { authenticateAdmin } from "@/lib";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // to grab the id from the route URL [id]
) {
  try {
    await authenticateAdmin(req);

    const courseId = (await context.params).id;
    const newCourseData = await req.json();

    if (!newCourseData || !courseId) {
      return NextResponse.json(
        { message: "Invalid course ID format" },
        { status: 400 },
      );
    }

    const existingCourse = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });
    if (!existingCourse) {
      return NextResponse.json(
        { message: "Course not found!" },
        { status: 404 },
      );
    }

    const updatedCourse = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: newCourseData,
    });

    return NextResponse.json({
      message: "Course Updated successfully",
      course: updatedCourse,
    });
  } catch (err: any) {
    console.error("Error finding course:", err);

    if (err.message === "AUTH_HEADER_MISSING") {
      return NextResponse.json(
        { message: "Authorization header missing!" },
        { status: 401 },
      );
    }

    if (err.message === "ADMIN_NOT_FOUND") {
      return NextResponse.json(
        { message: "Admin not found!" },
        { status: 403 },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // to grab the id from the route URL [id]
) {
  try {
    await authenticateAdmin(req);
    const courseId = (await context.params).id;

    const deleteCourse = await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    return NextResponse.json({
      message: "Course successfully deleted.",
      deleteCourse,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Record to delete does not exist.", error },
      { status: 500 },
    );
  }
}
