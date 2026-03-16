import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/errors/apiErrorHandler";
import { purchaseCourse } from "@/services/userProfile.service";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authenticateUser(req);
    const courseId: any = (await context.params).id;

    const updatedUser = await purchaseCourse(user, courseId);

    return NextResponse.json(
      {
        message: `Course with id ${courseId} purchased successfully`,
        userDetails: updatedUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return handleApiError(err, "Internal Server Error");
  }
}
