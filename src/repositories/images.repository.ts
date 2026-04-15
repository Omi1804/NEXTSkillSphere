import { prisma } from "@/lib/prisma";

export const getAllCourseImages = async () => {
  return prisma.courseImages.findMany({
    include: {
      course: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getExistingImageLinks = async (uniqueLinks: string[]) => {
  return prisma.courseImages.findMany({
    where: {
      imageLink: {
        in: uniqueLinks,
      },
    },
    select: {
      imageLink: true,
    },
  });
};

export const appendCourseImages = async (imageLinks: string[]) => {
  return prisma.courseImages.createMany({
    data: imageLinks.map((link) => ({ imageLink: link })),
  });
};
