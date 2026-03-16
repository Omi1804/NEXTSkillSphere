import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import {
  createCourseLessonByIdForAdmin,
  getCourseLessonsByIdForAdmin,
} from "@/services/admin.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await authenticateAdmin(req);

    const courseId = (await context.params).id;
    const lessons = await getCourseLessonsByIdForAdmin(courseId);

    return NextResponse.json({ message: "Lessons fetched successfully", ...lessons }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await authenticateAdmin(req);

    const courseId = (await context.params).id;
    const lessonData = await req.json();

    const createdLesson = await createCourseLessonByIdForAdmin(courseId, lessonData);

    return NextResponse.json(
      {
        message: "Lesson created successfully",
        lesson: createdLesson,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
