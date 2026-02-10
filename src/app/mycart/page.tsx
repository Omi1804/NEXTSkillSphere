"use client";
import CommonHero from "@/components/CommonHero";
import MyCourses from "@/components/MyCart/MyCourses";
import React from "react";

const mycart = () => {
  return (
    <div>
      <CommonHero
        Image={"/home-2-intro.jpg"}
        heroHeading={"My Learning"}
        subHeading={"MY CART"}
      />
      <MyCourses />
    </div>
  );
};

export default mycart;
