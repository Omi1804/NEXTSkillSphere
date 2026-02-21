"use client";
import Authors from "@/components/HomeComponents/Authors";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import CoursesRecommendation from "@/components/HomeComponents/CoursesRecommendation";
import Curriculum from "@/components/HomeComponents/Curriculum";
import HeroPage1 from "@/components/HomeComponents/HeroPage1";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import LearningPath from "@/components/HomeComponents/LearningPath";

const index = () => {
  return (
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
  );
};

export default index;
