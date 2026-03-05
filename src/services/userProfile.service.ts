import { AuthError, NotFoundError } from "@/errors";
import { getCourseById } from "@/repositories/admin.repository";
import {
  addCourseToUser,
  findCoursesByUserEmail,
  findUserByEmail,
} from "@/repositories/user.repository";

export async function getUserProfileByEmail(email?: string | null) {
  if (!email) {
    throw new AuthError("User expired");
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AuthError("Auth expired, Please login again");
  }

  return user;
}

export async function purchaseCourse(user: any, id: string) {
  if (!user) {
    throw new AuthError("User expired");
  }

  const isCoursePurchased = user.courses.find((course: any) => course.id === id);

  if (isCoursePurchased) {
    return isCoursePurchased;
  }

  const existingCourse = await getCourseById(id);
  if (!existingCourse) {
    throw new NotFoundError("Course not found");
  }

  const updatedUser = await addCourseToUser(user.email, id);

  return updatedUser;
}

export async function getUserPurchasedCourses(user: any) {
  if (!user) {
    throw new AuthError("User expired");
  }

  const userEmail = user.email;

  const userCourses = await findCoursesByUserEmail(userEmail);
  if (!userCourses) {
    throw new NotFoundError("No courses found for the user");
  }

  return userCourses;
}
