import CommonHero from "@/components/CommonHero";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Students",
  description: "Student-focused information for the eLearni learning platform.",
  path: "/students",
  noIndex: true,
});

const Students = () => {
  return (
    <div>
      <CommonHero Image={"/home-2-intro.jpg"} heroHeading={"Students"} subHeading={"STUDENTS"} />
    </div>
  );
};

export default Students;
