import { useState } from "react";
import { useInView } from "react-intersection-observer";

const Curriculum = () => {
  const [toshow, setToshow] = useState(1);
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });

  const handleClick = (value: number) => {
    setToshow(value);
  };

  return (
    <div
      ref={ref}
      className={`w-full h-[92vh] bg-[url('/fw2.jpg')] bg-center bg-no-repeat bg-cover p-24 overflow-hidden${
        !inView && "opacity-0"
      }`}
    >
      <div className=" w-[40%] float-right mb-7">
        <p
          className={`font-body font-bold text-3xl w-[90%] opacity-0 ${
            inView && "animate-slide-in-from-left"
          }`}
        >
          Learn with these award winning courses
        </p>
        <div
          className={`opacity-0 ${
            inView && "animate-slide-in-from-bottom"
          } animate-delay-500`}
        >
          <div
            className={`my-8 overflow-hidden  duration-500 ${
              toshow == 1 ? "h-[10rem]" : "h-[4rem]"
            }`}
            onClick={() => handleClick(1)}
          >
            <div
              className={` px-8 py-4 rounded-lg justify-between cursor-pointer rounded-tl-3xl text-white flex items-center ${
                toshow == 1
                  ? "bg-gradient-to-r from-[#00eda4] to-[#6a7df1]"
                  : "bg-[#222222]"
              }`}
            >
              <p className="font-heading font-bold tracking-wide">
                01. Great Online Instructors
              </p>
              {toshow == 1 ? (
                <span className="material-symbols-outlined">remove</span>
              ) : (
                <span className="material-symbols-outlined">add</span>
              )}
            </div>
            <p className={`mx-8 my-4 w-[80%] font-light text-base font-body`}>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt. Ut labore et dolore magna aliqua. Ut enim ad minim
              veniam
            </p>
          </div>
          <div
            className={`my-8 overflow-hidden  duration-500 ${
              toshow == 2 ? "h-[10rem]" : "h-[4rem]"
            }`}
            onClick={() => handleClick(2)}
          >
            <div
              className={` px-8 py-4 rounded-lg justify-between cursor-pointer rounded-tl-3xl text-white flex items-center ${
                toshow == 2
                  ? "bg-gradient-to-r from-[#00eda4] to-[#6a7df1]"
                  : "bg-[#222222]"
              }`}
            >
              <p className="font-heading font-bold tracking-wide">
                02. Get Learny Certified Awards
              </p>
              {toshow == 2 ? (
                <span className="material-symbols-outlined">remove</span>
              ) : (
                <span className="material-symbols-outlined">add</span>
              )}
            </div>
            <p className={`mx-8 my-4 w-[80%] font-light text-base font-body `}>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt. Ut labore et dolore magna aliqua. Ut enim ad minim
              veniam
            </p>
          </div>
          <div
            className={`my-8 overflow-hidden  duration-500 ${
              toshow == 3 ? "h-[10rem]" : "h-[4rem]"
            }`}
            onClick={() => handleClick(3)}
          >
            <div
              className={` px-8 py-4 rounded-lg justify-between cursor-pointer rounded-tl-3xl text-white flex items-center ${
                toshow == 3
                  ? "bg-gradient-to-r from-[#00eda4] to-[#6a7df1]"
                  : "bg-[#222222]"
              }`}
            >
              <p className="font-heading font-bold tracking-wide">
                03. Exclusive Course Materials
              </p>
              {toshow == 3 ? (
                <span className="material-symbols-outlined">remove</span>
              ) : (
                <span className="material-symbols-outlined">add</span>
              )}
            </div>
            <p className={`mx-8 my-4 w-[80%] font-light text-base font-body`}>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt. Ut labore et dolore magna aliqua. Ut enim ad minim
              veniam
            </p>
          </div>
          <div
            className={`my-8 overflow-hidden  duration-500 ${
              toshow == 4 ? "h-[10rem]" : "h-[4rem]"
            }`}
            onClick={() => handleClick(4)}
          >
            <div
              className={` px-8 py-4 rounded-lg justify-between cursor-pointer rounded-tl-3xl text-white flex items-center ${
                toshow == 4
                  ? "bg-gradient-to-r from-[#00eda4] to-[#6a7df1]"
                  : "bg-[#222222]"
              }`}
            >
              <p className="font-heading font-bold tracking-wide">
                04. In - depth Course Analysis
              </p>
              {toshow == 4 ? (
                <span className="material-symbols-outlined">remove</span>
              ) : (
                <span className="material-symbols-outlined">add</span>
              )}
            </div>
            <p className={`mx-8 my-4 w-[80%] font-light text-base font-body `}>
              Dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt. Ut labore et dolore magna aliqua. Ut enim ad minim
              veniam
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curriculum;
