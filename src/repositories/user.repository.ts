// repository for user related database operations --> this is where we interact with the database for user data
import { prisma } from "@/lib/prisma";

export interface UserCreateInput {
  username: string;
  name: string;
  email: string;
  password: string;
}

export async function findUserByEmail(email: string) {
  // for authentication mainly, we need to check if user exists and also compare password
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string) {
  // for middlewares mainly
  return prisma.user.findUnique({
    where: { id },
    include: {
      courses: true,
    },
  });
}

export async function createUser(data: UserCreateInput) {
  return prisma.user.create({
    data,
  });
}

export async function getAllCourses() {
  return prisma.course.findMany();
}

export async function addCourseToUser(userEmail: string, courseId: string) {
  return prisma.user.update({
    where: {
      email: userEmail,
    },
    data: {
      courses: {
        connect: { id: courseId },
      },
    },
    include: {
      courses: true,
    },
  });
}

export async function findCoursesByUserEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      courses: true,
    },
  });
}
