import { prisma } from "@/lib/prisma";
import { LessonCreateInput, LessonRecord, LessonUpdateInput } from "@/types/lessons.types";

export async function getLessonsByCourseId(courseId: string): Promise<LessonRecord[]> {
  return prisma.lesson.findMany({
    where: { courseId },
    select: {
      id: true,
      title: true,
      videoUrl: true,
      position: true,
      courseId: true,
      createdAt: true,
    },
    orderBy: {
      position: "asc",
    },
  });
}

export async function getLessonById(lessonId: string): Promise<LessonRecord | null> {
  return prisma.lesson.findUnique({
    where: { id: lessonId },
  });
}

export async function getNextLessonPosition(courseId: string): Promise<number> {
  const lessonAggregate = await prisma.lesson.aggregate({
    where: { courseId },
    _max: {
      position: true,
    },
  });

  return (lessonAggregate._max.position ?? 0) + 1;
}

export async function createLesson(input: LessonCreateInput) {
  return prisma.lesson.create({
    data: {
      title: input.title,
      videoUrl: input.videoUrl,
      position: input.position,
      courseId: input.courseId,
    },
  });
}

export async function updateLesson(lessonId: string, data: LessonUpdateInput) {
  return prisma.lesson.update({
    where: { id: lessonId },
    data,
  });
}

export async function deleteLesson(lessonId: string) {
  return prisma.lesson.delete({
    where: { id: lessonId },
  });
}
