import { handleApiError } from "@/errors/apiErrorHandler";
import { NotFoundError } from "@/errors";
import { getCourseById } from "@/repositories/courses.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const courseId: string = (await context.params)?.id;

    const course = await getCourseById(courseId);
    if (!course || !course.isPublished) {
      throw new NotFoundError("Course not found");
    }

    return NextResponse.json(
      { message: `Details of Course with id ${courseId}`, course },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
