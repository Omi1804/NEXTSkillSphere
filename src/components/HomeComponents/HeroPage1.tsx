import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const HeroPage1 = () => {
  return (
    <Carousel>
      <div className=" w-full h-[110vh] object-contain bg-[url('/bg3.jpg')] bg-no-repeat bg-center bg-cover text-center py-10">
        <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center bg-[linear-gradient(rgb(255,_219,_79)_0%,_rgb(255,_174,_79)_35%,_rgb(255,_42,_117)_100%)]">
          <span className="material-symbols-outlined text-white font-extrabold text-[4.5rem] ">
            deployed_code
          </span>
        </div>
        <h1
          style={{
            background:
              "-webkit-linear-gradient(left, #ff2a73 0%, #ffd514 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          className="text-[4.3rem] font-bold font-body "
        >
          Education Everywhere
        </h1>
        <h3 className="text-[2.7rem] font-light font-heading">
          Over 1900 online courses
        </h3>
        <div className="my-10 flex items-center justify-center gap-10">
          <button className="flex items-center gap-3 rounded-lg justify-center w-[11rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(255,_94,_58)_0%,_rgb(255,_42,_104)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300">
            <span className="material-symbols-outlined ">edit</span>
            <p className="font-heading text-base">Learn Now</p>
          </button>

          <button className="flex items-center gap-3 rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300">
            <span className="material-symbols-outlined">adjust</span>
            <p className="font-heading text-base">Explore eLearny</p>
          </button>
        </div>
      </div>
      <div className=" p-20"></div>
      <div className=" w-full h-[110vh] object-contain bg-[url('/bg1.jpg')] bg-no-repeat bg-center bg-cover py-10">
        <div className=" w-[50%] h-full flex flex-col justify-center text-left items-center">
          <div className="pl-[8rem] pr-6">
            <h1 className="text-6xl font-body font-bold tracking-wide mb-4">
              Learn Anything
            </h1>
            <p className="w-[13rem] my-2 h-[3px] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] mb-14"></p>
            <p className="text-[2.5rem] my-8 font-light font-heading tracking-wide leading-normal bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)]">
              Get Access for Award Winning Online Courses{" "}
            </p>
          </div>
          <div className="my-4 flex items-center justify-center gap-10">
            <button className="flex items-center gap-3 rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300">
              <span className="material-symbols-outlined">search</span>
              <p>Discover Courses</p>
            </button>
            <button className="flex items-center gap-3 rounded-lg justify-center w-[13rem] p-4 rounded-tl-[2.3rem] bg-white text-black hover:shadow-xl hover:scale-105 duration-300">
              <span className="material-symbols-outlined">forum</span>
              <p>Talk to us</p>
            </button>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default HeroPage1;
