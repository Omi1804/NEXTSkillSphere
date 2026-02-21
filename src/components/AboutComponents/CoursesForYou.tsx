"use client";
import styles from "@/app/styles/about.module.css";
import { useState } from "react";

export const CoursesForYou = () => {
  const [active, setActive] = useState(1);

  interface CommonComponentInterface {
    heading: string;
  }

  const CommonComponent1 = ({ heading }: CommonComponentInterface) => {
    return (
      <div className=" w-[50%] py-8 px-[4rem]">
        <h1 className="font-body font-extrabold text-3xl tracking-wide ">
          {heading}
        </h1>
        <p className="w-[10rem] bg-[#00ECA3] h-[3px] my-6 cursor-pointer rounded-lg hover:w-[15rem] duration-500 "></p>
        <p className="text-lg font-heading font-extralight tracking-wide my-10">
          Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation
        </p>
        <ul>
          <li className="flex items-center justify-start gap-3">
            <span className="material-symbols-outlined text-[#09AEFE]">
              radio_button_checked
            </span>
            <p className="text-lg font-heading font-light">
              Nullam in nulla fermentum,
            </p>
          </li>
          <li className="flex items-center justify-start gap-3 my-4">
            <span className="material-symbols-outlined text-[#09AEFE]">
              radio_button_checked
            </span>
            <p className="text-lg font-heading font-light">
              Efficitur erat vel, sodales massa.
            </p>
          </li>
          <li className="flex items-center justify-start gap-3 my-4">
            <span className="material-symbols-outlined text-[#09AEFE]">
              radio_button_checked
            </span>
            <p className="text-lg font-heading font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </li>
          <li className="flex items-center justify-start gap-3 my-4">
            <span className="material-symbols-outlined text-[#09AEFE]">
              radio_button_checked
            </span>
            <p className="text-lg font-heading font-light">
              Mauris et lorem id justo tempus dictum.
            </p>
          </li>
          <li className="flex items-center justify-start gap-3 my-4">
            <span className="material-symbols-outlined text-[#09AEFE]">
              radio_button_checked
            </span>
            <p className="text-lg font-heading font-light">
              Cras molestie tortor in augue dictum
            </p>
          </li>
        </ul>
      </div>
    );
  };

  const renderContent = () => {
    switch (active) {
      case 1:
        return (
          <div className="flex w-full">
            {
              <CommonComponent1
                heading={"The Prodigious eLearning Courses for you"}
              />
            }
          </div>
        );
      case 2:
        return (
          <div className="flex w-full">
            {
              <CommonComponent1
                heading={
                  "Lorem ipsum dolor sit, amet adipisicing, consectetur."
                }
              />
            }
          </div>
        );
      case 3:
        return (
          <div className="flex w-full">
            {
              <CommonComponent1
                heading={"Commodi consequuntur hic dicta sed?"}
              />
            }
          </div>
        );
      case 4:
        return (
          <div className="flex w-full">
            {
              <CommonComponent1
                heading={"Sequi tenetur dolores id doloribus officia."}
              />
            }
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className=" flex item-center justify-start bg-[url('/fw13.jpg')] bg-no-repeat bg-center bg-cover px-[4rem] py-[6rem]">
      <div className=" w-[10%]">
        <ul
          className={`w-[100%] h-full flex flex-col items-end justify-center ${styles.learningAllList}`}
        >
          <li
            className={`${styles.learningList} ${styles.firstLink}`}
            onClick={() => setActive(1)}
          >
            <p
              className={`${styles.learningLink} ${
                active === 1 && styles.currentLink
              } `}
            >
              <span className={styles.learningNumber}> 1/4</span>
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
              <span className={styles.learningNumber}> 2/4</span>
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
              <span className={styles.learningNumber}> 3/4</span>
            </p>
          </li>
          <li
            className={`${styles.learningList} ${styles.fourthLink}`}
            onClick={() => setActive(4)}
          >
            <p
              className={`${styles.learningLink} ${
                active === 4 && styles.currentLink
              } `}
            >
              <span className={styles.learningNumber}> 4/4</span>
            </p>
          </li>
        </ul>
      </div>
      {renderContent()}
    </div>
  );
};
