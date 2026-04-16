import CourseCollectionPage from "@/components/Commerce/CourseCollectionPage";
import CommonHero from "@/components/CommonHero";
import { getCurrentUser } from "@/lib/getCurrentUser";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { getAllPublishedCourses } from "@/repositories/courses.repository";

export const metadata: Metadata = createPageMetadata({
  title: "Wishlist",
  description: "Review the courses saved to your wishlist.",
  path: "/wishlist",
  noIndex: true,
});

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
