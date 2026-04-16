import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faVimeoV,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import styles from "@/app/styles/footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="footerSec">
      <div className="followSec h-[9rem] bg-[#00ECA3] flex justify-between items-center px-24">
        <div className="">
          <p className="text-3xl font-extrabold text-white">
            Get hands on the
            <span className={styles.custom}> Great Courses </span>
            you like
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-extrabold text-white mx-4">Follow us on</p>
          <div className="flex items-center justify-between">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black"
              aria-label="Follow eLearni on Facebook"
            >
              <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4 p-4  " />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black"
              aria-label="Follow eLearni on Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4 p-4 " />
            </a>
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black"
              aria-label="Find eLearni on Google"
            >
              <FontAwesomeIcon icon={faGooglePlusG} className="w-4 h-4 p-4 " />
            </a>
            <a
              href="https://vimeo.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black"
              aria-label="Follow eLearni on Vimeo"
            >
              <FontAwesomeIcon icon={faVimeoV} className="w-4 h-4 p-4 " />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black"
              aria-label="Follow eLearni on Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 p-4 " />
            </a>
          </div>
        </div>
      </div>
      <div className="lowerSec py-10 px-16 grid grid-cols-3">
        <div className=" px-10">
          <p className="font-extrabold text-xl my-5">Links</p>
          <ul>
            <li className="font-extralight my-5  text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              <Link href="/courses">Courses</Link>
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              <Link href="/about">Tutors</Link>
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              <Link href="/services">Quiz & Tests</Link>
            </li>
          </ul>
        </div>
        <div className="px-10">
          <p className="font-extrabold text-xl my-5">Company</p>
          <ul>
            <li className="font-extralight my-5  text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              <Link href="/about">About</Link>
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              <Link href="/contact">Talk To Us</Link>
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              <Link href="/contact">Help</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-extrabold text-xl my-5">Contact Us</p>
          <ul>
            <li className="font-extralight my-5 flex items-center  text-[1.1rem]">
              <span className="material-symbols-outlined mr-2 text-lg opacity-50">location_on</span>
              <span className="font-bold mr-3 text-base">Address : </span>
              <p className="text-base">77 Indian St. Baltimore, MD 21206</p>
            </li>
            <li className="font-extralight my-5 flex items-center text-[1.1rem]">
              <span className="material-symbols-outlined mr-2 text-lg opacity-50">call</span>
              <span className="font-bold mr-3 text-base">Phone : </span>
              <p className="text-base">+3233-332-334</p>
            </li>
            <li className="font-extralight my-5 flex items-center text-[1.1rem]">
              <span className="material-symbols-outlined mr-2 text-lg opacity-50">mail</span>
              <span className="font-bold mr-3 text-base">Email : </span>
              <a
                href="mailto:hello@elearni.com"
                className="text-base cursor-pointer hover:text-[#00ECA3] duration-500"
              >
                hello@elearni.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="copywriteSec px-24">
        <hr />
        <div className="flex justify-between items-center py-10">
          <p className="text-base font-extralight">
            Copyright © 2019 DesignThemes. All Rights Reserved
          </p>
          <div className="flex items-center justify-center">
            <Link
              href="/privacy-policy"
              className="text-base font-extralight cursor-pointer hover:text-[#00ECA3] duration-500"
            >
              Privacy Policy
            </Link>
            <span className="mx-5 font-extralight">|</span>
            <Link
              href="/terms"
              className="text-base font-extralight cursor-pointer hover:text-[#00ECA3] duration-500"
            >
              Terms And Conditions
            </Link>
            <span className="mx-5 font-extralight">|</span>
            <Link
              href="/refund-policy"
              className="text-base font-extralight cursor-pointer hover:text-[#00ECA3] duration-500"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
