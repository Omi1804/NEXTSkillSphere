import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { AuthError } from "@/config/authTokens";
import { purchaseCourse } from "@/services/userProfile.service";

export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const user = await authenticateUser(req);
    const courseId: any = (await context.params).id;

    const updatedUser = await purchaseCourse(user, courseId);

    return NextResponse.json(
      {
        message: "Course purchased successfully",
        userDetails: updatedUser,
      },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);

    if (err instanceof AuthError) {
      return NextResponse.json({ message: err.message }, { status: err.status });
    }

    return NextResponse.json({ message: "Internal Server Error", err }, { status: 500 });
  }
}
