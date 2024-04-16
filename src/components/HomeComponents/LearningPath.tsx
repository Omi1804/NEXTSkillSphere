import styles from "@/styles/home.module.css";
import Link from "next/link";
import { useState } from "react";

const LearningPath = () => {
  const [active, setActive] = useState(1);

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
    </div>
  );
};

export default LearningPath;
