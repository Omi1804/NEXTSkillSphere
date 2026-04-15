import { NextRequest, NextResponse } from "next/server";
import { handleApiError } from "@/errors/apiErrorHandler";
import { getCoursesPaginated } from "@/repositories/courses.repository";

export async function GET(req: NextRequest) {
  try {
    const queryParams = req.nextUrl.searchParams;
    const page = parseInt(queryParams.get("page") || "1", 10);
    const limit = parseInt(queryParams.get("limit") || "10", 10);
    // No need to authenticate for fetching courses

    const { courses, totalCourses } = await getCoursesPaginated(page, limit, {
      onlyPublished: true,
    });

    return NextResponse.json({ allCourses: courses, totalCourses }, { status: 200 });
  } catch (error) {
    console.error("Error finding course:", error);
    return handleApiError(error, "Internal Server Error");
  }
}
