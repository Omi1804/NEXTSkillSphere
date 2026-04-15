import LearnDashboard from "@/components/Learn/LearnDashboard";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getCourseById, getCourseProgressForUser } from "@/repositories/courses.repository";
import { getLessonsByCourseId } from "@/repositories/lessons.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import { notFound, redirect } from "next/navigation";

type LearnPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

const LearnPage = async ({ params }: LearnPageProps) => {
  const { courseId } = await params;
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect(`/login?next=/learn/${courseId}`);
  }

  const [course, purchase, lessons, progress] = await Promise.all([
    getCourseById(courseId),
    findPurchaseByUserAndCourse(currentUser.id, courseId),
    getLessonsByCourseId(courseId),
    getCourseProgressForUser(courseId, currentUser.id),
  ]);

  if (!course) {
    notFound();
  }

  if (!purchase) {
    redirect(`/checkout/${courseId}`);
  }

  return (
    <LearnDashboard
      course={course}
      lessons={lessons}
      progressLessons={progress.lessons}
    />
  );
};

export default LearnPage;
