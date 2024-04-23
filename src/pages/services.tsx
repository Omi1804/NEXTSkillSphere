import CommonHero from "@/components/CommonHero";
import CaseStudies from "@/components/HomeComponents/CaseStudies";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import AllServices from "@/components/ServicesComponents/AllServices";
import React from "react";

const Services = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-services.png"}
        heroHeading={"Services"}
        subHeading={"SERVICES"}
      />
      <AllServices />
      <JoinCourse />
    </div>
  );
};

export default Services;
