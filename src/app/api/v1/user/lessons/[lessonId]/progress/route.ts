import { BadRequestError } from "@/errors";
import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { updateUserLessonProgress } from "@/services/userProfile.service";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ lessonId: string }> },
) {
  try {
    const user = await authenticateUser(req);
    const lessonId = (await context.params).lessonId;
    const body = await req.json();

    if (typeof body?.completed !== "boolean") {
      throw new BadRequestError("completed must be a boolean");
    }

    const progress = await updateUserLessonProgress(user, lessonId, body.completed);

    return NextResponse.json(
      {
        message: "Lesson progress updated successfully",
        progress,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
