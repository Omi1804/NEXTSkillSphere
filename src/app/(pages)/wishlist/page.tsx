import CourseCollectionPage from "@/components/Commerce/CourseCollectionPage";
import CommonHero from "@/components/CommonHero";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getAllPublishedCourses } from "@/repositories/courses.repository";

const WishlistPage = async () => {
  const [courses, user] = await Promise.all([getAllPublishedCourses(), getCurrentUser()]);

  return (
    <>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading="Wishlist" subHeading="WISHLIST" />
      <CourseCollectionPage courses={courses} mode="wishlist" isLoggedIn={Boolean(user)} />
    </>
  );
};

export default WishlistPage;
