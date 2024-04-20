import styles from "@/styles/register.module.css";

const Register = () => {
  return (
    <div>
      <div
        className={`${styles.registerHero} flex items-end px-[8rem] py-[4rem]`}
      >
        <div className="text-white">
          <h1 className="text-[4rem] font-extrabold ">Create an Account</h1>
          <p
            className={`w-full h-[3px] bg-white rounded-md ${styles.registerLine}`}
          ></p>
          <p className="font-extralight tracking-widest mt-6">
            HOME / CREATE AN ACCOUNT
          </p>
        </div>
      </div>
      <div className=" w-full bg-transparent  px-[6rem] py-[8rem]">
        <div className="flex gap-4 w-full border shadow-md mb-5">
          <span className="material-symbols-outlined border p-2  bg-[#0A80A3] text-white">
            info
          </span>
          <p className="py-2 px-1 font-body font-extralight">
            Registering for this site is easy. Just fill in the fields below,
            and we’ll get a new account set up for you in no time.
          </p>
        </div>
        <div className="flex my-[4rem]">
          <div className="py-4 pr-4 w-[35%]">
            <h1 className="text-3xl font-bold font-body">Account Details</h1>
            <form className="my-4 text-left">
              <div className="my-8">
                <label
                  htmlFor="username"
                  className="w-full font-body block text-[1rem] font-normal text-black"
                >
                  Username (required)
                </label>
                <input
                  type="text"
                  name="username"
                  className="w-full border-[1px] px-5 py-2 bg-[#fafafa]  rounded-tl-3xl outline-none border-[#b71717] shadow-sm mt-2 rounded-md text-[#b4aab4] font-body  focus:shadow-lg duration-300 focus:border-[#0000002e]"
                  required
                />
              </div>
              <div className="my-8">
                <label
                  htmlFor="email"
                  className="w-full font-body block text-[1rem] font-normal text-black"
                >
                  Email Address (required)
                </label>
                <input
                  type="text"
                  name="email"
                  required
                  className="w-full border-[1px] px-5 py-2  bg-[#fafafa] rounded-tl-3xl outline-none border-[#b71717] shadow-sm mt-2 rounded-md text-[#b4aab4] font-body  focus:shadow-lg duration-300 focus:border-[#0000002e]"
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="password"
                  className="w-full font-body block text-[1rem] font-normal text-black"
                >
                  Choose a Password (required)
                </label>
                <input
                  type="text"
                  name="password"
                  required
                  className="w-full border-[1px] px-5 py-2  bg-[#fafafa] rounded-tl-3xl outline-none border-[#b71717] shadow-sm mt-2 rounded-md text-[#b4aab4] font-body  focus:shadow-lg duration-300 focus:border-[#0000002e]"
                />
                <button className="py-3 px-12 bg-[#65D56D] my-3 border border-black rounded-sm font-body text-base font-semibold">
                  Strong
                </button>
              </div>
              <p className="bg-[#fafafa] p-1 font-heading text-[#737373] font-light text-[.9rem] tracking-wide mb-8">
                Hint: The password should be at least twelve characters long. To
                make it stronger, use upper and lower case letters, numbers, and
                symbols like ! " ? $ % ^ & .
              </p>
              <button className="flex items-center gap-3 font-bold rounded-lg justify-center w-[14rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300 hover:rounded-md">
                Complete Sign Up
              </button>
            </form>
          </div>
          <div className=" p-4 w-[65%]">
            <h1 className="text-3xl font-bold font-body">Profile Details</h1>
            <div className="my-8">
              <label
                htmlFor="name"
                className="w-full font-body block text-[1rem] font-normal text-black"
              >
                Name (required)
              </label>
              <input
                type="text"
                name="name"
                className="w-full border-[1px] px-5 py-2 bg-[#fafafa]  rounded-tl-3xl outline-none border-[#b71717] shadow-sm mt-2 rounded-md text-[#b4aab4] font-body  focus:shadow-lg duration-300 focus:border-[#0000002e]"
                required
              />
              <p className="font-light italic text-[#737373] text-sm my-2">
                This field may be seen by:{" "}
                <span className="font-semibold">Everyone</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
