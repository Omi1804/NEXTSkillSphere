import { AuthError } from "@/config/authTokens";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { deleteCourseById, updateCourseById } from "@/services/admin.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // to grab the id from the route URL [id]
) {
  try {
    await authenticateAdmin(req);

    const courseId = (await context.params)?.id;
    const newCourseData = await req.json();

    const updatedCourse = await updateCourseById(courseId, newCourseData);

    return NextResponse.json({
      message: "Course Updated successfully",
      course: updatedCourse,
    });
  } catch (err: any) {
    console.error("Error finding course:", err);

    if (err instanceof AuthError) {
      return NextResponse.json(
        { message: err.message },
        { status: err.status },
      );
    }

    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
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

    const deletedCourse = await deleteCourseById(courseId);

    return NextResponse.json({
      message: "Course successfully deleted.",
      course: deletedCourse,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof AuthError) {
      return NextResponse.json(
        { message: error.message },
        { status: error.status },
      );
    }

    return NextResponse.json(
      { message: "Record to delete does not exist.", error },
      { status: 500 },
    );
  }
}
