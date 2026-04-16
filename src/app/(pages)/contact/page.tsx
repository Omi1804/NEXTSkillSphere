import CommonHero from "@/components/CommonHero";
import Details from "@/components/ContactUs/Details";
import GetInTouch from "@/components/ContactUs/GetInTouch";
import MyGoogleMap from "@/components/ContactUs/MyGoogleMap";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact eLearni for course questions, platform support, enrollment help, and partnership inquiries.",
  path: "/contact",
  keywords: ["contact eLearni", "learning support", "course help"],
});

const Contact = () => {
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-students.png"}
        heroHeading={"Contact"}
        subHeading={"CONTACT"}
      />
      <MyGoogleMap />
      <Details />
      <GetInTouch />
    </div>
  );
};

export default Contact;
