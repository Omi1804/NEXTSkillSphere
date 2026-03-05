import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { getUserPurchasedCourses } from "@/services/userProfile.service";
import { AuthError } from "@/config/authTokens";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateUser(req);

    const userCourses = await getUserPurchasedCourses(user);

    return NextResponse.json({ Courses: userCourses.courses }, { status: 200 });
  } catch (error: any) {
    console.error("Error finding course:", error);

    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
