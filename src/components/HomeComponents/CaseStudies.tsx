import styles from "@/styles/home.module.css";

const CaseStudies = () => {
  return (
    <div className="relative w-full h-[80vh] border-2 border-red-600">
      <div className="grid grid-cols-2">
        <div className="bg-[#6A7CF0] flex flex-col justify-center items-end px-[5rem] py-[3rem]">
          <p className="text-white font-bold text-xl tracking-wide">
            Get the know what is best for you
          </p>
          <p className={styles.viewCategory}>View Categories</p>
        </div>
        <div className="bg-[#00ECA3] flex flex-col justify-center items-start  px-[5rem] py-[3rem]">
          <p className="text-white font-bold text-xl tracking-wide">
            Get the know what is best for you
          </p>
          <p className={styles.viewCollection}>View Collection</p>
        </div>
        <div></div>
      </div>
      <div>
        <div className="border-2 border-blue-500">
          <h1>A New Era in Online Education</h1>
          <p>CASE STUDIES FOR YOU</p>
        </div>
        <div className="grid grid-cols-2 p-16 justify-items-center">
          <div>
            <div className="border-2 border-blue-500 w-[35rem] h-[20rem] rounded-lg "></div>
            <p></p>
            <button></button>
          </div>
          <div>
            <div className="border-2 border-blue-500 w-[35rem] h-[20rem] rounded-lg"></div>
            <p></p>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
