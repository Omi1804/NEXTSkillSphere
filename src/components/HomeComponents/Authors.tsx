import styles from "@/styles/home.module.css";

const Authors = () => {
  return (
    <div className="flex  p-16">
      <div className="w-[40%] ">
        <p className="font-light font-heading tracking-wide text-base mb-2">
          KNOW YOUR AUTHOR
        </p>
        <h1 className="font-bold text-3xl font-body mb-4">
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
        <button className={`${styles.homebtn} relative bottom-5`}>
          How to Become an Author?
        </button>
      </div>
      <div className="w-[60%] grid grid-cols-3 grid-rows-2 ">
        <div
          className={`flex flex-col items-center justify-center ${styles.teamProfile}`}
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
          className={`flex flex-col items-center justify-center ${styles.teamProfile}`}
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
          className={`flex flex-col items-center justify-center ${styles.teamProfile}`}
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
          className={`flex flex-col items-center justify-center ${styles.teamProfile}`}
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
          className={`flex flex-col items-center justify-center ${styles.teamProfile}`}
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
        <div className={`flex flex-col items-center justify-center`}>
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
