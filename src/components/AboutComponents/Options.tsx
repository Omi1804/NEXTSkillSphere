import React from "react";

export const Options = () => {
  return (
    <div
      className="w-full flex bg-[url('/fw10.webp')]  bg-no-repeat px-[5rem] py-[6rem]"
      style={{
        backgroundSize: "contain",
        backgroundPositionY: "550%",
        backgroundPositionX: "50%",
      }}
    >
      <div className="w-[40%]">
        <p className="font-light text-base font-body tracking-wider mb-4">
          EXPLORE THE WIDE RANGE OF OPTIONS
        </p>
        <h1 className="text-3xl font-body font-extrabold my-4 text-[ #222222]">
          The Best Course Design for you crafted by professionals
        </h1>
        <p className="w-[8rem] h-[3px] bg-[#00ECA3]"></p>
        <div className="my-10">
          <p className="text-base font-light font-body tracking-wide ">
            But I must explain to you how all this mistaken idea of denouncing
            pleasure and praising pain was born and I will give you a complete
            account of the system, and expound the actual teachings of the
            great.
          </p>
          <div className="flex my-10 justify-between">
            <div className="flex flex-col">
              <p className="font-body font-bold text-base my-1">JEAN DEAN</p>
              <p className="font-light font-body ">- eLearny Founder</p>
            </div>
            <div className="w-[8rem] mx-8">
              <img src="/icons/sign.webp" alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[60%] px-[4rem] justify-center flex gap-7">
        <div className="bg-[#fafafa] w-[50%] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:bg-white duration-300">
          <div className="w-full object-contain h-[14rem]">
            <img
              src="/exclusive-support.jpg"
              className="w-full h-full"
              alt=""
            />
          </div>

          <h2 className="font-body font-bold text-xl m-4">
            Interactive Learning
          </h2>
          <p className="m-4 font-heading font-light text-[#474747] text-base">
            Mistaken idea of denouncing pleasure and praising pain was born and
            I will give.
          </p>
        </div>
        <div className="bg-[#fafafa] w-[50%] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:bg-white duration-300">
          <div className="w-full object-contain h-[14rem]">
            <img
              src="/interative-learning.jpg"
              className="w-full h-full"
              alt=""
            />
          </div>

          <h2 className="font-body font-bold text-xl m-4">Exclusive Support</h2>
          <p className="m-4 font-heading font-light text-[#474747] text-base">
            Explain to you how all this mistaken idea of denouncing pleasure and
            praising pain was born.
          </p>
        </div>
      </div>
    </div>
  );
};
