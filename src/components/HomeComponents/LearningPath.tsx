import styles from "@/styles/home.module.css";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const LearningPath = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.2, // Trigger when 50% of the element is visible
  });

  const [active, setActive] = useState(1);

  interface Component2 {
    path1: string;
    path2: string;
  }
  const CommonComponent1 = () => {
    return (
      <div className=" py-5 px-24 w-[50%] text-left">
        <h1 className="font-body font-bold text-3xl text-[#222222] py-2">
          The Prodigious eLearning Courses for you
        </h1>
        <p className="w-[5rem] my-2 h-[3px] bg-[#00ECA3]"></p>
        <div className="my-6">
          <p className="font-body text-base font-light tracking-wide leading-8 my-8">
            Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation.
          </p>
          <ul>
            <li
              className={`opacity-0 flex items-center my-6 ${
                inView && "animate-slide-in-from-left"
              } animate-delay-250`}
            >
              <img className="w-8 h-8 mr-5" src="/icons/bulb.webp" alt="" />
              <span className="text-base font-light font-heading">
                Creative Study Pattern
              </span>
            </li>
            <li
              className={`opacity-0 flex items-center my-6 ${
                inView && "animate-slide-in-from-left"
              } animate-delay-500`}
            >
              <img className="w-8 h-8 mr-5" src="/icons/rocket.webp" alt="" />
              <span className="text-base font-light font-heading">
                Quick Crash Courses
              </span>
            </li>
            <li
              className={`opacity-0 flex items-center my-6 ${
                inView && "animate-slide-in-from-left"
              } animate-delay-750`}
            >
              <img
                className="w-8 h-8 mr-5"
                src="icons/protractor.webp"
                alt=""
              />
              <span className="text-base font-light font-heading">
                Provided with Experimental Examples
              </span>
            </li>
            <li
              className={`opacity-0 flex items-center mt-6 ${
                inView && "animate-slide-in-from-left"
              } animate-delay-1000`}
            >
              <img
                className="w-8 h-8 mr-5"
                src="/icons/certificate-icon.webp"
                alt=""
              />
              <span className="text-base font-light font-heading">
                Certification Awarded
              </span>
            </li>
          </ul>
          <button
            className={`${styles.homebtn} relative bottom-5 ${
              inView && "animate-slide-in-from-bottom"
            }`}
          >
            Discover New Courses
          </button>
        </div>
      </div>
    );
  };

  const CommonComponent2 = ({ path1, path2 }: Component2) => {
    return (
      <div className="p-4 pl-10 w-[50%] h-full flex justify-center items-center">
        <div className={`${styles.figure1}`}>
          <div className={`${styles.blueFigure}`}></div>
          <div
            className={`h-[30rem] object-contain rounded-xl overflow-hidden shadow-lg ${
              styles.learningImgContainer1
            } ${inView && "animate-slide-in-from-top"}`}
          >
            <img src={path1} className="w-full h-full" alt="" />
          </div>
        </div>
        <div className={`mt-10 mx-7 ${styles.figure2}`}>
          <div className={`${styles.blueFigure2}`}></div>
          <div
            className={`h-[30rem] object-contain rounded-xl overflow-hidden shadow-lg ${
              styles.learningImgContainer2
            } ${inView && "animate-slide-in-from-bottom"}`}
          >
            <img src={path2} className="w-full h-full" alt="" />
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (active) {
      case 1:
        return (
          <div className="flex w-full justify-center items-center px-16">
            {<CommonComponent1 />}
            {
              <CommonComponent2
                path1={"/man-laptop.jpg"}
                path2={"/girl-ipad.jpg"}
              />
            }
          </div>
        );
      case 2:
        return (
          <div className="flex w-full justify-center items-center px-16">
            {<CommonComponent1 />}
            <CommonComponent2
              path1={"/home-tab-2.jpg"}
              path2={"/home-tab-4.jpg"}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex w-full justify-center items-center px-16">
            {<CommonComponent1 />}
            <CommonComponent2
              path1={"/home-tab-3.jpg"}
              path2={"/student-writing.jpg"}
            />
          </div>
        );
      default:
        return null;
    }
  };

  console.log(inView);

  return (
    <div
      ref={ref}
      className={`w-full py-20 text-center bg-[#fffff] ${
        !inView && "opacity-0"
      }`}
    >
      <h1
        className={`font-body font-extrabold text-[2.5rem] ${
          inView && "animate-slide-in-from-bottom"
        }`}
      >
        Know why we are best
      </h1>
      <p
        className={`font-body font-extralight text-lg ${
          inView && "animate-slide-in-from-bottom"
        }`}
      >
        LEARNING VIA APP NEVER GETS EASIER
      </p>
      <ul className={`mt-10  w-[50%] m-auto flex ${styles.learningAllList}`}>
        <li
          className={`${styles.learningList} ${styles.firstLink}`}
          onClick={() => setActive(1)}
        >
          <p
            className={`${styles.learningLink} ${
              active === 1 && styles.currentLink
            } `}
          >
            Creating a Better Future For you
          </p>
        </li>
        <li
          className={`${styles.learningList} ${styles.secondLink}`}
          onClick={() => setActive(2)}
        >
          <p
            className={`${styles.learningLink} ${
              active === 2 && styles.currentLink
            } `}
          >
            Learn why eLearny is Best
          </p>
        </li>
        <li
          className={`${styles.learningList} ${styles.thirdLink}`}
          onClick={() => setActive(3)}
        >
          <p
            className={`${styles.learningLink} ${
              active === 3 && styles.currentLink
            } `}
          >
            Our Simple & Effective process
          </p>
        </li>
      </ul>
      <div className="w-full mt-16 ">{renderContent()}</div>
    </div>
  );
};

export default LearningPath;
