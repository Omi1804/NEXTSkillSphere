import PaymentStatus from "@/components/Payment/PaymentStatus";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Payment failed",
  description: "Payment could not be completed.",
  path: "/payment/failed",
  noIndex: true,
});

type PaymentFailedPageProps = {
  searchParams: Promise<{
    courseId?: string;
  }>;
};

const PaymentFailedPage = async ({ searchParams }: PaymentFailedPageProps) => {
  const { courseId } = await searchParams;

  return <PaymentStatus status="failed" courseId={courseId} />;
};

export default PaymentFailedPage;
