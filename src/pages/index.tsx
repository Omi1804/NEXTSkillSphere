import Authors from "@/components/HomeComponents/Authors";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import CoursesRecommendation from "@/components/HomeComponents/CoursesRecommendation";
import Curriculum from "@/components/HomeComponents/Curriculum";
import HeroPage1 from "@/components/HomeComponents/HeroPage1";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import LearningPath from "@/components/HomeComponents/LearningPath";
import React from "react";

const index = () => {
  return (
    <div>
      <HeroPage1 />
      <LearningPath />
      <CoursesRecommendation />
      <Curriculum />
      <Authors />
      <CourseList />
      <CaseStudies />
      <JoinCourse />
    </div>
  );
};

export default index;
