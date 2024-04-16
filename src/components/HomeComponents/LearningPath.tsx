import styles from "@/styles/home.module.css";

const LearningPath = () => {
  return (
    <div className=" py-20 text-center bg-[#fffff]">
      <h1 className="font-body font-extrabold text-[2.5rem]">
        Know why we are best
      </h1>
      <p className="font-body font-extralight text-lg">
        LEARNING VIA APP NEVER GETS EASIER
      </p>
      <ul className={`mt-20  w-[50%] m-auto flex ${styles.learningAllList}`}>
        <li className={`${styles.learningList}`}>
          <a href="" className={`${styles.learningLink} ${styles.currentLink}`}>
            Creating a Better Future For you
          </a>
        </li>
        <li className={`${styles.learningList}`}>
          <a href="" className={`${styles.learningLink}`}>
            Learn why eLearny is Best
          </a>
        </li>
        <li className={`${styles.learningList}`}>
          <a href="" className={`${styles.learningLink} `}>
            Our Simple & Effective process
          </a>
        </li>
      </ul>
    </div>
  );
};

export default LearningPath;
