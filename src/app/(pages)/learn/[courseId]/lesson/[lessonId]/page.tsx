import LessonFocusClient from "@/components/Learn/LessonFocusClient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getCourseById, getCourseProgressForUser } from "@/repositories/courses.repository";
import { getLessonById, getLessonsByCourseId } from "@/repositories/lessons.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import { notFound, redirect } from "next/navigation";

type LessonPageProps = {
  params: Promise<{
    courseId: string;
    lessonId: string;
  }>;
};

const LessonPage = async ({ params }: LessonPageProps) => {
  const { courseId, lessonId } = await params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/login?next=/learn/${courseId}/lesson/${lessonId}`);
  }

  const [course, lesson, purchase, lessons, progress] = await Promise.all([
    getCourseById(courseId),
    getLessonById(lessonId),
    findPurchaseByUserAndCourse(currentUser.id, courseId),
    getLessonsByCourseId(courseId),
    getCourseProgressForUser(courseId, currentUser.id),
  ]);

  if (!course || !lesson || lesson.courseId !== courseId) {
    notFound();
  }

  if (!purchase) {
    redirect(`/checkout/${courseId}`);
  }

  return (
    <LessonFocusClient
      course={course}
      lesson={lesson}
      lessons={lessons}
      progressLessons={progress.lessons}
    />
  );
};

export default LessonPage;
