import CommonHero from "@/components/CommonHero";
import MyCourses from "@/components/MyCart/MyCourses";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "My learning",
  description: "Access the courses connected to your learning account.",
  path: "/mycart",
  noIndex: true,
});

const mycart = () => {
  return (
    <div>
      <CommonHero Image={"/home-2-intro.jpg"} heroHeading={"My Learning"} subHeading={"MY CART"} />
      <MyCourses />
    </div>
  );
};

export default mycart;
