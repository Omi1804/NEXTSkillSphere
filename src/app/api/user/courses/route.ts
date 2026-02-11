import { authenticateUser } from "@/lib";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    await authenticateUser(req);

    const courses = await prisma.course.findMany({});

    return NextResponse.json({ allCourses: courses }, { status: 200 });
  } catch (error) {
    console.error("Error finding course:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 },
    );
  }
}
