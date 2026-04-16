import CourseCollectionPage from "@/components/Commerce/CourseCollectionPage";
import CommonHero from "@/components/CommonHero";
import { getCurrentUser } from "@/lib/getCurrentUser";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { getAllPublishedCourses } from "@/repositories/courses.repository";

export const metadata: Metadata = createPageMetadata({
  title: "Course Cart",
  description: "Review the courses currently saved in your cart.",
  path: "/cart",
  noIndex: true,
});

const CartPage = async () => {
  const [courses, user] = await Promise.all([getAllPublishedCourses(), getCurrentUser()]);

  return (
    <>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading="Course Cart" subHeading="CART" />
      <CourseCollectionPage courses={courses} mode="cart" isLoggedIn={Boolean(user)} />
    </>
  );
};

export default CartPage;
