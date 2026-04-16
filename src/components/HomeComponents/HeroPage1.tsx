"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroPage1 = () => {
  return (
    <Carousel
      showStatus={false}
      showArrows={false}
      // autoPlay={true}
      showThumbs={false}
      interval={2000}
      infiniteLoop={true}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        if (isSelected) {
          return (
            <li
              className="inline-block mr-3 w-3 h-3 rounded-full bg-[linear-gradient(rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%);]"
              onClick={onClickHandler}
              key={index}
              role="button"
              tabIndex={0}
              title={label}
            />
          );
        }
        return (
          <li
            className="inline-block mr-3 w-3 h-3 rounded-full bg-transparent border border-blue-400"
            onClick={onClickHandler}
            key={index}
            role="button"
            tabIndex={0}
            title={label}
          />
        );
      }}
    >
      <CarouselOne />
      <CarouselTwo />
      <CarouselThree />
    </Carousel>
  );
};

export const CarouselOne = () => {
  return (
    <motion.div className="w-full h-[100vh] object-contain bg-[url('/bg3.jpg')] bg-no-repeat bg-center bg-cover text-center py-10 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-[linear-gradient(rgb(255,_219,_79)_0%,_rgb(255,_174,_79)_35%,_rgb(255,_42,_117)_100%)] text-[4.5rem]"
      >
        <span className="material-symbols-outlined text-white font-bold !text-[4.5rem] ">
          deployed_code
        </span>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.6 }}
        style={{
          background: "-webkit-linear-gradient(left, #ff2a73 0%, #ffd514 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
        className="text-[4.3rem] font-bold font-body"
      >
        Education Everywhere
      </motion.h1>
      <motion.h3
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="text-[2.7rem] font-light font-heading "
      >
        Over 1900 online courses
      </motion.h3>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="my-10 flex items-center justify-center gap-10 "
      >
        <Link
          href="/courses"
          className="flex items-center gap-3 rounded-lg justify-center w-[11rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(255,_94,_58)_0%,_rgb(255,_42,_104)_100%)] text-white shadow-md hover:shadow-xl hover:scale-105 duration-300 animate-slide-in-from-bottom opacity-0 animate-delay-750"
        >
          <span className="material-symbols-outlined !text-[1.2rem]">edit</span>
          <p className="font-heading text-base font-semibold">Learn Now</p>
        </Link>

        <Link
          href="/about"
          className="flex items-center gap-3 rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white shadow-md hover:shadow-xl hover:scale-105 duration-300 animate-slide-in-from-bottom opacity-0 animate-delay-750"
        >
          <span className="material-symbols-outlined !text-[1.2rem]">adjust</span>
          <p className="font-heading text-base font-semibold">Explore eLearni</p>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const CarouselTwo = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: any) => {
    const x = (window.innerWidth / 2 - event.pageX) * 0.05;
    const y = (window.innerHeight / 2 - event.pageY) * 0.05;
    setOffset({ x, y });
  };

  return (
    <div className="relative w-full h-[100vh] " onMouseMove={handleMouseMove}>
      <div className="absolute  w-full h-full object-contain ">
        {/* Background Image */}
        <div
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="absolute left-[48%] inset-0  h-[100%] w-[50%] object-contain"
        >
          <Image
            src="/shapes-bg.webp"
            alt="Background"
            fill
            style={{ objectFit: "contain" }}
            className="w-full h-full"
          />
        </div>

        {/* Foreground Image */}
        <div
          style={{
            transform: `translate(${offset.x * 2}px, ${offset.y * 2}px)`,
            transition: "transform 0.1s ease-out",
          }}
          className="absolute left-[50%] inset-0 w-[50%] object-contain my-[6rem]"
        >
          <Image
            src="/phone-img.webp"
            alt="Foreground"
            style={{ objectFit: "contain" }}
            fill={true}
            sizes=""
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="relative w-[60%] h-full py-[10rem] pl-[5rem] z-10">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-16 rounded-full bg-[linear-gradient(rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] mx-auto flex items-center justify-center mb-2"
        >
          <span className="material-symbols-outlined text-3xl text-white">mouse</span>
        </motion.div>
        <h1 className="bg-clip-text text-[4rem] font-bold w-full font-body text-transparent bg-gradient-to-r from-[#687bec] to-[#ff0e67]">
          eLearning for all
        </h1>
        <ul className="mt-6 mb-14">
          <li className="flex items-center justify-center gap-3 my-4 cursor-pointer hover:text-[#00ECA3] duration-300">
            <span className="material-symbols-outlined text-4xl ">public</span>
            <p className="text-3xl font-light tracking-wide">Online Lessons</p>
          </li>
          <li className="flex items-center justify-center gap-3 my-7 cursor-pointer hover:text-[#00ECA3] duration-300">
            <span className="material-symbols-outlined text-4xl ">menu_book</span>
            <p className="text-3xl font-light tracking-wide">Live Courses</p>
          </li>
          <li className="flex items-center justify-center gap-3 my-4 cursor-pointer hover:text-[#00ECA3] duration-300">
            <span className="material-symbols-outlined text-4xl ">brightness_empty</span>
            <p className="text-3xl font-light tracking-wide">Certified Lessons</p>
          </li>
        </ul>
        <Link
          href="/courses"
          className="flex items-center gap-3 mx-auto rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] shadow-md bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300"
        >
          <span className="material-symbols-outlined">visibility</span>
          <p>View Courses</p>
        </Link>
      </div>
    </div>
  );
};

export const CarouselThree = () => {
  return (
    <div className=" w-full h-[100vh] bg-[url('/bg1.jpg')] bg-cover bg-no-repeat bg-center object-contain  py-10">
      <div className=" w-[50%] h-full flex flex-col justify-center text-left items-center">
        <div className="pl-[8rem] pr-6">
          <h1 className="text-6xl font-body font-bold tracking-wide mb-4">Learn Anything</h1>
          <p className="w-[13rem] my-2 h-[3px] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] mb-14"></p>
          <p className="text-[2.5rem] my-8 font-light font-heading tracking-wide leading-normal bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)]">
            Get Access for Award Winning Online Courses{" "}
          </p>
        </div>

        <div className="my-4 flex items-center justify-center gap-10">
          <Link
            href="/courses"
            className="flex items-center gap-3 rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300 shadow-md"
          >
            <span className="material-symbols-outlined">search</span>
            <p>Discover Courses</p>
          </Link>
          <Link
            href="/contact"
            className="flex items-center gap-3 rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] bg-white text-black hover:shadow-xl hover:scale-105 duration-300 shadow-md"
          >
            <span className="material-symbols-outlined">forum</span>
            <p>Talk to us</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroPage1;
