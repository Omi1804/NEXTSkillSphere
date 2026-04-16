import LegalPage from "@/components/Legal/LegalPage";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "Read the eLearni privacy policy and learn how account, course, and purchase data is handled.",
  path: "/privacy-policy",
  keywords: ["privacy policy", "data handling", "learner privacy"],
});

const PrivacyPolicyPage = () => {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This page explains the core privacy expectations for learners using eLearni. Update the legal wording with counsel before launch."
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
