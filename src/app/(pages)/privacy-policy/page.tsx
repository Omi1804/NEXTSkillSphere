import LegalPage from "@/components/Legal/LegalPage";

const PrivacyPolicyPage = () => {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page explains the core privacy expectations for learners using Skill Sphere. Update the legal wording with counsel before launch."
      sections={[
        {
          title: "Information we collect",
          body: "We collect account details, course enrollment activity, payment references, and learning progress needed to operate the platform.",
        },
        {
          title: "How we use information",
          body: "We use learner information to provide course access, personalize progress, support purchases, secure accounts, and improve the learning experience.",
        },
        {
          title: "Your choices",
          body: "Learners can contact support to request account help, data corrections, or questions about how their information is handled.",
        },
      ]}
    />
  );
};

export default PrivacyPolicyPage;
