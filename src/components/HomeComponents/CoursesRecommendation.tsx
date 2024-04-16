import styles from "@/styles/home.module.css";

const CoursesRecommendation = () => {
  return (
    <div>
      <div className="py-16 px-20 bg-[url('/violet-pista-curve.webp')] bg-[#fafafa] bg-no-repeat bg-center bg-contain grid gap-10 grid-cols-4 justify-items-center">
        <div className=" w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ">
          <div className="w-[4rem] h-[4rem] object-contain mb-8">
            <img src="/icons/desktop.webp" className="w-full h-full" alt="" />
          </div>
          <h3 className="font-heading font-extrabold text-xl">1600</h3>
          <p className="font-body font-light text-base">LEARN ANYTHING</p>
        </div>
        <div className=" w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ">
          <div className="w-[4rem] h-[4rem] object-contain mb-8">
            <img
              src="/icons/tests-taken.webp"
              className="w-full h-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl">15900</h3>
          <p className="font-body font-light text-base">THATS A LOT</p>
        </div>
        <div className=" w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ">
          <div className="w-[4rem] h-[4rem] object-contain mb-8">
            <img
              src="/icons/student-genius.webp"
              className="w-full h-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-extrabold text-xl">1900</h3>
          <p className="font-body font-light text-base">FUTURE GENIUS</p>
        </div>
        <div className=" w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ">
          <div className="w-[4rem] h-[4rem] object-contain mb-8">
            <img src="/icons/apple.webp" className="w-full h-full" alt="" />
          </div>
          <h3 className="font-heading font-extrabold text-xl">250</h3>
          <p className="font-body font-light text-base">
            ALL TRAINED PROFESSIONALS
          </p>
        </div>
      </div>
      <div className="border-2 py-16"></div>
    </div>
  );
};

export default CoursesRecommendation;
