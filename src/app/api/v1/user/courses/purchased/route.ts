import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { getUserPurchasedCourses } from "@/services/userProfile.service";
import { handleApiError } from "@/errors/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    const user = await authenticateUser(req);

    const userCourses = await getUserPurchasedCourses(user);

    return NextResponse.json({ Courses: userCourses.courses }, { status: 200 });
  } catch (error: any) {
    console.error("Error finding course:", error);
    return handleApiError(error, "Internal Server Error");
  }
}
