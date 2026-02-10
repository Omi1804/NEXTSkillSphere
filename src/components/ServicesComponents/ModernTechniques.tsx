import styles from "@/app/styles/services.module.css";

const ModernTechniques = () => {
  return (
    <div className="bg-[url(/fw12.webp)] bg-cover bg-no-repeat px-[4rem] py-[6rem] flex">
      <div className={`w-[25rem] h-[25rem] mx-auto  ${styles.ImageContainer}`}>
        <div
          className={`object-contain w-[25rem] h-[25rem] ${styles.techniqueImage}`}
        >
          <img
            src="girl-headphone.webp"
            className={`w-full h-full ${styles.servicesImage}`}
            alt=""
          />
        </div>
      </div>
      <div className="w-[60%] px-8 py-2">
        <p className="font-light font-heading text-base tracking-wide mb-2">
          GET THE GRIP OF ELEARNY
        </p>
        <h1 className="font-body font-bold mb-2 text-3xl">
          A Modern Learning Technique
        </h1>
        <p className="w-[8rem] h-[3px] bg-[#00ECA3] my-4"></p>

        <div className="my-12 grid grid-cols-2 grid-rows-3 gap-5">
          <div className="flex justify-start items-center gap-2">
            <span className="material-symbols-outlined text-lg text-blue-400">
              adjust
            </span>
            <p className="text-base font-body font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="material-symbols-outlined text-lg text-blue-400">
              adjust
            </span>
            <p className="text-base font-body font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="material-symbols-outlined text-lg text-blue-400">
              adjust
            </span>
            <p className="text-base font-body font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="material-symbols-outlined text-lg text-blue-400">
              adjust
            </span>
            <p className="text-base font-body font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="material-symbols-outlined text-lg text-blue-400">
              adjust
            </span>
            <p className="text-base font-body font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </div>
          <div className="flex justify-start items-center gap-2">
            <span className="material-symbols-outlined text-lg text-blue-400">
              adjust
            </span>
            <p className="text-base font-body font-light">
              Phasellus quis quam auctor, mollis
            </p>
          </div>
        </div>
        <button className={styles.homebtn}>
          <p className="relative z-10 text-white">Search for Courses</p>
        </button>
      </div>
    </div>
  );
};

export default ModernTechniques;
