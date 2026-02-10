"use client";
import CommonHero from "@/components/CommonHero";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/config";
import axios from "axios";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("weak");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "password") {
      setPassword(value);
      // Check password strength
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
        if (value.length >= 12) {
          setPasswordStrength("strong");
        } else {
          setPasswordStrength("medium");
        }
      } else {
        setPasswordStrength("weak");
      }
    } else {
      switch (name) {
        case "email":
          setEmail(value);
          break;
        case "username":
          setUsername(value);
          break;
        case "name":
          setName(value);
          break;
        default:
          break;
      }
    }
  };

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${BASE_URL}/user/signup`,
        {
          email: email,
          password: password,
          username: username,
          name: name,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          },
        },
      );
      const responseData = response.data;
      if (responseData.message === "User created successfully") {
        const token = responseData.token;
        localStorage.setItem("eLearniToken", token);
        router.push("/");
      }
      console.log(responseData);
    } catch (error: any) {
      setError(error.response.data.message);
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <div>
      <CommonHero
        Image={
          "https://elearni.wpenginepowered.com/wp-content/themes/elearni/images/breadcrumb.png"
        }
        heroHeading={"Create an Account"}
        subHeading={"CREATE AN ACCOUNT"}
      />
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                />
                <p
                  className={`py-3 px-12 w-[9.5rem] text-center  ${
                    passwordStrength === "weak"
                      ? "bg-[#E53E3E]"
                      : passwordStrength === "medium"
                        ? "bg-[#F7CF1F]"
                        : "bg-[#65D56D]"
                  } my-3 border border-black rounded-sm font-body text-base font-semibold`}
                >
                  {passwordStrength === "strong"
                    ? "Strong"
                    : passwordStrength === "medium"
                      ? "Medium"
                      : "Weak"}
                </p>
              </div>
              <p className="bg-[#fafafa] p-1 font-heading text-[#737373] font-light text-[.9rem] tracking-wide mb-2">
                Hint: The password should be at least twelve characters long. To
                make it stronger, use upper and lower case letters, numbers, and
                symbols like ! " ? $ % ^ & .
              </p>
              {error != null && (
                <div className="m-2">
                  <p className="text-base font-medium font-body text-red-600 py-2">
                    {error}.
                  </p>
                </div>
              )}
              <button
                className="flex items-center gap-3 font-bold rounded-lg justify-center w-[14rem] p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 duration-300 hover:rounded-md"
                onClick={handleSubmit}
              >
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
                onChange={handleChange}
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
