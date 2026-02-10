"use client";
import { useInView } from "react-intersection-observer";

const CourseList = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.2, // Trigger when 50% of the element is visible
  });

  return (
    <div
      ref={ref}
      className={`relative ${!inView && "opacity-0"} duration-500`}
    >
      <div className="text-center w-full h-[33rem] bg-[url('/group-image.jpg')] bg-center bg-cover bg-no-repeat pt-16">
        <h1 className="text-white font-extrabold text-[2.5rem] mt-5 animate-slide-in-from-bottom">
          Become a Pro with these Course
        </h1>
        <p className="text-white font-light text-base mt-2 animate-slide-in-from-bottom">
          JUST PICK WHAT YOU NEED TO LEARN
        </p>
      </div>
      <div className=" absolute flex gap-8 justify-items-center w-full px-20 top-[20.74%]">
        <div
          className={`overflow-hidden rounded-xl hover:rounded-tl-[3rem] shadow-md hover:shadow-2xl duration-300 animate-delay-500 opacity-0 ${
            inView && "animate-slide-in-from-left"
          }`}
        >
          <div className="relative h-[16.81rem]">
            <img
              src="/homeCourses2.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute top-0 left-0 flex hover:bg-[#00ECA3] w-full h-full items-center justify-center cursor-pointer duration-500 opacity-0 hover:opacity-95 ">
              <p className="text-white font-bold">View Details</p>
              <span className="material-symbols-outlined text-white">
                visibility
              </span>
            </div>
          </div>
          <div className="px-10 py-14 text-center bg-white">
            <h1 className="font-extrabold text-[1.8rem] mb-4">
              <span className="text-[#00ECA3] mx-1 ">01 </span>
              GREAT FOR HIGH SCHOOL
            </h1>
            <p className="font-extralight text-base w-[90%] leading-6 tracking-wide">
              Ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
          </div>
        </div>
        <div
          className={`overflow-hidden h-[90%] rounded-xl hover:rounded-tl-[3rem] shadow-md hover:shadow-2xl duration-300 animate-delay-500 opacity-0 ${
            inView && "animate-slide-in-from-bottom"
          }`}
        >
          <div className="relative h-[16.81rem]">
            <img
              src="/homeCourses3.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute top-0 left-0 flex hover:bg-[#00ECA3] w-full h-full items-center justify-center cursor-pointer duration-500 opacity-0 hover:opacity-95  ">
              <p className="text-white font-bold">View Details</p>
              <span className="material-symbols-outlined text-white">
                visibility
              </span>
            </div>
          </div>
          <div className="relative px-10 py-8 text-center  bg-white">
            <h1 className="font-extrabold text-[1.8rem] mb-4">
              <span className="text-[#00ECA3] mx-1">02 </span>
              GROUP TRAINING
            </h1>
            <p className="font-extralight text-base w-[90%] leading-6 tracking-wide">
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            </p>
          </div>
        </div>
        <div
          className={` overflow-hidden rounded-xl hover:rounded-tl-[3rem] shadow-md hover:shadow-2xl duration-300 animate-delay-500 opacity-0 ${
            inView && "animate-slide-in-from-right"
          }`}
        >
          <div className="relative h-[16.81rem]">
            <img
              src="/homeCourses1.jpg"
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute top-0 left-0 flex hover:bg-[#00ECA3] w-full h-full items-center justify-center cursor-pointer duration-500 opacity-0 hover:opacity-95 ">
              <p className="text-white font-bold ">View Details</p>
              <span className="material-symbols-outlined text-white">
                visibility
              </span>
            </div>
          </div>
          <div className="px-10 py-14 text-center bg-white">
            <h1 className="font-extrabold text-[1.8rem] mb-4">
              <span className="text-[#00ECA3] mx-1">03 </span>
              BETTER FOR GROUP STUDIES
            </h1>
            <p className="font-extralight text-base w-[90%] leading-6 tracking-wide">
              Amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center pb-24 px-10 justify-end text-center w-full h-[45rem] bg-[url('/doodle-shape2.webp')] bg-center bg-contain bg-no-repeat">
        <h1
          className={`font-extrabold text-[2.5rem] my-1 ${
            inView && "animate-slide-in-from-bottom"
          } opacity-0 animate-delay-1000`}
        >
          Start Learning Online
        </h1>

        <p
          className={`font-extralight text-base tracking-wider ${
            inView && "animate-slide-in-from-bottom"
          } opacity-0 animate-delay-1000`}
        >
          FOR FREE. HOW TO ELEARN
        </p>
        <p
          className={`mt-12 w-[55%] text-lg font-extralight ${
            inView && "animate-slide-in-from-bottom"
          } opacity-0 animate-delay-1000`}
        >
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
