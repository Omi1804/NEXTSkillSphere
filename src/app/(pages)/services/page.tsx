import CommonHero from "@/components/CommonHero";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import AllServices from "@/components/ServicesComponents/AllServices";
import ModernTechniques from "@/components/ServicesComponents/ModernTechniques";
import SpecialFeatures from "@/components/ServicesComponents/SpecialFeatures";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Explore eLearni services including practical online courses, guided learning experiences, and flexible skill development.",
  path: "/services",
  keywords: ["online learning services", "course platform features", "skill development"],
});

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
