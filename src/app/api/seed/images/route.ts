import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { appendCourseImages, getExistingImageLinks } from "@/repositories/images.repository";
import { seedImagesFromUnsplash } from "@/services/admin.service";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    authenticateAdmin(req);

    const { uniqueLinks, images, query, pages, perPage } = await seedImagesFromUnsplash(req);

    if (uniqueLinks.length === 0) {
      return NextResponse.json(
        {
          message: "No images found to seed",
          fetched: images.length,
          inserted: 0,
        },
        { status: 200 },
      );
    }

    const existingImages = await getExistingImageLinks(uniqueLinks);

    const existingLinkSet = new Set(existingImages.map((image) => image.imageLink));
    const newLinks = uniqueLinks.filter((link) => !existingLinkSet.has(link));

    if (newLinks.length === 0) {
      return NextResponse.json(
        {
          message: "No new images to seed; all fetched images already exist",
          fetched: images.length,
          uniqueFetched: uniqueLinks.length,
          alreadyExisting: existingImages.length,
          inserted: 0,
        },
        { status: 200 },
      );
    }

    const inserted = await appendCourseImages(newLinks);

    return NextResponse.json(
      {
        message: "Course images seeded successfully",
        query,
        pages,
        perPage,
        fetched: images.length,
        uniqueFetched: uniqueLinks.length,
        alreadyExisting: existingImages.length,
        inserted: inserted.count,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Error while seeding images:", error);
    return handleApiError(error, error?.message || "Failed to seed images");
  }
};
