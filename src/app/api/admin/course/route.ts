import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createCourse, getAllCourses } from "@/repositories/admin.repository";

export async function GET(req: NextRequest) {
  try {
    await authenticateAdmin(req);
    const courses = await getAllCourses();

    return NextResponse.json(courses, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await authenticateAdmin(req);

    const newCourse = await req.json();
    await createCourse(newCourse);

    return NextResponse.json(
      { message: "Course Created successfully", course: newCourse },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
