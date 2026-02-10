import styles from "@/app/styles/services.module.css";

const AllServices = () => {
  return (
    <div
      className="w-full  pt-[6rem] px-[4rem] bg-[url('/fw10.webp')] text-center  bg-no-repeat"
      style={{
        backgroundSize: "contain",
        backgroundPositionY: "550%",
        backgroundPositionX: "50%",
      }}
    >
      <h1 className="font-bold text-4xl font-body my-2 text-[#222222]">
        All these Services for you
      </h1>
      <h3 className="text-lg font-light font-heading ">
        JUST PICK WHAT YOU NEED TO LEARN
      </h3>

      <div className="grid grid-cols-3 grid-rows-2 gap-6 my-[5rem] px-[4rem]">
        <div
          className={`py-10 px-[4rem] text-center bg-[#fafafa] rounded-lg ${styles.allServices} hover:shadow-2xl`}
        >
          <div className="w-[6rem] h-[6rem] rounded-full mx-auto p-4 bg-[#f5f2fa] mb-4 object-contain flex items-center justify-center">
            <img
              src="/icons/cloud-storage-icon.webp"
              alt=""
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold my-1 font-body cursor-pointer">
            CLOUD STORAGE
          </h1>
          <p className="text-base font-heading my-4 font-light tracking-wide ">
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <button className="w-[8.5rem] my-2 py-2 bg-white rounded-lg rounded-tl-[1.6rem] border font-body font-semibold duration-500">
            3 courses
          </button>
        </div>
        <div
          className={`py-10 px-[4rem] text-center bg-[#fafafa] rounded-lg ${styles.allServices} hover:shadow-2xl`}
        >
          <div className="w-[6rem] h-[6rem] rounded-full mx-auto p-4 bg-[#eceeff] mb-4 object-contain flex items-center justify-center">
            <img
              src="/icons/law-and-order.webp"
              alt=""
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold my-1 font-body cursor-pointer">
            LAW AND ORDER
          </h1>
          <p className="text-base font-heading my-4 font-light tracking-wide ">
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <button className="w-[8.5rem] my-2 py-2 bg-white rounded-lg rounded-tl-[1.6rem] border font-body font-semibold duration-500">
            2 courses
          </button>
        </div>
        <div
          className={`py-10 px-[4rem] text-center bg-[#fafafa] rounded-lg ${styles.allServices} hover:shadow-2xl`}
        >
          <div className="w-[6rem] h-[6rem] rounded-full mx-auto p-4 bg-[#e9f8f4] mb-4 object-contain flex items-center justify-center">
            <img
              src="/icons/offers-prizes.webp"
              alt=""
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold my-1 font-body cursor-pointer">
            OFFERS & PRIZES
          </h1>
          <p className="text-base font-heading my-4 font-light tracking-wide ">
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <button className="w-[8.5rem] my-2 py-2 bg-white rounded-lg rounded-tl-[1.6rem] border font-body font-semibold duration-500">
            3 courses
          </button>
        </div>
        <div
          className={`py-10 px-[4rem] text-center bg-[#fafafa] rounded-lg ${styles.allServices} hover:shadow-2xl`}
        >
          <div className="w-[6rem] h-[6rem] rounded-full mx-auto p-4 bg-[#fff9e5] mb-4 object-contain flex items-center justify-center">
            <img
              src="/icons/practical-quiz.webp"
              alt=""
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold my-1 font-body cursor-pointer">
            PRACTICAL QUIZ
          </h1>
          <p className="text-base font-heading my-4 font-light tracking-wide ">
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <button className="w-[8.5rem] my-2 py-2 bg-white rounded-lg rounded-tl-[1.6rem] border font-body font-semibold duration-500">
            1 courses
          </button>
        </div>
        <div
          className={`py-10 px-[2rem] text-center bg-[#fafafa] rounded-lg ${styles.allServices} hover:shadow-2xl`}
        >
          <div className="w-[6rem] h-[6rem] rounded-full mx-auto p-4 bg-[#e2f8fd] mb-4 object-contain flex items-center justify-center">
            <img
              src="/icons/prof-video-demo.webp"
              alt=""
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold my-1 font-body cursor-pointer">
            PROFESSIONAL VIDEO DEMOS
          </h1>
          <p className="text-base font-heading my-4 font-light tracking-wide ">
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <button className="w-[8.5rem] my-2 py-2 bg-white rounded-lg rounded-tl-[1.6rem] border font-body font-semibold duration-500">
            4 courses
          </button>
        </div>
        <div
          className={`py-10 px-[4rem] text-center bg-[#fafafa] rounded-lg ${styles.allServices} hover:shadow-2xl`}
        >
          <div className="w-[6rem] h-[6rem] rounded-full mx-auto p-4 bg-[#ffe6ea] mb-4 object-contain flex items-center justify-center">
            <img
              src="/icons/cloud-storage-icon.webp"
              alt=""
              className="w-full h-full"
            />
          </div>
          <h1 className="text-xl font-bold my-1 font-body cursor-pointer">
            SEARCH FOR A COURSE
          </h1>
          <p className="text-base font-heading my-4 font-light tracking-wide ">
            Dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          </p>
          <button className="w-[8.5rem] my-2 py-2 bg-white rounded-lg rounded-tl-[1.6rem] border font-body font-semibold duration-500">
            1 courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllServices;
