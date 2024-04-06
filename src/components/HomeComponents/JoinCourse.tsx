import React from "react";
import style from "@/styles/home.module.css";

const JoinCourse = () => {
  return (
    <div className="border-t-1  flex py-28 flex-col items-center bg-[url('/doodleimage.jpg')] bg-contain bg-no-repeat bg-center w-full h-[65vh]">
      <h1 className="font-extrabold text-5xl mb-4">
        Start a Journey. Enroll Now
      </h1>
      <p className="font-extralight text-base tracking-wider">
        LEARN SOMETHING WHEREVER YOU ARE
      </p>
      <button className={style.homebtn}>
        <p className="relative z-10 text-white">Join a Course Now</p>
      </button>
    </div>
  );
};

export default JoinCourse;
