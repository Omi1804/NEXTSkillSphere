import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { appendCourseImages, getAllCourseImages } from "@/repositories/images.repository";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await authenticateAdmin(req);

    const images = await getAllCourseImages();
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}

export async function POST(req: NextRequest) {
  try {
    await authenticateAdmin(req);

    const { imageLinks } = await req.json();
    const links = Array.isArray(imageLinks)
      ? imageLinks.map((link) => String(link).trim()).filter(Boolean)
      : [];

    if (links.length === 0) {
      return NextResponse.json({ message: "Provide at least one image link" }, { status: 400 });
    }

    const uniqueLinks = Array.from(new Set(links));
    const inserted = await appendCourseImages(uniqueLinks);

    return NextResponse.json(
      {
        message: "Images added successfully",
        inserted: inserted.count,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
