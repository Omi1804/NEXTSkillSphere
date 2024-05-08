import { BASE_URL } from "@/config";
import styles from "@/styles/login.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const Login = ({ isOpen, onClose, setUserDetails }: any) => {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name == "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email: email,
        password: password,
      });
      const responseData = response.data;

      if (responseData.token) {
        const token = responseData.token;
        localStorage.setItem("eLearniToken", token);
        setUserDetails(responseData.userDetails);
        onClose();
      }
    } catch (e: any) {
      setError(e.response.data.message);
      console.log(e);
    }
  };

  return (
    <div className={`${styles.modalBackdrop}`}>
      <div className={`${styles.modalContent} relative shadow-2xl`}>
        <button onClick={onClose} className="absolute top-3 right-3">
          <span className="material-symbols-outlined ">close</span>
        </button>
        <h2 className="font-body flex items-center justify-center gap-2 mb-2">
          <span className="text-[1.8rem] font-medium">Welcome!</span>
          <span className="text-[1.8rem] font-bold bg-clip-text text-transparent bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)]">
            Login
          </span>
        </h2>
        <p className="w-[5rem] h-[3px] bg-[#00eda4] mx-auto"></p>
        <form className=" px-8 my-4 text-left">
          <div className="my-8">
            <label
              htmlFor="email"
              className="w-full font-body block text-[1.1rem] font-light text-black"
            >
              Username or Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full border-[1px] px-5 py-2 rounded-tl-3xl outline-none border-[#0000002e] shadow-sm mt-3 text-[#b4aab4] font-body  focus:shadow-lg duration-300"
              onChange={handleChange}
            />
          </div>
          <div className="my-8">
            <label
              htmlFor="password"
              className="w-full font-body block text-[1.1rem] font-light text-black"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full border-[1px] px-5 py-2 rounded-tl-3xl outline-none border-[#0000002e] shadow-sm mt-3 text-[#b4aab4] font-body  focus:shadow-lg duration-300"
              onChange={handleChange}
            />
          </div>
          {error != null && (
            <div className="my-[-1rem]">
              <p className="text-base font-medium font-body text-red-400 py-2">
                {error}.
              </p>
            </div>
          )}
          <div className="flex items-center justify-start gap-2 my-8">
            <input type="checkbox" name="remember" />
            <label
              htmlFor="remember"
              className="font-body text-base font-light"
            >
              Remember me
            </label>
          </div>
          <button
            className="flex items-center gap-3 rounded-lg justify-center w-full p-4 rounded-tl-[2.3rem] bg-[linear-gradient(90deg,_rgb(0,_237,_164)_0%,_rgb(106,_125,_241)_100%)] text-white hover:shadow-xl hover:scale-105 hover:rounded-md duration-300"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </form>
        <div className="my-6 text-indigo-500">Forgot password ?</div>
      </div>
    </div>
  );
};

export default Login;
