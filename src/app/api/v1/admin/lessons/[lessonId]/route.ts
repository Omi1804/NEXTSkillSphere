import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { deleteLessonByIdForAdmin, updateLessonByIdForAdmin } from "@/services/admin.service";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, context: { params: Promise<{ lessonId: string }> }) {
  try {
    await authenticateAdmin(req);

    const lessonId = (await context.params).lessonId;
    const lessonData = await req.json();

    const updatedLesson = await updateLessonByIdForAdmin(lessonId, lessonData);

    return NextResponse.json(
      {
        message: "Lesson updated successfully",
        lesson: updatedLesson,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ lessonId: string }> }) {
  try {
    await authenticateAdmin(req);

    const lessonId = (await context.params).lessonId;
    const deletedLesson = await deleteLessonByIdForAdmin(lessonId);

    return NextResponse.json(
      {
        message: "Lesson deleted successfully",
        lesson: deletedLesson,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
