import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faVimeoV,
  faGooglePlusG,
} from "@fortawesome/free-brands-svg-icons";

const Details = () => {
  return (
    <div className="bg-[url(/cnt-info.webp)] bg-top bg-contain bg-no-repeat px-[4rem] py-[6rem] flex w-full h-full">
      <div className="w-[55%] px-[2rem]">
        <h1 className="font-bold font-body text-3xl ">Contact Info</h1>
        <p className="w-[7rem] h-[3px] bg-[#00ECA3] rounded-lg my-4"></p>
        <p className="my-14 font-light font-heading tracking-wide text-lg">
          Sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt. Labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip commodo
          consequat.
        </p>
        <h1 className="font-bold font-body text-xl my-4">Working Hours</h1>
        <div className="flex gap-7">
          <h3 className="font-bold font-heading text-md tracking-wide text-[#22222]">
            MONDAY TO FRIDAY :
          </h3>
          <p className="font-heading font-light tracking-wide text-md">
            09:00 hrs to 17:00 hrs
          </p>
        </div>
        <div className="flex gap-7">
          <h3 className="font-bold font-heading text-md tracking-wide text-[#22222]">
            SATURDAY & SUNDAY :
          </h3>
          <p className="font-heading font-light tracking-wide text-md">
            09:00 hrs to 14:00 hrs
          </p>
        </div>
      </div>
      <div className="w-[45%] py-[4rem]">
        <div className="flex m-6 ">
          <span className="material-symbols-outlined mx-2 ">location_on</span>
          <h3 className="font-bold font-heading text-base mx-2 w-[5.5rem]">
            ADDRESS :
          </h3>
          <p className="font-heading font-light text-base mx-2">
            77 Indian St. Baltimore, MD 21206
          </p>
        </div>
        <div className="flex m-6 ">
          <span className="material-symbols-outlined mx-2 ">call</span>
          <h3 className="font-bold font-heading text-base mx-2 w-[5.5rem]">
            PHONE :
          </h3>
          <p className="font-heading font-light text-base mx-2">
            +3233-332-334
          </p>
        </div>
        <div className="flex m-6 ">
          <span className="material-symbols-outlined mx-2 ">mail</span>
          <h3 className="font-bold font-heading text-base mx-2 w-[5.5rem]">
            EMAIL :
          </h3>
          <p className="font-heading font-light text-base mx-2">
            elearny@example.com
          </p>
        </div>
        <div className="m-8">
          <h1 className="font-heading font-bold text-xl my-4">Follow Us On:</h1>
          <div className="flex items-center gap-3">
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
    </div>
  );
};

export default Details;
