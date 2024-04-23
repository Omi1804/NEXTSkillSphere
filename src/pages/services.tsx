import CommonHero from "@/components/CommonHero";

import JoinCourse from "@/components/HomeComponents/JoinCourse";
import AllServices from "@/components/ServicesComponents/AllServices";
import ModernTechniques from "@/components/ServicesComponents/ModernTechniques";
import SpecialFeatures from "@/components/ServicesComponents/SpecialFeatures";
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
      <ModernTechniques />
      <SpecialFeatures />
      <JoinCourse />
    </div>
  );
};

export default Services;
