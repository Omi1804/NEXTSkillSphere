import Authors from "@/components/HomeComponents/Authors";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import CoursesRecommendation from "@/components/HomeComponents/CoursesRecommendation";
import Curriculum from "@/components/HomeComponents/Curriculum";
import HeroPage1 from "@/components/HomeComponents/HeroPage1";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import LearningPath from "@/components/HomeComponents/LearningPath";
import type { Metadata } from "next";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  path: "/",
  keywords: ["online tech courses", "career learning paths", "practical online training"],
});

const HomePage = () => {
  return (
    <section>
      <HeroPage1 />
      <LearningPath />
      <CoursesRecommendation />
      <Curriculum />
      <Authors />
      <CourseList />
      <CaseStudies />
      <JoinCourse />
    </section>
  );
};

export default HomePage;
