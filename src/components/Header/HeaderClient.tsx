"use client";

import { useEffect, useRef, useState } from "react";
import { faFacebookF, faTwitter, faVimeoV, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "@/app/styles/home.module.css";
import { LoginModal } from "./LoginModal";
import { HeaderUser } from "@/types/header.types";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

interface HeaderClientProps {
  initialUser: HeaderUser | null;
}

export function HeaderClient({ initialUser }: HeaderClientProps) {
  const path = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  const [userDetails, setUserDetails] = useState<HeaderUser | null>(initialUser);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);

  useOnClickOutside(dropdownRef, () => setIsUserMenuOpen(false));

  useEffect(() => {
    setUserDetails(initialUser);
  }, [initialUser]);

  const openLoginModal = () => router.push("/login");
  const closeLoginModal = () => setIsLoginOpen(false);

  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await fetch("/api/v1/logout", { method: "POST" });
    } catch (error) {
      console.error("Failed to logout", error);
    } finally {
      setUserDetails(null);
      setIsUserMenuOpen(false);
      router.refresh();
      router.push("/");
    }
  };

  const navigateToCart = () => {
    router.push("/mycart");
  };

  const goToProfile = () => {
    setIsUserMenuOpen(false);
    router.push("/profile");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setHideTopBar(false);
      } else if (currentScrollY > lastScrollY.current) {
        setHideTopBar(true);
      } else if (currentScrollY < lastScrollY.current) {
        setHideTopBar(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      animate={{ backgroundColor: hideTopBar ? "rgba(34, 34, 34, 0.85)" : "rgba(34, 34, 34, 1)" }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
    >
      <motion.div
        initial={false}
        animate={{
          height: hideTopBar ? 0 : "auto",
          opacity: hideTopBar ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden px-[5rem]"
      >
        <div className="border-b-[0.1px] border-[#969696] pb-2 w-full flex items-center justify-between pt-4">
          <div className="flex items-center gap-5 ">
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

          {userDetails == null ? (
            <div className="flex gap-6">
              <button
                className="flex items-center justify-center text-[#969696] gap-1 hover:text-[#00eda4] hover:shadow-md  duration-200"
                onClick={openLoginModal}
              >
                <span className="material-symbols-outlined !text-lg transition">lock_open</span>
                <p className="font-body font-light text-base transition">Login</p>
              </button>
              <Link
                href="/register"
                className={`flex items-center justify-center gap-1 hover:text-[#00eda4] hover:shadow-md  duration-200 ${
                  path === "/register" ? "text-[#00eda4]" : "text-[#969696]"
                }`}
              >
                <span className="material-symbols-outlined !text-xl transition">person</span>
                <p className="font-body font-light text-base transition">Register</p>
              </Link>
            </div>
          ) : (
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center justify-center text-[#969696] gap-1 hover:text-[#00eda4] hover:shadow-md  duration-200"
                onClick={toggleUserMenu}
              >
                <span className="material-symbols-outlined text-2xl transition">person</span>
                <p className="font-body font-light text-lg transition">{userDetails.name}</p>
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl bg-[#1c1c1c] border border-[#2c2c2c] shadow-2xl z-50 p-3 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-[#2f2f2f]">
                    <p className="font-body text-sm text-[#b0b0b0]">Signed in as</p>
                    <p className="font-body text-base text-white font-medium truncate">
                      {userDetails.email}
                    </p>
                  </div>
                  <button
                    className="w-full flex items-center gap-2 px-3 py-2 mt-2 rounded-xl text-left text-white font-body text-sm hover:bg-[#00eda4]/20 duration-200"
                    onClick={goToProfile}
                  >
                    <span className="material-symbols-outlined text-base">account_circle</span>
                    View Profile
                  </button>
                  <p
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left text-[#ffb4b4] font-body text-sm hover:bg-[#ff4d4d]/10 duration-200"
                    onClick={handleLogout}
                  >
                    <span className="material-symbols-outlined text-base">logout</span>
                    Logout
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      <div
        style={{ paddingBottom: !hideTopBar ? "20px" : "12px" }}
        className="w-full flex justify-between pt-3 px-[5rem]"
      >
        <div className="w-[8rem] h-auto object-contain object-center flex items-center justify-center">
          <Link href={"/"}>
            <img src="/icons/logo.webp" alt="" className="" />
          </Link>
        </div>

        <ul className={`flex gap-1 items-center justify-center ${styles.navbar} `}>
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
              path === "/courses" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/courses"}>Courses</Link>
            </p>
          </li>
          <li
            className={`text-white font-body font-medium text-base  tracking-wide mx-3 hover:text-[#00eda4] cursor-pointer duration-300 ${
              path === "/wishlist" && styles.active
            }`}
          >
            <p className="duration-300">
              <Link href={"/wishlist"}>Wishlist</Link>
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
        <div className="flex min-w-[15rem] items-center justify-end gap-5">
          <div
            className={`flex items-center justify-center gap-2 cursor-pointer duration-200  hover:text-[#00ECA3] ${
              path === "/cart" ? "text-[#00ECA3]" : "text-white"
            }`}
            onClick={() => router.push("/cart")}
          >
            <span className="material-symbols-outlined  text-xl">shopping_cart</span>
            <p className=" font-body text-base">Cart</p>
          </div>
          {userDetails && (
            <div
              className={`flex items-center justify-center gap-2 cursor-pointer duration-200  hover:text-[#00ECA3] ${
                path === "/mycart" ? "text-[#00ECA3]" : "text-white"
              }`}
              onClick={navigateToCart}
            >
              <span className="material-symbols-outlined  text-xl">school</span>
              <p className=" font-body text-base">My Courses</p>
            </div>
          )}
        </div>
        <LoginModal
          isOpen={isLoginOpen}
          onClose={closeLoginModal}
          setUserDetails={setUserDetails}
        />
      </div>
    </motion.div>
  );
}
