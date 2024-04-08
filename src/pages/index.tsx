import Authors from "@/components/HomeComponents/Authors";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import Curriculum from "@/components/HomeComponents/Curriculum";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import React from "react";

const index = () => {
  return (
    <div>
      <Curriculum />
      <Authors />
      <CourseList />
      <CaseStudies />
      <JoinCourse />
    </div>
  );
};

export default index;
