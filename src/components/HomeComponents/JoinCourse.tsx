"use client";
import style from "@/app/styles/home.module.css";
import { useInView } from "react-intersection-observer";

const JoinCourse = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.2, // Trigger when 50% of the element is visible
  });

  return (
    <div
      ref={ref}
      className="border-t-1 flex py-28 flex-col items-center bg-[url('/doodleimage.jpg')] bg-cover bg-no-repeat bg-center w-full "
    >
      <h1
        className={`opacity-0 font-extrabold text-5xl mb-4 ${
          inView && "animate-slide-in-from-bottom"
        }`}
      >
        Start a Journey. Enroll Now
      </h1>
      <p
        className={`opacity-0 font-extralight text-base tracking-wider ${
          inView && "animate-slide-in-from-bottom"
        }`}
      >
        LEARN SOMETHING WHEREVER YOU ARE
      </p>
      <button
        className={`opacity-0 ${style.homebtn} ${
          inView && "animate-slide-in-from-bottom"
        } animate-delay-500`}
      >
        <p className="relative z-10 text-white">Join a Course Now</p>
      </button>
    </div>
  );
};

export default JoinCourse;
