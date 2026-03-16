// This route is for attaching images to courses in bulk which has been created without images. It will find courses without images and attach the remainign images left to attach.
import { handleApiError } from "@/errors/apiErrorHandler";
import { authenticateAdmin } from "@/middlewares/adminAuth.middleware";
import { updateCourseImage } from "@/repositories/admin.repository";
import {
  getCoursesWithoutImages,
  getImagesWithoutCourses,
} from "@/repositories/courses.repository";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    authenticateAdmin(req);

    const coursesWithoutImages = await getCoursesWithoutImages();
    const getImagesToAttach = await getImagesWithoutCourses();

    if (getImagesToAttach.length === 0) {
      return new Response("No images left to attach", { status: 200 });
    }

    for (let i = 0; i < coursesWithoutImages.length && i < getImagesToAttach.length; i++) {
      const course = coursesWithoutImages[i];
      const image = getImagesToAttach[i];

      await updateCourseImage(course.id, image.id);
    }

    return NextResponse.json(
      {
        message: "Images attached to courses successfully",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return handleApiError(error, "Internal Server Error");
  }
}
