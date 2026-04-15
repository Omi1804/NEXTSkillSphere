import PaymentStatus from "@/components/Payment/PaymentStatus";

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
