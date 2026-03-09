import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { createCoursesBulk } from "@/repositories/admin.repository";
import { Course } from "@/types/adminApis";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await authenticateAdmin(req);

    const payload: Course[] = await req.json();

    if (!Array.isArray(payload) || payload.length === 0) {
      return NextResponse.json(
        { message: "Please provide a non-empty array of courses" },
        { status: 400 },
      );
    }

    const result = await createCoursesBulk(payload);

    return NextResponse.json(
      {
        message: "Courses created successfully",
        createdCount: result.count,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error(error);
    return handleApiError(error, error?.message || "Internal server error");
  }
};
