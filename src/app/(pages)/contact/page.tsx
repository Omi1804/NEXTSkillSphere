"use client";
import CommonHero from "@/components/CommonHero";
import Details from "@/components/ContactUs/Details";
import GetInTouch from "@/components/ContactUs/GetInTouch";
import MyGoogleMap from "@/components/ContactUs/MyGoogleMap";

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
