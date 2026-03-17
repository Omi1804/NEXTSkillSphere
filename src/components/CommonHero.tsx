import style from "@/app/styles/register.module.css";

interface CommonHeroInput {
  Image: string;
  heroHeading: string;
  subHeading: string;
  blackFilter?: boolean;
}

const CommonHero = ({ Image, heroHeading, subHeading, blackFilter }: CommonHeroInput) => {
  return (
    <div
      className={`${style.registerHero} flex items-end px-[8rem] py-[4rem] relative`}
      style={{
        backgroundImage: !blackFilter ? `url(${Image})` : "",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {blackFilter && (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(/${Image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <div className="text-white z-10">
        <h1 className="text-[4rem] font-extrabold ">{heroHeading}</h1>
        <p className={`w-full h-[3px] bg-white rounded-md ${style.registerLine}`}></p>
        <p className="font-light text-white brightness-125 tracking-widest mt-6">
          HOME / {subHeading}
        </p>
      </div>
    </div>
  );
};

export default CommonHero;
