import CommonHero from "@/components/CommonHero";
import AllCoursesList from "@/components/CoursesComponents/AllCoursesList";
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
    </div>
  );
};

export default courses;
