"use client";

import axios from "axios";
import CourseCard from "../CourseCard";
import { useEffect, useState } from "react";
import { Course } from "@/types/course.types";

const MyCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get("/api/v1/user/courses/purchased");

        const responseData = response.data;
        setPurchasedCourses(responseData.Courses || []);
      } catch (error: any) {
        console.error("Error fetching purchased courses:", error);
        setPurchasedCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchasedCourses();
  }, []);

  return (
    <div className="">
      <div className="flex bg-[#F8F8FC] px-[6rem] py-8 items-center justify-between">
        <div className="flex items-center mx-6">
          <span className="material-symbols-outlined mx-2 text-[#00ECA3] text-2xl">tune</span>
          <p className="font-body text-lg font-semibold">Filters</p>
        </div>

        <div className="relative inline-block mx-4 shadow-sm w-full">
          <select
            name="prices"
            id="categorySelect"
            defaultValue="All Categories"
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5  pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Categories">All Categories</option>

            <option value="https://demo-themewinter.com/courselog/courses/"> All Categories</option>
            <option value="ai">Artificial Intelligence</option>
            <option value="bussinessManagement">Business &amp; Management</option>
            <option>Business Analysis</option>
            <option>Computer Science</option>
            <option>Data Science &amp; Analytics</option>
            <option>Design Architect</option>
            <option>Engineering &amp; Architecture</option>
            <option>Foreign Language</option>
            <option>Learning Management</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="relative inline-block mx-4 shadow-sm w-full">
          <select
            name="languages"
            id="languagesSelect"
            defaultValue="All Languages"
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5 pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Languages">All Languages</option>
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="relative inline-block mx-4 shadow-sm w-full">
          <select
            name="prices"
            id="priceSelect"
            defaultValue="All Prices"
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5 pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Prices">All Prices</option>
            <option value="Free">Free</option>
            <option value="Free">Paid</option>
            <option value="Free">Prices: High To Low</option>
            <option value="Free">Prices: Low To High</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>

        <div className="relative inline-block mx-4 shadow-sm w-full">
          <select
            name="levels"
            id="levelSelect"
            defaultValue="All Skills"
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5 pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Skills">All Skills</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full my-5 gap-8 mx-2 grid grid-cols-3 px-[8rem] py-[4rem]">
        {isLoading ? (
          <div className="col-span-3 rounded-2xl border border-slate-200 bg-white p-8 text-center font-body text-slate-600">
            Loading your courses...
          </div>
        ) : purchasedCourses.length > 0 ? (
          purchasedCourses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id}
              image={course.imageLink}
              price={course.price}
              heading={course.title}
              description={course.description}
              instructor={course.instructor}
              instructorId={course.instructorId}
            />
          ))
        ) : (
          <div className="col-span-3 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="font-body text-2xl font-bold text-slate-900">No courses yet</h2>
            <p className="mt-2 font-heading text-sm text-slate-600">
              Purchase a course from the catalog and it will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
