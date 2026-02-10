"use client";

import React, { useEffect, useState } from "react";
import {
  faFacebookF,
  faTwitter,
  faVimeoV,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import styles from "@/app/styles/home.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Login from "../Login";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { BASE_URL } from "@/config";

const Header = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);
  const path = usePathname();
  const router = useRouter();

  const openLoginModal = () => setIsLoginOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("eLearniToken")}`,
          },
        });

        const responseData = response.data;
        if (responseData.user) {
          setUserDetails(responseData.user);
        }
      } catch (error: any) {
        console.error("Error fetching purchased courses:", error);
      }
    };
    if (localStorage.getItem("eLearniToken")) {
      fetchUser();
    }
  }, []);

  const logoutHandle = () => {
    setLoggedOut((prev) => !prev);
  };

  const navigateToCart = () => {
    router.push("/mycart");
  };

  return (
    <div className="px-[5rem] py-2 bg-[#222222]">
      <div className="border-b-[.1px] border-[#969696] py-2 flex items-center justify-between">
        <div className=" flex items-center gap-5">
          <FontAwesomeIcon
            icon={faGoogle}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />

          <FontAwesomeIcon
            icon={faFacebookF}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />

          <FontAwesomeIcon
            icon={faTwitter}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />

          <FontAwesomeIcon
            icon={faVimeoV}
            className="w-4 h-4  text-[#969696] hover:text-[#00ECA3] cursor-pointer duration-500 hover:scale-105"
          />
        </div>

        <div
          className={`flex items-center justify-center gap-2 cursor-pointer duration-200  hover:text-[#00ECA3] ${
            path === "/mycart" ? "text-[#00ECA3]" : "text-white"
          }`}
          onClick={navigateToCart}
        >
          <span className="material-symbols-outlined  text-xl">
            shopping_cart
          </span>
          <p className=" font-body text-base">My Courses</p>
        </div>
      </div>
      <div className="w-full flex justify-between py-3">
        <div className=" w-[8rem] h-auto object-contain object-center flex items-center justify-center">
          <Link href={"/"}>
            <img src="/icons/logo.webp" alt="" className="" />
          </Link>
        </div>

        <ul
          className={`flex gap-1 items-center justify-center ${styles.navbar} relative left-10`}
        >
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/"}>Home</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/about" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/about"}>About</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/services" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/services"}>Services</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/students" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/students"}>Students</Link>
            </p>
          </li>
          {/* <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/whyus" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/whyus"}>Why Us</Link>
            </p>
          </li> */}
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/courses" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/courses"}>Courses</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/contact" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/contact"}>Contact</Link>
            </p>
          </li>
        </ul>
        {userDetails == null ? (
          <div className="flex gap-5">
            <button
              className="flex items-center justify-center text-[#969696] gap-1 hover:text-[#00eda4] hover:shadow-md  duration-200"
              onClick={openLoginModal}
            >
              <span className="material-symbols-outlined text-xl  transition">
                lock_open
              </span>
              <p className="font-body font-light text-base transition">Login</p>
            </button>
            <button
              className={`flex items-center justify-center gap-1 hover:text-[#00eda4] hover:shadow-md  duration-200 ${
                path === "/register" ? "text-[#00eda4]" : "text-[#969696]"
              }`}
            >
              <span className="material-symbols-outlined text-xl transition">
                person
              </span>
              <p className="font-body font-light text-base transition">
                <Link href={"/register"}>Register</Link>
              </p>
            </button>
          </div>
        ) : (
          <div className="relative ">
            <button
              className="flex items-center justify-center text-[#969696] gap-1 hover:text-[#00eda4] hover:shadow-md  duration-200"
              onClick={logoutHandle}
            >
              <span className="material-symbols-outlined text-2xl transition">
                person
              </span>
              <p className="font-body font-light text-lg transition">
                {userDetails.name}
              </p>
            </button>
            {loggedOut && (
              <div className="w-full absolute top-[3.2rem] bg-[#222] z-50 flex justify-center items-center p-2 rounded-b-xl shadow-lg border-t-2 border-[#1b1b1b]">
                <p
                  className="text-white font-body text-base font-medium mb-1 cursor-pointer hover:text-[#00ECA3] duration-300"
                  onClick={() => {
                    setUserDetails(null);
                    setLoggedOut(false);
                    localStorage.removeItem("eLearniToken");
                  }}
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}

        {/* @ts-ignore */}
        <Login
          isOpen={isLoginOpen}
          onClose={closeLoginModal}
          setUserDetails={setUserDetails}
        />
      </div>
    </div>
  );
};

export default Header;
