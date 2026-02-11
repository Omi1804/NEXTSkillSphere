import axios from "axios";
import CourseCard from "../CourseCard";
import { useEffect, useState } from "react";

const MyCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState<any>(null);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get("/api/user/courses/purchased", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("eLearniToken")}`,
          },
        });

        const responseData = response.data;
        if (responseData.Courses.length > 0) {
          setPurchasedCourses(responseData.Courses);
        }
      } catch (error: any) {
        console.error("Error fetching purchased courses:", error);
      }
    };

    if (localStorage.getItem("eLearniToken")) {
      fetchPurchasedCourses();
    }
  }, []);

  console.log(purchasedCourses);

  return (
    <div className="">
      <div className="flex bg-[#F8F8FC] px-[6rem] py-8 items-center justify-between">
        <div className="flex items-center mx-6">
          <span className="material-symbols-outlined mx-2 text-[#00ECA3] text-2xl">
            tune
          </span>
          <p className="font-body text-lg font-semibold">Filters</p>
        </div>

        <div className="relative inline-block mx-4 shadow-sm w-full">
          <select
            name="prices"
            id="priceSelect"
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5  pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Categories" selected>
              All Categories
            </option>

            <option value="https://demo-themewinter.com/courselog/courses/">
              {" "}
              All Categories
            </option>
            <option value="ai">Artificial Intelligence</option>
            <option value="bussinessManagement">
              Business &amp; Management
            </option>
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
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5 pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Languages" selected>
              All Languages
            </option>
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
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5 pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Prices" selected>
              All Prices
            </option>
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
            className="h-full appearance-none outline-none border-none rounded-lg text-black bg-white py-3 px-5 pr-10 tracking-wide font-heading shadow-sm w-full cursor-pointer"
          >
            <option value="All Skills" selected>
              All Skills
            </option>
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
        {purchasedCourses ? (
          purchasedCourses.map((course: any) => (
            <CourseCard
              key={course.id}
              image={course.imageLink}
              price={course.price}
              time={course.time}
              level={course.level}
              heading={course.heading}
              category={course.category}
              instructor={course.instructor}
            />
          ))
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
