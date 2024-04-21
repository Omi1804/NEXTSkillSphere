import styles from "@/styles/about.module.css";

export const Educations = () => {
  return (
    <div className="grid grid-cols-2 bg-[url('/fw12.webp')] bg-no-repeat bg-center bg-contain px-[5rem] py-[8rem]">
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
      <div className="p-8 border-2">
        <div className="border-2 py-2">
          <div className={styles.educationBar}></div>
          <p className="text-sm font-body font-semibold mt-2 tracking-wide">
            OUTSOURCING EDUCATION
          </p>
          <span>60%</span>
        </div>
      </div>
    </div>
  );
};
