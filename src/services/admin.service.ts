import {
  deleteCourse,
  getCourseById,
  updateCourse,
} from "@/repositories/admin.repository";
import { Course } from "@/types/adminApis";

export const updateCourseById = async (
  courseId: string,
  newCourseData: Course,
) => {
  if (!courseId || !newCourseData) {
    throw new Error("Course ID and new course data must be provided.");
  }

  const existingCourse = await getCourseById(courseId);

  if (!existingCourse) {
    throw new Error("Course not found!");
  }

  const updatedCourse = await updateCourse(courseId, newCourseData);

  return updatedCourse;
};

export const deleteCourseById = async (courseId: string) => {
  if (!courseId) {
    throw new Error("Course Id must be provided");
  }

  const existingCourse = await getCourseById(courseId);

  if (!existingCourse) {
    throw new Error("Course not found!");
  }

  const deletedCourse = await deleteCourse(courseId);
  return deletedCourse;
};
