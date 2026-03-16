// repository for user related database operations --> this is where we interact with the database for user data
import { prisma } from "@/lib/prisma";

export interface UserCreateInput {
  username?: string;
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
      purchases: {
        select: {
          courseId: true,
        },
      },
    },
  });
}

export async function createUser(data: UserCreateInput) {
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}

export async function findPurchaseByUserAndCourse(userId: string, courseId: string) {
  return prisma.purchase.findUnique({
    where: {
      userId_courseId: {
        // this means userId and courseId together should be unique in the purchase table, this is defined in the prisma schema as @@unique([userId, courseId])
        userId,
        courseId,
      },
    },
  });
}

export async function createPurchaseForUser(data: {
  userId: string;
  courseId: string;
  amount: number;
  paymentId: string;
}) {
  return prisma.purchase.create({
    data: {
      userId: data.userId,
      courseId: data.courseId,
      amount: data.amount,
      paymentId: data.paymentId,
    },
    include: {
      course: {
        include: {
          image: {
            select: {
              imageLink: true,
            },
          },
          instructor: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}

export async function findCoursesByUserEmail(email: string) {
  return prisma.purchase.findMany({
    where: {
      user: {
        email,
      },
    },
    include: {
      course: {
        include: {
          image: {
            select: {
              imageLink: true,
            },
          },
          instructor: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
}
