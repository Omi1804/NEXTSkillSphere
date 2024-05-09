import { useInView } from "react-intersection-observer";

const CoursesRecommendation = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });
  return (
    <div
      ref={ref}
      className={`${!inView && "opacity-0"} opacity-100 duration-500`}
    >
      <div className="py-16 px-20 bg-[url('/violet-pista-curve.webp')] bg-[#fafafa] bg-no-repeat bg-center bg-contain grid gap-10 grid-cols-4 justify-items-center">
        <div
          className={`opacity-0 w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ${
            inView && "animate-slide-in-from-left"
          }`}
        >
          <div className="w-[4rem] h-[4rem] object-contain mb-8">
            <img src="/icons/desktop.webp" className="w-full h-full" alt="" />
          </div>
          <h3 className="font-heading font-extrabold text-xl">1600</h3>
          <p className="font-body font-light text-base">LEARN ANYTHING</p>
        </div>
        <div
          className={`opacity-0 w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ${
            inView && "animate-slide-in-from-bottom"
          }`}
        >
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
        <div
          className={`opacity-0 w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ${
            inView && "animate-slide-in-from-top"
          }`}
        >
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
        <div
          className={`opacity-0 w-full py-14 flex flex-col justify-center items-center hover:bg-[#6a7df1] hover:text-white rounded-2xl rounded-tl-[3rem] duration-500 hover:shadow-xl cursor-pointer ${
            inView && "animate-slide-in-from-right"
          }`}
        >
          <div className="w-[4rem] h-[4rem] object-contain mb-8">
            <img src="/icons/apple.webp" className="w-full h-full" alt="" />
          </div>
          <h3 className="font-heading font-extrabold text-xl">250</h3>
          <p className="font-body font-light text-base">
            ALL TRAINED PROFESSIONALS
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoursesRecommendation;
