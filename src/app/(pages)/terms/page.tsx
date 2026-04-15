import LegalPage from "@/components/Legal/LegalPage";

const TermsPage = () => {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms And Conditions"
      intro="These starter terms outline expected platform behavior for learners and admins. Replace with production legal terms before accepting real payments."
      sections={[
        {
          title: "Course access",
          body: "Purchased courses are available to the enrolled account subject to platform availability, account security, and course publishing status.",
        },
        {
          title: "Learner responsibilities",
          body: "Users should keep credentials secure, use content for personal learning, and avoid sharing restricted lesson materials without permission.",
        },
        {
          title: "Platform changes",
          body: "Course content, pricing, and platform features may change as Skill Sphere improves the learning experience.",
        },
      ]}
    />
  );
};

export default TermsPage;
