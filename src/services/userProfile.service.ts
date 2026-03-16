import { AuthError, ForbiddenError, NotFoundError } from "@/errors";
import { getCourseById, getCourseProgressForUser } from "@/repositories/courses.repository";
import { getLessonsByCourseId } from "@/repositories/lessons.repository";
import {
  createPurchaseForUser,
  findCoursesByUserEmail,
  findPurchaseByUserAndCourse,
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

  const isCoursePurchased = await findPurchaseByUserAndCourse(user.id, id);

  if (isCoursePurchased) {
    return isCoursePurchased;
  }

  const existingCourse = await getCourseById(id);
  if (!existingCourse) {
    throw new NotFoundError("Course not found");
  }

  const paymentId = `manual_${Date.now()}_${user.id.slice(0, 6)}`;
  const updatedUser = await createPurchaseForUser({
    userId: user.id,
    courseId: id,
    amount: existingCourse.price,
    paymentId,
  });

  return updatedUser;
}

export async function getUserPurchasedCourses(user: any) {
  if (!user) {
    throw new AuthError("User expired");
  }

  const userEmail = user.email;

  const userCourses = await findCoursesByUserEmail(userEmail);
  if (!userCourses || userCourses.length === 0) {
    throw new NotFoundError("No courses found for the user");
  }

  return userCourses.map((purchase) => {
    const course = purchase.course;
    return {
      id: course.id,
      title: course.title,
      description: course.description,
      price: course.price,
      imageLink: course.image?.imageLink ?? null,
      instructor: course.instructor?.name ?? "Unknown Instructor",
    };
  });
}

type AuthenticatedUser = {
  id: string;
  email: string;
};

const validateCourseAccess = async (user: AuthenticatedUser, courseId: string) => {
  if (!courseId) {
    throw new NotFoundError("Course id is required");
  }

  const existingCourse = await getCourseById(courseId);
  if (!existingCourse) {
    throw new NotFoundError("Course not found");
  }

  const purchased = await findPurchaseByUserAndCourse(user.id, courseId);
  if (!purchased) {
    throw new ForbiddenError("You need to purchase this course to access it");
  }
};

export async function getUserCourseLessons(user: AuthenticatedUser, courseId: string) {
  if (!user) {
    throw new AuthError("User expired");
  }

  await validateCourseAccess(user, courseId);
  const lessons = await getLessonsByCourseId(courseId);

  return {
    courseId,
    totalLessons: lessons.length,
    lessons,
  };
}

export async function getUserCourseProgress(user: AuthenticatedUser, courseId: string) {
  if (!user) {
    throw new AuthError("User expired");
  }

  await validateCourseAccess(user, courseId);
  return getCourseProgressForUser(courseId, user.id);
}
