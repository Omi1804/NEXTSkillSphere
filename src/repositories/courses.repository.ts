import { prisma } from "@/lib/prisma";
import { Course, CourseCreateInput, CourseUpdateInput } from "@/types/course.types";

export const mapCourseRecord = (course: any): Course => {
  return {
    id: course.id,
    title: course.title,
    description: course.description,
    price: course.price,
    image_id: course.image_id,
    imageLink: course.image?.imageLink ?? null,
    isPublished: course.isPublished,
    createdBy: course.createdBy,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    instructor: course.instructor?.name ?? "Unknown Instructor",
  };
};

export interface CourseProgressRecord {
  courseId: string;
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  isCompleted: boolean;
  lessons: {
    lessonId: string;
    title: string;
    position: number;
    completed: boolean;
  }[];
}

export async function getAllCourses() {
  const courses = await prisma.course.findMany({
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
  });

  return courses.map(mapCourseRecord);
}

export async function getCourseById(courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      description: true,
      price: true,
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
      lessons: true,
    },
  });

  if (!course) {
    return null;
  }

  return mapCourseRecord(course);
}

export async function getCoursesPaginated(page: number, limit: number) {
  const offset = (page - 1) * limit;
  const [courses, totalCourses] = await Promise.all([
    prisma.course.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
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
    }),
    prisma.course.count(),
  ]);

  return { courses: courses.map(mapCourseRecord), totalCourses };
}

export const getImagesWithoutCourses = async () => {
  return prisma.courseImages.findMany({
    where: {
      course: {
        is: null,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export async function createCourse(courseData: CourseCreateInput, createdBy: string) {
  const image = await prisma.courseImages.findFirst({
    where: {
      course: {
        is: null,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const created = await prisma.course.create({
    data: {
      title: courseData.title,
      description: courseData.description,
      price: courseData.price,
      createdBy,
      image_id: courseData.image_id ?? image?.id ?? null,
      isPublished: courseData.isPublished ?? true,
    },
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
  });

  return mapCourseRecord(created);
}

export async function createCoursesBulk(coursesData: CourseCreateInput[], createdBy: string) {
  return prisma.$transaction(async (tx) => {
    const images = await tx.courseImages.findMany({
      take: coursesData.length,
      where: {
        course: {
          is: null,
        },
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        id: true,
      },
    });

    let imageIndex = 0;

    const createdCourses = [];

    for (const course of coursesData) {
      const created = await tx.course.create({
        data: {
          title: course.title,
          description: course.description,
          price: course.price,
          image_id: course.image_id ?? images[imageIndex++]?.id ?? null,
          isPublished: course.isPublished ?? true,
          createdBy,
        },
      });

      createdCourses.push(created);
    }
    return createdCourses;
  });
}

export async function updateCourse(courseId: string, courseData: CourseUpdateInput) {
  return prisma.course.update({
    where: { id: courseId },
    data: courseData,
  });
}

export async function deleteCourse(courseId: string) {
  return prisma.course.delete({
    where: { id: courseId },
  });
}

export async function getCourseProgressForUser(
  courseId: string,
  userId: string,
): Promise<CourseProgressRecord> {
  const lessons = await prisma.lesson.findMany({
    where: { courseId },
    select: {
      id: true,
      title: true,
      position: true,
      lessonProgresses: {
        where: { userId },
        select: {
          completed: true,
        },
      },
    },
    orderBy: {
      position: "asc",
    },
  });

  const lessonProgress = lessons.map((lesson) => ({
    lessonId: lesson.id,
    title: lesson.title,
    position: lesson.position,
    completed: lesson.lessonProgresses[0]?.completed ?? false,
  }));

  const totalLessons = lessonProgress.length;
  const completedLessons = lessonProgress.filter((lesson) => lesson.completed).length;
  const completionPercentage =
    totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  return {
    courseId,
    totalLessons,
    completedLessons,
    completionPercentage,
    isCompleted: totalLessons > 0 && completedLessons === totalLessons,
    lessons: lessonProgress,
  };
}

export async function getCoursesWithoutImages() {
  const courses = await prisma.course.findMany({
    where: {
      image_id: null,
    },
  });

  return courses;
}
