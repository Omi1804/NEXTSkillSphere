import { CoursesForYou, Educations, Options } from "@/components/AboutComponents";
import CommonHero from "@/components/CommonHero";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Learn more about eLearni, our teaching philosophy, and how we help learners grow with structured online education.",
  path: "/about",
  keywords: ["about eLearni", "online education company", "learning platform mission"],
});

const about = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb.png"}
        heroHeading={"About"}
        subHeading={"ABOUT"}
      />

      <Options />
      <Educations />
      <CoursesForYou />
      <JoinCourse />
    </div>
  );
};

export default about;
