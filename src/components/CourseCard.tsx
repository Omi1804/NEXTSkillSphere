interface CourseCardType {
  image: string;
  price: number;
  time: string;
  level: string;
  heading: string;
  category: string;
  instructor: string;
}

const CourseCard = ({
  image,
  price,
  time,
  level,
  heading,
  category,
  instructor,
}: CourseCardType) => {
  return (
    <div className="w-full h-[33rem] rounded-2xl overflow-hidden border shadow-md hover:shadow-2xl hover:rounded-sm duration-300 hover:border-4 hover:border-[#00ECA3] cursor-pointer">
      <div className="w-full h-[14rem]  object-cover object-center relative ">
        <img src={image} className="w-full h-full rounded-b-xl" alt="" />
        <p className="absolute bottom-[-1.5rem] right-5 bg-[#00ECA3] w-[5rem] h-[5rem] rounded-full flex items-center justify-center text-white font-body font-medium text-lg shadow-lg">
          ${price}
        </p>
      </div>
      <div className="px-[2rem] pt-[2.5rem]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#00ECA3] text-xl">
              signal_cellular_alt
            </span>
            <p className="font-body font-light text-base">{level}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#00ECA3] text-xl">
              schedule
            </span>
            <p className="font-body font-medium text-base">{time}</p>
          </div>
        </div>
        <hr />
        <h2 className="font-heading font-bold text-xl my-4">{heading}</h2>
        <div className="flex items-center gap-2 my-4">
          <span className="font-body font-semibold text-sm text-[#00ECA3]">
            Category :
          </span>
          <p className="font-heading font-light text-sm tracking-wide">
            {category}
          </p>
        </div>
        <hr />
        <div className="flex items-center justify-between my-5">
          <div className="flex gap-2 items-center">
            <img
              className="w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden"
              src="/icons/teacher1.png"
              alt=""
            />
            <p className="font-heading font-medium text-base hover:text-[#00ECA3] cursor-pointer">
              {instructor}
            </p>
          </div>
          <div className="flex gap-2 items-center hover:text-[#00ECA3] cursor-pointer">
            <p className="font-heading font-medium text-base ">Know Details</p>
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
