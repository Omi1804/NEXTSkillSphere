import CaseStudies from "@/components/HomeComponents/CaseStudies";
import CourseList from "@/components/HomeComponents/CourseList";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import React from "react";

const index = () => {
  return (
    <div>
      <CourseList />
      <CaseStudies />
      <JoinCourse />
    </div>
  );
};

export default index;
