import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { createCoursesBulk } from "@/repositories/courses.repository";
import { CourseCreateInput } from "@/types/course.types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const admin = await authenticateAdmin(req);

    const payload: CourseCreateInput[] = await req.json();

    if (!Array.isArray(payload) || payload.length === 0) {
      throw new Error("Please provide a non-empty array of courses");
    }

    const hasInvalidItem = payload.some(
      (course) => !course?.title || !course?.description || typeof course?.price !== "number",
    );

    if (hasInvalidItem) {
      throw new Error("Each course must include title, description, and numeric price");
    }

    const result = await createCoursesBulk(payload, admin.id);

    return NextResponse.json(
      {
        message: "Courses created successfully",
        createdCount: result.length,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return handleApiError(error, error?.message || "Internal server error");
  }
};
