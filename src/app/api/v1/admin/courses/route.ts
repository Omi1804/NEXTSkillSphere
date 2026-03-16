import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { Course, CourseCreateInput } from "@/types/course.types";
import { handleApiError } from "@/errors/apiErrorHandler";
import { createCourse, getAllCourses } from "@/repositories/courses.repository";

export async function GET(req: NextRequest) {
  try {
    await authenticateAdmin(req);

    const courses: Course[] = await getAllCourses();

    return NextResponse.json(courses, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return handleApiError(error, error?.message || "Internal server error");
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await authenticateAdmin(req);

    const newCourse: CourseCreateInput = await req.json();

    if (!newCourse?.title || !newCourse?.description || typeof newCourse?.price !== "number") {
      throw new Error("title, description and numeric price are required");
    }

    const created = await createCourse(newCourse, admin.id);

    return NextResponse.json(
      { message: "Course Created successfully", course: created },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);
    return handleApiError(error, error?.message || "Internal server error");
  }
}
