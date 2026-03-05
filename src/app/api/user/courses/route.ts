import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { getAllCourses } from "@/repositories/admin.repository";
import { handleApiError } from "@/errors/apiErrorHandler";

export async function GET(req: NextRequest) {
  try {
    await authenticateUser(req);

    const courses = await getAllCourses();
    return NextResponse.json({ allCourses: courses }, { status: 200 });
  } catch (error) {
    console.error("Error finding course:", error);
    return handleApiError(error, "Internal Server Error");
  }
}
