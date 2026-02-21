import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faVimeoV,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";
import styles from "@/app/styles/footer.module.css";

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
            <p className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black">
              <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4 p-4  " />
            </p>
            <p className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black">
              <FontAwesomeIcon icon={faTwitter} className="w-4 h-4 p-4 " />
            </p>
            <p className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black">
              <FontAwesomeIcon icon={faGooglePlusG} className="w-4 h-4 p-4 " />
            </p>
            <p className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black">
              <FontAwesomeIcon icon={faVimeoV} className="w-4 h-4 p-4 " />
            </p>
            <p className="rounded-full mx-1 flex items-center bg-[#6A7CF0] text-white transition duration-500 hover:bg-white hover:text-black">
              <FontAwesomeIcon icon={faInstagram} className="w-4 h-4 p-4 " />
            </p>
          </div>
        </div>
      </div>
      <div className="lowerSec py-10 px-16 grid grid-cols-3">
        <div className=" px-10">
          <p className="font-extrabold text-xl my-5">Links</p>
          <ul>
            <li className="font-extralight my-5  text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              Courses
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              Tutors
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              Quiz & Tests
            </li>
          </ul>
        </div>
        <div className="px-10">
          <p className="font-extrabold text-xl my-5">Company</p>
          <ul>
            <li className="font-extralight my-5  text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              About
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              Talk To Us
            </li>
            <li className="font-extralight my-5 text-[1.1rem] hover:text-[#00ECA3] cursor-pointer duration-300">
              <span className="text-[#00ECA3] mr-2 font-bold text-xl">•</span>
              Help
            </li>
          </ul>
        </div>
        <div>
          <p className="font-extrabold text-xl my-5">Contact Us</p>
          <ul>
            <li className="font-extralight my-5 flex items-center  text-[1.1rem]">
              <span className="material-symbols-outlined mr-2 text-lg opacity-50">
                location_on
              </span>
              <span className="font-bold mr-3 text-base">Address : </span>
              <p className="text-base">77 Indian St. Baltimore, MD 21206</p>
            </li>
            <li className="font-extralight my-5 flex items-center text-[1.1rem]">
              <span className="material-symbols-outlined mr-2 text-lg opacity-50">
                call
              </span>
              <span className="font-bold mr-3 text-base">Phone : </span>
              <p className="text-base">+3233-332-334</p>
            </li>
            <li className="font-extralight my-5 flex items-center text-[1.1rem]">
              <span className="material-symbols-outlined mr-2 text-lg opacity-50">
                mail
              </span>
              <span className="font-bold mr-3 text-base">Email : </span>
              <p className="text-base cursor-pointer hover:text-[#00ECA3] duration-500">
                elearny@example.com
              </p>
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
            <p className="text-base font-extralight cursor-pointer hover:text-[#00ECA3] duration-500">
              Privacy Policy
            </p>
            <span className="mx-5 font-extralight">|</span>
            <p className="text-base font-extralight cursor-pointer hover:text-[#00ECA3] duration-500">
              Terms And Conditions
            </p>
            <span className="mx-5 font-extralight">|</span>
            <p className="text-base font-extralight cursor-pointer hover:text-[#00ECA3] duration-500">
              Refund Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
