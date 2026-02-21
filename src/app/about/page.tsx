import {
  CoursesForYou,
  Educations,
  Options,
} from "@/components/AboutComponents";
import CommonHero from "@/components/CommonHero";
import JoinCourse from "@/components/HomeComponents/JoinCourse";

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
      <Educations />
      <CoursesForYou />
      <JoinCourse />
    </div>
  );
};

export default about;
