import { authenticateUser } from "@/middlewares/userAuth.middleware";
import { NextRequest, NextResponse } from "next/server";
import { getAllCourses } from "@/repositories/admin.repository";
import { AuthError } from "@/config/authTokens";

export async function GET(req: NextRequest) {
  try {
    await authenticateUser(req);

    const courses = await getAllCourses();
    return NextResponse.json({ allCourses: courses }, { status: 200 });
  } catch (error) {
    console.error("Error finding course:", error);

    if (error instanceof AuthError) {
      return NextResponse.json({ message: error.message }, { status: error.status });
    }

    return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
  }
}
