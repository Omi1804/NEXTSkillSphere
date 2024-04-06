import styles from "@/styles/home.module.css";

const CourseList = () => {
  return (
    <div className="relative border-2 border-blue-500">
      <div className="border-2 border-red-500 text-center w-full h-[33rem] bg-[url('/group-image.jpg')] bg-center bg-cover bg-no-repeat pt-16">
        <h1 className="text-white font-extrabold text-[2.5rem] mt-5">
          Become a Pro with these Course
        </h1>
        <p className="text-white font-light text-base mt-2">
          JUST PICK WHAT YOU NEED TO LEARN
        </p>
      </div>
      <div className="absolute grid grid-cols-3 gap-8 justify-items-center">
        <div>
          <div></div>
          <div>
            <h1>
              <span>01</span>
              GREAT FOR HIGH SCHOOL
            </h1>
            <p>
              Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="border-2 border-red-500 flex flex-col items-center pb-24 px-10 justify-end text-center w-full h-[45rem] bg-[url('/doodle-shape2.webp')] bg-center bg-contain bg-no-repeat">
        <h1 className="font-extrabold text-[2.5rem] my-1  ">
          Start Learning Online
        </h1>

        <p className="font-extralight text-base tracking-wider">
          FOR FREE. HOW TO ELEARN
        </p>
        <p className="mt-12 w-[55%] text-lg font-extralight">
          Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt. ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    </div>
  );
};

export default CourseList;
