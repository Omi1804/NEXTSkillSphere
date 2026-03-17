import { useRouter } from "next/navigation";

interface CourseCardType {
  id: string;
  image?: string | null;
  price: number;
  heading: string;
  description?: string;
  instructor?: string;
}

const CourseCard = ({ id, image, price, heading, description, instructor }: CourseCardType) => {
  const router = useRouter();
  const imageSource = image
    ? image.startsWith("http")
      ? image
      : `/${image}.jpg`
    : "/home-2-intro.jpg";

  return (
    <div
      onClick={() => router.push(`/courses/${id}`)}
      className="w-full h-[33rem] rounded-2xl overflow-hidden border shadow-md hover:shadow-xl hover:rounded-tl-[2.3rem] duration-300 cursor-pointer"
    >
      <div className="w-full h-[14rem]  object-cover object-center relative ">
        <img src={imageSource} className="w-full h-full rounded-b-xl object-cover" alt={heading} />
        <p className="absolute bottom-[-1.5rem] right-5 bg-[#00ECA3] w-[5rem] h-[5rem] rounded-full flex items-center justify-center text-white font-body font-medium text-lg shadow-lg">
          ${price}
        </p>
      </div>
      <div className="px-[2rem] pt-[2.5rem]">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#00ECA3] text-xl">school</span>
            <p className="font-body font-light text-base">SkillSphere Course</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[#00ECA3] text-xl">schedule</span>
            <p className="font-body font-medium text-base">Self-paced</p>
          </div>
        </div>
        <hr />
        <h2 className="font-heading font-bold text-xl my-4">{heading}</h2>
        <div className="my-4 min-h-12">
          <p className="font-heading font-light text-sm tracking-wide line-clamp-2">
            {description || "No description available yet."}
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
              {instructor || "Unknown Instructor"}
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
