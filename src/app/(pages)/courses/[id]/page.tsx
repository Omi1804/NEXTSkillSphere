import CommonHero from "@/components/CommonHero";
import CourseDetailsView from "@/components/CoursesComponents/CourseDetailsView";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  CourseProgressRecord,
  getCourseById,
  getCourseProgressForUser,
} from "@/repositories/courses.repository";
import { getLessonsByCourseId } from "@/repositories/lessons.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const page = async ({ params }: CoursePageProps) => {
  const { id } = await params;

  const [course, lessons, currentUser] = await Promise.all([
    getCourseById(id),
    getLessonsByCourseId(id),
    getCurrentUser(),
  ]);

  if (!course || !course.isPublished) {
    notFound();
  }

  let hasAccess = false;
  let progress: CourseProgressRecord | null = null;

  if (currentUser) {
    const purchase = await findPurchaseByUserAndCourse(currentUser.id, id);
    hasAccess = Boolean(purchase);

    if (hasAccess) {
      progress = await getCourseProgressForUser(id, currentUser.id);
    }
  }

  return (
    <>
      <CommonHero
        Image={"course_image10.jpg"}
        heroHeading={course.title}
        subHeading={"COURSE DETAILS"}
        blackFilter={true}
      />
      <CourseDetailsView
        course={course}
        lessons={lessons.map((lesson) => ({
          id: lesson.id,
          title: lesson.title,
          videoUrl: hasAccess ? lesson.videoUrl : "",
          position: lesson.position,
        }))}
        progress={progress}
        hasAccess={hasAccess}
        isLoggedIn={Boolean(currentUser)}
      />
    </>
  );
};

export default page;
