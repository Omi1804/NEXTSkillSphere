import {
  AboutProcess,
  CoursesForYou,
  Educations,
  Options,
  Testimonials,
} from "@/components/AboutComponents";
import CommonHero from "@/components/CommonHero";
import React from "react";

const about = () => {
  return (
    <div>
      <CommonHero
        Image={
          "https://elearni.wpenginepowered.com/wp-content/themes/elearni/images/breadcrumb.png"
        }
        heroHeading={"About"}
        subHeading={"ABOUT"}
      />

      <Options />
      <AboutProcess />
      <Educations />
      <CoursesForYou />
      <Testimonials />
    </div>
  );
};

export default about;
