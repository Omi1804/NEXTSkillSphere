import PaymentStatus from "@/components/Payment/PaymentStatus";

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
