"use client";
import Authors from "@/components/HomeComponents/Authors";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import CoursesRecommendation from "@/components/HomeComponents/CoursesRecommendation";
import Curriculum from "@/components/HomeComponents/Curriculum";
import HeroPage1 from "@/components/HomeComponents/HeroPage1";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import LearningPath from "@/components/HomeComponents/LearningPath";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I get lifetime access to the courses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, once you purchase a course, you get lifetime access to the content (including future updates, if provided).",
      },
    },
    {
      "@type": "Question",
      name: "Are the courses beginner friendly?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Each course starts from fundamentals and moves step-by-step toward real projects.",
      },
    },
    {
      "@type": "Question",
      name: "Will I get a certificate after completing a course?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "If certificates are enabled for a course, you’ll receive one after completing the required lessons.",
      },
    },
    {
      "@type": "Question",
      name: "Can I learn at my own pace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, all courses are self-paced, so you can learn anytime and revisit lessons whenever you want.",
      },
    },
  ],
};

const index = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main>
        <HeroPage1 />
        <LearningPath />
        <CoursesRecommendation />
        <Curriculum />
        <Authors />
        <CourseList />
        <CaseStudies />
        <JoinCourse />
      </main>
    </>
  );
};

export default index;
