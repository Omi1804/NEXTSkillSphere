import { BadRequestError, NotFoundError } from "@/errors";
import { CourseUpdateInput } from "@/types/course.types";
import { UNSPLASH_BASE_URL, UNSPLASH_DEFAULTS } from "@/constants/general.constants";
import { NextRequest } from "next/server";
import { deleteCourse, getCourseById, updateCourse } from "@/repositories/courses.repository";

type UnsplashImage = {
  urls?: {
    regular?: string;
    full?: string;
    raw?: string;
  };
};

const toBoundedInt = (value: string | null, fallback: number, min: number, max: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.floor(parsed), min), max);
};

export const updateCourseById = async (courseId: string, newCourseData: CourseUpdateInput) => {
  if (!courseId || !newCourseData) {
    throw new BadRequestError("Course ID and new course data must be provided.");
  }

  const existingCourse = await getCourseById(courseId);

  if (!existingCourse) {
    throw new NotFoundError("Course not found!");
  }

  const updatedCourse = await updateCourse(courseId, newCourseData);

  return updatedCourse;
};

export const deleteCourseById = async (courseId: string) => {
  if (!courseId) {
    throw new BadRequestError("Course Id must be provided");
  }

  const existingCourse = await getCourseById(courseId);

  if (!existingCourse) {
    throw new NotFoundError("Course not found!");
  }

  const deletedCourse = await deleteCourse(courseId);
  return deletedCourse;
};

export const seedImagesFromUnsplash = async (req: NextRequest) => {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("UNSPLASH_ACCESS_KEY is not configured");
  }

  const queryParams = req.nextUrl.searchParams;
  const query = (queryParams.get("query") || UNSPLASH_DEFAULTS.query).trim();
  const pages = toBoundedInt(
    queryParams.get("pages"),
    UNSPLASH_DEFAULTS.defaultPages,
    1,
    UNSPLASH_DEFAULTS.maxPages,
  );
  const perPage = toBoundedInt(
    queryParams.get("perPage"),
    UNSPLASH_DEFAULTS.defaultPerPage,
    1,
    UNSPLASH_DEFAULTS.maxPerPage,
  );

  const unsplashRequests = Array.from({ length: pages }, (_, index) => {
    const page = index + 1;
    const url = new URL(UNSPLASH_BASE_URL);
    url.searchParams.set("query", query);
    url.searchParams.set("page", String(page));
    url.searchParams.set("client_id", accessKey);
    url.searchParams.set("per_page", String(perPage));
    return fetch(url.toString(), { cache: "no-store" });
  });

  const unsplashResponses = await Promise.all(unsplashRequests);
  const failed = unsplashResponses.find((response) => !response.ok);

  if (failed) {
    throw new Error("Failed to fetch images from Unsplash");
  }

  const unsplashPayloads = await Promise.all(unsplashResponses.map((response) => response.json()));

  const images = unsplashPayloads.flatMap((payload) => payload.results || []) as UnsplashImage[];

  const allLinks = images
    .map((image) => image.urls?.regular || image.urls?.full || image.urls?.raw)
    .filter((link): link is string => Boolean(link));

  const uniqueLinks = Array.from(new Set(allLinks));

  return { uniqueLinks, images, query, pages, perPage };
};
