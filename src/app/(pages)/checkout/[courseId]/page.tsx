import CheckoutClient from "@/components/Checkout/CheckoutClient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getCourseById } from "@/repositories/courses.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import { notFound, redirect } from "next/navigation";

type CheckoutPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { courseId } = await params;
  const [course, currentUser] = await Promise.all([getCourseById(courseId), getCurrentUser()]);

  if (!course || !course.isPublished) {
    notFound();
  }

  if (!currentUser) {
    redirect(`/login?next=/checkout/${courseId}`);
  }

  const purchase = await findPurchaseByUserAndCourse(currentUser.id, courseId);

  return <CheckoutClient course={course} alreadyPurchased={Boolean(purchase)} />;
};

export default CheckoutPage;
