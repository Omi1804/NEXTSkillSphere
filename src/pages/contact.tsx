import CommonHero from "@/components/CommonHero";
import Details from "@/components/ContactUs/Details";
import GetInTouch from "@/components/ContactUs/GetInTouch";
import MyGoogleMap from "@/components/ContactUs/MyGoogleMap";
import styles from "@/styles/contact.module.css";

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
