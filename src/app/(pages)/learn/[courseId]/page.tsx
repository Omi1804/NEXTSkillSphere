import LearnDashboard from "@/components/Learn/LearnDashboard";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createPageMetadata } from "@/lib/seo";
import { getCourseById, getCourseProgressForUser } from "@/repositories/courses.repository";
import { getLessonsByCourseId } from "@/repositories/lessons.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type LearnPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function generateMetadata({ params }: LearnPageProps): Promise<Metadata> {
  const { courseId } = await params;

  return createPageMetadata({
    title: "Learning dashboard",
    description: "Continue your enrolled course lessons and progress.",
    path: `/learn/${courseId}`,
    noIndex: true,
  });
}

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
