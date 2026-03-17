"use client";

import { Course } from "@/types/course.types";
import CourseCard from "../CourseCard";
import { useRouter } from "next/navigation";

const AllCoursesList = ({
  courses,
  total,
  page,
  limit,
}: {
  courses: Course[];
  total: number;
  page: number;
  limit: number;
}) => {
  const startIndex = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  const router = useRouter();

  return (
    <div className=" px-[8rem] py-[4rem]">
      <p className="mx-4 font-heading  text-lg">
        Showing {startIndex + 1}-{startIndex + courses.length} of {total} results:
      </p>
      <div className="w-full my-5 gap-8 mx-2 grid grid-cols-3">
        {courses?.map((course: Course) => (
          <CourseCard
            key={course.id}
            image={course.imageLink}
            price={course.price}
            heading={course.title}
            description={course.description}
            instructor={course.instructor}
          />
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 rounded-full ${
              page === i + 1 ? "bg-[#00ECA3] text-white" : "bg-white text-black border"
            }`}
            onClick={() => router.push(`/courses?page=${i + 1}&limit=${limit}`)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllCoursesList;
