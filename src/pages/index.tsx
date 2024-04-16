import Authors from "@/components/HomeComponents/Authors";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import CoursesRecommendation from "@/components/HomeComponents/CoursesRecommendation";
import Curriculum from "@/components/HomeComponents/Curriculum";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import LearningPath from "@/components/HomeComponents/LearningPath";
import React from "react";

const index = () => {
  return (
    <div>
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
