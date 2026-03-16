import CommonHero from "@/components/CommonHero";
import AllCoursesList from "@/components/CoursesComponents/AllCoursesList";
import JoinCourse from "@/components/HomeComponents/JoinCourse";

const getAllCourse = async (page: number, limit: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/user/courses?page=${page}&limit=${limit}`,
      {
        cache: "no-store",
      },
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};

type CoursesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

const courses = async ({ searchParams }: CoursesPageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const limit = Number(resolvedSearchParams?.limit) || 6;

  const courses = await getAllCourse(page, limit);
  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-whyus.png"}
        heroHeading={"Courses List"}
        subHeading={"COURSE LIST"}
      />
      <AllCoursesList
        courses={courses.allCourses}
        page={page}
        limit={limit}
        total={courses.totalCourses}
      />
      <JoinCourse />
    </div>
  );
};

export default courses;
