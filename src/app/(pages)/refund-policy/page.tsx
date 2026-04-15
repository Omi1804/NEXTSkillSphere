import LegalPage from "@/components/Legal/LegalPage";

const RefundPolicyPage = () => {
  return (
    <LegalPage
      eyebrow="Refunds"
      title="Refund Policy"
      intro="This starter refund page gives the checkout flow a complete destination. Adjust the final policy when Razorpay and business rules are ready."
      sections={[
        {
          title: "Refund window",
          body: "Refund eligibility can be configured around your business rules, such as a fixed number of days after purchase or lesson consumption limits.",
        },
        {
          title: "Failed payments",
          body: "If a payment fails, no course access should be granted. Learners can retry checkout or contact support for payment clarification.",
        },
        {
          title: "Support process",
          body: "Learners can reach out through the contact page with their account email, course name, and payment reference for help.",
        },
      ]}
    />
  );
};

export default RefundPolicyPage;
