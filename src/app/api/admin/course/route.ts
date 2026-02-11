import { authenticateAdmin } from "@/lib";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await authenticateAdmin(req);

    const courses = await prisma.course.findMany();

    return NextResponse.json(courses, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function POST(req: Request) {
  try {
    await authenticateAdmin(req);

    const newCourse = await req.json();

    const requiredFields = [
      "imageLink",
      "price",
      "time",
      "level",
      "heading",
      "description",
      "category",
      "instructor",
    ] as const;

    const missingFields = requiredFields.filter((field) => {
      const value = newCourse?.[field];
      if (typeof value === "string") {
        return value.trim().length === 0;
      }
      return value === undefined || value === null;
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: "Missing required fields",
          missingFields,
        },
        { status: 400 },
      );
    }

    if (typeof newCourse.price !== "number" || newCourse.price <= 0) {
      return NextResponse.json(
        { message: "Price must be a positive number" },
        { status: 400 },
      );
    }

    if (
      typeof newCourse.time !== "string" ||
      newCourse.time.trim().length === 0
    ) {
      return NextResponse.json(
        { message: "Time must be a non-empty string" },
        { status: 400 },
      );
    }

    await prisma.course.create({
      data: {
        imageLink: newCourse.imageLink,
        price: newCourse.price,
        time: newCourse.time,
        level: newCourse.level,
        heading: newCourse.heading,
        description: newCourse.description,
        category: newCourse.category,
        instructor: newCourse.instructor,
      },
    });

    return NextResponse.json(
      { message: "Course Created successfully", course: newCourse },
      { status: 200 },
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
