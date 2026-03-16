import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { getUserCourseLessons } from "@/services/userProfile.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authenticateUser(req);
    const courseId = (await context.params).id;

    const data = await getUserCourseLessons(user, courseId);

    return NextResponse.json(
      {
        message: `Lessons fetched for course ${courseId}`,
        ...data,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
