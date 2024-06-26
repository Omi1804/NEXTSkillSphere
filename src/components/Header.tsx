// import { useEffect } from "react";
// import { Typography, AppBar, useTheme, Button } from "@mui/material";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import logo from "/fevicon.png";
// import Image from "next/image";
// import { userState } from "@/store/atoms/";
// import { useRecoilState } from "recoil";
// import axios from "axios";
// import { BASE_URL } from "@/config";

// const Header = () => {
//   //------------------------------VARIABLES------------------------------//
//   const theme = useTheme();
//   const router = useRouter();
//   // const [email, setEmail] = useState(null);
//   const [user, setUser] = useRecoilState(userState);

//   //------------------------------HANDLERS------------------------------//

//   // to populate the array with email
//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const response = await axios.get(`${BASE_URL}admin/me`, {
//   //         headers: {
//   //           authorization: "Bearer " + localStorage.getItem("token"),
//   //         },
//   //       });

//   //       const responseData = response.data;
//   //       if (responseData.email != null) {
//   //         setUser({ email: responseData.email });
//   //       }
//   //     } catch (error) {}
//   //   };

//   //   fetchUser();
//   // }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   //------------------------------COMPONENTS------------------------------//
//   return (
//     <div>
//       <AppBar
//         position="static"
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//           padding: ".5rem 1rem",
//           background: "linear-gradient(45deg, #009688, #004d40)", // gradient background
//           boxShadow: theme.shadows[5],
//           transition: "all 0.3s", // smooth transition for hover effects
//         }}
//       >
//         <div
//           className="companyLogo"
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: ".5rem", // gap between items
//           }}
//         >
//           <Image
//             src="/fevicon.png"
//             alt="Company Logo"
//             width={100}
//             height={100}
//             quality={100}
//             priority={true}
//             style={{
//               width: "3rem",
//               height: "100%",
//               objectFit: "contain",
//               borderRadius: "20%", // circular logo
//               boxShadow: theme.shadows[3], // add shadow
//               cursor: "pointer",
//             }}
//             onClick={() => {
//               // if (localStorage.getItem("token") != null) {
//               //   navigate("/courses");
//               // } else {
//               router.push("/");
//             }}
//           />
//           <Typography
//             align="center"
//             ml={1}
//             variant="h5"
//             color="white"
//             style={{
//               fontSize: "1.5rem",
//               fontWeight: "500",
//               fontFamily: "Roboto",
//             }}
//           >
//             Course Lelo
//           </Typography>
//         </div>
//         {user.userEmail == null ? (
//           <div className="signinButtons">
//             <Link href="/signup">
//               <Button
//                 size="large"
//                 style={{
//                   color: "white",
//                   backgroundColor: "#002D23",
//                 }}
//               >
//                 SignUp
//               </Button>
//             </Link>
//             <Link href="/login">
//               <Button
//                 size="large"
//                 style={{
//                   color: "white",
//                   backgroundColor: "#002D23",
//                   marginInline: "1rem 2rem",
//                 }}
//               >
//                 Login
//               </Button>
//             </Link>
//           </div>
//         ) : (
//           <div
//             className="logOutButtons"
//             style={{ display: "flex", alignItems: "center" }}
//           >
//             <Typography
//               align="center"
//               mr={1}
//               variant="h5"
//               color="white"
//               style={{
//                 fontSize: "1.2rem",
//                 fontWeight: "500",
//               }}
//             >
//               {user.userEmail}
//             </Typography>
//             <Button
//               size="large"
//               style={{
//                 color: "white",
//                 backgroundColor: "#002D23",
//               }}
//               onClick={handleLogout}
//             >
//               Log out
//             </Button>
//           </div>
//         )}
//       </AppBar>
//     </div>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import {
  faFacebookF,
  faTwitter,
  faVimeoV,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import styles from "@/styles/home.module.css";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import Login from "./Login";
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
