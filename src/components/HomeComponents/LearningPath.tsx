import styles from "@/styles/home.module.css";
import Link from "next/link";
import { useState } from "react";

const LearningPath = () => {
  const [active, setActive] = useState(1);

  const CommonComponent = () => {
    return (
      <div className="border-2 py-5 px-24 w-[50%] text-left">
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
            <li className="flex items-center my-6">
              <img className="w-8 h-8 mr-5" src="/icons/bulb.webp" alt="" />
              <span className="text-base font-light font-heading">
                Creative Study Pattern
              </span>
            </li>
            <li className="flex items-center my-6">
              <img className="w-8 h-8 mr-5" src="/icons/rocket.webp" alt="" />
              <span className="text-base font-light font-heading">
                Quick Crash Courses
              </span>
            </li>
            <li className="flex items-center my-6">
              <img
                className="w-8 h-8 mr-5"
                src="icons/protractor.webp"
                alt=""
              />
              <span className="text-base font-light font-heading">
                Provided with Experimental Examples
              </span>
            </li>
            <li className="flex items-center mt-6">
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
          <button className={`${styles.homebtn} relative bottom-5`}>
            Discover New Courses
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (active) {
      case 1:
        return (
          <div className="border-2 border-red-500 flex w-full">
            {<CommonComponent />}
            <div className="border-2 py-5 px-20 w-[50%]"></div>
          </div>
        );
      case 2:
        return (
          <div className="border-2 border-red-500 flex w-full">
            {<CommonComponent />}
            <div className="border-2 py-5 px-20 w-[50%]"></div>
          </div>
        );
      case 3:
        return (
          <div className="border-2 border-red-500 flex w-full">
            {<CommonComponent />}
            <div className="border-2 py-5 px-20 w-[50%]"></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" py-20 text-center bg-[#fffff]">
      <h1 className="font-body font-extrabold text-[2.5rem]">
        Know why we are best
      </h1>
      <p className="font-body font-extralight text-lg">
        LEARNING VIA APP NEVER GETS EASIER
      </p>
      <ul className={`mt-10  w-[50%] m-auto flex ${styles.learningAllList}`}>
        <li
          className={`${styles.learningList} ${styles.firstLink}`}
          onClick={() => setActive(1)}
        >
          <Link
            href=""
            className={`${styles.learningLink} ${
              active === 1 && styles.currentLink
            } `}
          >
            Creating a Better Future For you
          </Link>
        </li>
        <li
          className={`${styles.learningList} ${styles.secondLink}`}
          onClick={() => setActive(2)}
        >
          <Link
            href=""
            className={`${styles.learningLink} ${
              active === 2 && styles.currentLink
            } `}
          >
            Learn why eLearny is Best
          </Link>
        </li>
        <li
          className={`${styles.learningList} ${styles.thirdLink}`}
          onClick={() => setActive(3)}
        >
          <Link
            href=""
            className={`${styles.learningLink} ${
              active === 3 && styles.currentLink
            } `}
          >
            Our Simple & Effective process
          </Link>
        </li>
      </ul>
      <div className="w-full mt-10">{renderContent()}</div>
    </div>
  );
};

export default LearningPath;
