import CommonHero from "@/components/CommonHero";
import JsonLd from "@/components/seo/JsonLd";
import CourseDetailsView from "@/components/CoursesComponents/CourseDetailsView";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  buildBreadcrumbSchema,
  buildCourseSchema,
  createPageMetadata,
  summarizeText,
} from "@/lib/seo";
import {
  CourseProgressRecord,
  getCourseById,
  getCourseProgressForUser,
} from "@/repositories/courses.repository";
import type { Metadata } from "next";
import { getLessonsByCourseId } from "@/repositories/lessons.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import { notFound } from "next/navigation";

type CoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course || !course.isPublished) {
    return createPageMetadata({
      title: "Course not found",
      description: "The requested course could not be found.",
      path: `/courses/${id}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: course.title,
    description: summarizeText(course.description),
    path: `/courses/${course.id}`,
    image: course.imageLink ?? undefined,
    keywords: [course.title, "online course", "self-paced learning", course.instructor || "instructor"],
  });
}

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
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Courses", path: "/courses" },
            { name: course.title, path: `/courses/${course.id}` },
          ]),
          buildCourseSchema(course),
        ]}
      />
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
