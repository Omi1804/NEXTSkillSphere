import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { getUserCourseProgress } from "@/services/userProfile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authenticateUser(req);
    const courseId = (await context.params).id;

    const progress = await getUserCourseProgress(user, courseId);

    return NextResponse.json(
      {
        message: `Course progress fetched for course ${courseId}`,
        progressType: "COURSE",
        progress,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
