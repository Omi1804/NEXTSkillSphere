// repository for admin related database operations --> this is where we interact with the database for admin data
import { prisma } from "@/lib/prisma";
import { Course } from "@/types/admin";

export interface AdminCreateInput {
  email: string;
  password: string;
}

export async function findAdminByEmail(email: string) {
  return prisma.admins.findUnique({
    where: { email },
  });
}

export async function findAdminById(id: string) {
  return prisma.admins.findUnique({
    where: { id },
  });
}

export async function createAdmin(data: AdminCreateInput) {
  return prisma.admins.create({
    data,
  });
}

export async function getAllCourses() {
  return prisma.course.findMany();
}

export async function createCourse(courseData: Course) {
  return prisma.course.create({
    data: courseData,
  });
}
