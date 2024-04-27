import CommonHero from "@/components/CommonHero";
import GetInTouch from "@/components/ContactUs/GetInTouch";
import AllCoursesList from "@/components/CoursesComponents/AllCoursesList";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import React from "react";

const courses = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-whyus.png"}
        heroHeading={"Courses List"}
        subHeading={"COURSE LIST"}
      />
      <AllCoursesList />
      <JoinCourse />
    </div>
  );
};

export default courses;
