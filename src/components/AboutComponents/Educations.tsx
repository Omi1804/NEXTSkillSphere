import styles from "@/app/styles/about.module.css";

export const Educations = () => {
  return (
    <div className="grid grid-cols-2 bg-[url('/fw12.webp')] bg-no-repeat bg-center bg-contain px-[5rem] py-[6rem]">
      <div className="pr-10">
        <h1 className="font-body font-extrabold text-3xl mb-5">
          Promoting Good Education since the very beginning
        </h1>
        <p className="w-[8rem] h-[3px] bg-[#00ECA3] rounded-xl my-5"></p>
        <p className="my-8 text-base text-justify font-extralight tracking-wide font-body">
          Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip commodo
          consequat.
        </p>
        <div className="flex items-center justify-between my-10">
          <div className="w-[10rem] h-[7rem] p-9 bg-[#fafafa] flex items-center justify-center object-contain">
            <img src="/icons/partner1.webp" alt="" />
          </div>
          <div className="w-[10rem] h-[7rem] p-9 bg-[#fafafa] flex items-center justify-center object-contain">
            <img src="/icons/partner2.webp" alt="" />
          </div>
          <div className="w-[10rem] h-[7rem] p-9 bg-[#fafafa] flex items-center justify-center object-contain">
            <img src="/icons/partner3.webp" alt="" />
          </div>
        </div>
      </div>
      <div className="px-10 flex flex-col justify-between relative">
        <div className="my-1">
          <div className={`${styles.educationBar} before:w-[40%]`}></div>
          <p className="text-sm font-body font-semibold mt-1 tracking-wide ">
            OUTSOURCING EDUCATION
            <span className={`${styles.educationBarSpan} font-body`}>60%</span>
          </p>
        </div>
        <div className="my-1">
          <div className={`${styles.educationBar} before:w-[35%]`}></div>
          <p className="text-sm font-body font-semibold mt-1 tracking-wide ">
            BUSINESS DEVELOPMENT
            <span className={`${styles.educationBarSpan} font-body`}>50%</span>
          </p>
        </div>
        <div className="my-1">
          <div className={`${styles.educationBar} before:w-[28%]`}></div>
          <p className="text-sm font-body font-semibold mt-1 tracking-wide ">
            CREATIVE DESIGN
            <span className={`${styles.educationBarSpan} font-body`}>80%</span>
          </p>
        </div>
        <div className="my-1">
          <div className={`${styles.educationBar} before:w-[26%]`}></div>
          <p className="text-sm font-body font-semibold mt-1 tracking-wide ">
            SOCIAL STUDIES
            <span className={`${styles.educationBarSpan} font-body`}>70%</span>
          </p>
        </div>
        <div className="my-1">
          <div className={`${styles.educationBar} before:w-[31%]`}></div>
          <p className="text-sm font-body font-semibold mt-1 tracking-wide ">
            TECHNICAL STUDIES
            <span className={`${styles.educationBarSpan} font-body`}>35%</span>
          </p>
        </div>
      </div>
    </div>
  );
};
