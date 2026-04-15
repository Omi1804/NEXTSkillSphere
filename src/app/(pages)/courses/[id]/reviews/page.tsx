import CommonHero from "@/components/CommonHero";
import CourseReviewsPage from "@/components/CoursesComponents/CourseReviewsPage";
import { getCourseReviews } from "@/lib/courseReviews";
import { getCourseById } from "@/repositories/courses.repository";
import { notFound } from "next/navigation";

type ReviewsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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
