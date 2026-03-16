// repository for admin related database operations --> this is where we interact with the database for admin data
import { prisma } from "@/lib/prisma";

export interface AdminCreateInput {
  name: string;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}

export async function findAdminByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email, role: "ADMIN" },
  });
}

export async function findAdminById(id: string) {
  return prisma.user.findUnique({
    where: { id, role: "ADMIN" },
  });
}

export async function createAdmin(data: AdminCreateInput) {
  return prisma.user.create({
    data: {
      ...data,
      role: "ADMIN",
    },
  });
}

export async function updateCourseImage(courseId: string, imageId: number) {
  return prisma.course.update({
    where: { id: courseId },
    data: {
      image_id: imageId,
    },
  });
}
