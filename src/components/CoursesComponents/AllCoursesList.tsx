import styles from "@/styles/courses.module.css";

const AllCoursesList = () => {
  return (
    <div className="border-2">
      <div className="flex bg-[#F8F8FC] px-12 py-8 items-center justify-between">
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
            <option value="ai">Artificial Intelligence</option>
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
            <option value="All Languages" selected>
              All Languages
            </option>
            <option value="English">English</option>
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
      <div className=" p-[5rem]">
        <p className="mx-4 font-heading  text-lg">
          Showing 1-6 of 10 results :
        </p>
        <div className="border-2 w-full my-5 mx-2 grid grid-cols-3">
          <div>
            <div>
              <img src="/course_image5.jpg" alt="" />
            </div>
            <div>
              <div>
                <div>
                  <span className="material-symbols-outlined">
                    signal_cellular_alt
                  </span>
                  <p>Intermediate</p>
                </div>
                <div>
                  <span className="material-symbols-outlined">schedule</span>
                  <p>10 Weeks</p>
                </div>
              </div>
              <h2>Bases Matemáticas dios Álgebra Ecuacion</h2>
              <div>
                <img src="/icons/teacher1.png" alt="" />
                <p>Atwood</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCoursesList;
