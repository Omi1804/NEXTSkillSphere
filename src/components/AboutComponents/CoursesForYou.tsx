import styles from "@/styles/about.module.css";
import { useState } from "react";

export const CoursesForYou = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="border-2 border-blue-500 bg-[url('/fw13.jpg')] px-[4rem] py-[6rem]">
      <div>
        <ul
          className={`w-[10%] h-full border-2 border-red-500 flex flex-col items-center justify-start ${styles.learningAllList}`}
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
              1/4
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
              2/4
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
              3/4
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
              4/4
            </p>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};
