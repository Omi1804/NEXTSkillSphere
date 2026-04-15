import CourseCollectionPage from "@/components/Commerce/CourseCollectionPage";
import CommonHero from "@/components/CommonHero";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getAllPublishedCourses } from "@/repositories/courses.repository";

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
