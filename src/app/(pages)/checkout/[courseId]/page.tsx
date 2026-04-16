import CheckoutClient from "@/components/Checkout/CheckoutClient";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createPageMetadata } from "@/lib/seo";
import { getCourseById } from "@/repositories/courses.repository";
import { findPurchaseByUserAndCourse } from "@/repositories/user.repository";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

type CheckoutPageProps = {
  params: Promise<{
    courseId: string;
  }>;
};

export async function generateMetadata({ params }: CheckoutPageProps): Promise<Metadata> {
  const { courseId } = await params;

  return createPageMetadata({
    title: "Checkout",
    description: "Complete your secure eLearni enrollment checkout.",
    path: `/checkout/${courseId}`,
    noIndex: true,
  });
}

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
