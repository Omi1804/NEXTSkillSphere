import styles from "@/styles/home.module.css";
import { useInView } from "react-intersection-observer";

const Authors = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once the element comes into view
    threshold: 0.5, // Trigger when 50% of the element is visible
  });
  return (
    <div
      ref={ref}
      className={`flex p-16 ${!inView && "opacity-0"} duration-500`}
    >
      <div className="w-[40%] ">
        <p
          className={`opacity-0 font-light font-heading tracking-wide text-base mb-2 ${
            inView && "opacity-0 animate-slide-in-from-left"
          }`}
        >
          KNOW YOUR AUTHOR
        </p>
        <h1
          className={`opacity-0 font-bold text-3xl font-body mb-4 ${
            inView && "opacity-0 animate-slide-in-from-left"
          } animate-delay-250`}
        >
          Each course you undertake are designed by these authors
        </h1>
        <p className="w-[7rem] my-2 h-[3px] bg-[#00ECA3]"></p>
        <div className="mt-10">
          <p className="font-body font-light text-base my-12 tracking-wide leading-7 text-[#474747]">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system.
          </p>
          <p className="font-body font-light text-base tracking-wide leading-7 text-[#474747]">
            Explorer of the truth, the master-builder of human happiness. No one
            rejects, dislikes, or avoids pleasure itself, because it is
          </p>
        </div>
        <button
          className={`opacity-0 ${styles.homebtn} relative bottom-5 ${
            inView && "animate-slide-in-from-bottom"
          } animate-delay-1000`}
        >
          How to Become an Author?
        </button>
      </div>
      <div className="w-[60%] grid grid-cols-3 grid-rows-2 overflow-hidden">
        <div
          className={`opacity-0 flex flex-col items-center justify-center ${
            styles.teamProfile
          } ${inView && "animate-slide-in-from-left"} animate-delay-250`}
        >
          <div
            className={`rounded-full  w-[143px] h-[143px] object-contain mb-1 ${styles.teamProfileImg}`}
          >
            <img
              src="/lauren.jpg"
              className="w-full h-full rounded-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-bold text-xl my-1">Lauren Ralph</h3>
          <a
            className="font-body hover:text-blue-700 text-white text-sm"
            href="#"
          >
            View Profile
          </a>
          <p className="font-heading font-light text-base">Consultant</p>
        </div>
        <div
          className={`opacity-0 flex flex-col items-center justify-center ${
            styles.teamProfile
          } ${inView && "animate-slide-in-from-top"} animate-delay-500`}
        >
          <div
            className={`rounded-full  w-[143px] h-[143px] object-contain mb-1 ${styles.teamProfileImg}`}
          >
            <img
              src="/stanlee-team.jpg"
              className="w-full h-full rounded-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-bold text-xl my-1">Stan Lee</h3>
          <a
            className="font-body hover:text-blue-700 text-white text-sm"
            href="#"
          >
            View Profile
          </a>
          <p className="font-heading font-light text-base">Consultant</p>
        </div>
        <div
          className={`opacity-0 flex flex-col items-center justify-center ${
            styles.teamProfile
          } ${inView && "animate-slide-in-from-right"} animate-delay-250`}
        >
          <div
            className={`rounded-full  w-[143px] h-[143px] object-contain mb-1 ${styles.teamProfileImg}`}
          >
            <img
              src="/jason-stateman.jpg"
              className="w-full h-full rounded-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-bold text-xl my-1">
            Jason Stateman
          </h3>
          <a
            className="font-body hover:text-blue-700 text-white text-sm"
            href="#"
          >
            View Profile
          </a>
          <p className="font-heading font-light text-base">Consultant</p>
        </div>
        <div
          className={`opacity-0 flex flex-col items-center justify-center ${
            styles.teamProfile
          } ${inView && "animate-slide-in-from-left"} animate-delay-750`}
        >
          <div
            className={`rounded-full  w-[143px] h-[143px] object-contain mb-1 ${styles.teamProfileImg}`}
          >
            <img
              src="/steve-matt.jpg"
              className="w-full h-full rounded-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-bold text-xl my-1">Steve Matt</h3>
          <a
            className="font-body hover:text-blue-700 text-white text-sm"
            href="#"
          >
            View Profile
          </a>
          <p className="font-heading font-light text-base">Consultant</p>
        </div>
        <div
          className={`opacity-0 flex flex-col items-center justify-center ${
            styles.teamProfile
          } ${inView && "animate-slide-in-from-bottom"} animate-delay-1000`}
        >
          <div
            className={`rounded-full  w-[143px] h-[143px] object-contain mb-1 ${styles.teamProfileImg}`}
          >
            <img
              src="/jenny-smith.jpg"
              className="w-full h-full rounded-full"
              alt=""
            />
          </div>
          <h3 className="font-heading font-bold text-xl my-1">Jenny Smith</h3>
          <a
            className="font-body hover:text-blue-700 text-white text-sm"
            href="#"
          >
            View Profile
          </a>
          <p className="font-heading font-light text-base">Consultant</p>
        </div>
        <div
          className={`opacity-0 flex flex-col items-center justify-center ${
            inView && "animate-slide-in-from-right"
          } animate-delay-750`}
        >
          <div
            className={`rounded-full  w-[143px] h-[143px] object-contain mb-1 flex flex-col items-center cursor-pointer justify-center bg-[#00ECA3]`}
          >
            <span className="material-symbols-outlined text-2xl font-bold text-white">
              add
            </span>
            <p className="text-white text-lg font-bold font-heading hover:text-[#6A7CF0] duration-300">
              Join Us
            </p>
          </div>
          <p className="my-2 font-heading font-extrabold text-gray-400 text-xl hover:text-[#00ECA3] cursor-pointer">
            Is this you?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Authors;
