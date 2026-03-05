import { AuthError } from "@/config/authTokens";
import { getCourseById } from "@/repositories/admin.repository";
import {
  addCourseToUser,
  findCoursesByUserEmail,
  findUserByEmail,
} from "@/repositories/user.repository";

export async function getUserProfileByEmail(email?: string | null) {
  if (!email) {
    throw new AuthError("User expired", 404);
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new AuthError("Auth expired, Please login again", 404);
  }

  return user;
}

export async function purchaseCourse(user: any, id: string) {
  if (!user) {
    throw new AuthError("User expired", 404);
  }

  const isCoursePurchased = user.courses.find((course: any) => course.id === id);

  if (isCoursePurchased) {
    return isCoursePurchased;
  }

  const existingCourse = await getCourseById(id);
  if (!existingCourse) {
    throw new AuthError("Course not found", 404);
  }

  const updatedUser = await addCourseToUser(user.email, id);

  return updatedUser;
}

export async function getUserPurchasedCourses(user: any) {
  if (!user) {
    throw new AuthError("User expired", 404);
  }

  const userEmail = user.email;

  const userCourses = await findCoursesByUserEmail(userEmail);
  if (!userCourses) {
    throw new AuthError("No courses found for the user", 404);
  }

  return userCourses;
}
