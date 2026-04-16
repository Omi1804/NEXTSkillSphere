import PaymentStatus from "@/components/Payment/PaymentStatus";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Payment success",
  description: "Payment completed successfully.",
  path: "/payment/success",
  noIndex: true,
});

type PaymentSuccessPageProps = {
  searchParams: Promise<{
    courseId?: string;
  }>;
};

const PaymentSuccessPage = async ({ searchParams }: PaymentSuccessPageProps) => {
  const { courseId } = await searchParams;

  return <PaymentStatus status="success" courseId={courseId} />;
};

export default PaymentSuccessPage;
