import CommonHero from "@/components/CommonHero";
import CourseReviewsPage from "@/components/CoursesComponents/CourseReviewsPage";
import { getCourseReviews } from "@/lib/courseReviews";
import { createPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getCourseById } from "@/repositories/courses.repository";
import { notFound } from "next/navigation";

type ReviewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: ReviewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const course = await getCourseById(id);

  return createPageMetadata({
    title: course ? `${course.title} Reviews` : "Course reviews",
    description: "Reviews and learner feedback for this course.",
    path: `/courses/${id}/reviews`,
    noIndex: true,
  });
}

const ReviewsPage = async ({ params }: ReviewsPageProps) => {
  const { id } = await params;
  const course = await getCourseById(id);

  if (!course || !course.isPublished) {
    notFound();
  }

  return (
    <>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading="Course Reviews" subHeading="REVIEWS" />
      <CourseReviewsPage course={course} reviews={getCourseReviews(course.id)} />
    </>
  );
};

export default ReviewsPage;
