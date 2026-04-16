import CommonHero from "@/components/CommonHero";
import AllCoursesList from "@/components/CoursesComponents/AllCoursesList";
import JoinCourse from "@/components/HomeComponents/JoinCourse";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { getCoursesPaginated } from "@/repositories/courses.repository";
import { Course } from "@/types/course.types";

export const metadata: Metadata = createPageMetadata({
  title: "Courses",
  description:
    "Browse published eLearni courses to build practical skills with self-paced lessons, projects, and expert guidance.",
  path: "/courses",
  keywords: ["online courses", "self-paced courses", "tech upskilling"],
});

const parsePositiveInt = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.floor(parsed);
};

type CoursesPageProps = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

const courses = async ({ searchParams }: CoursesPageProps) => {
  const resolvedSearchParams = await searchParams;
  const page = parsePositiveInt(resolvedSearchParams?.page, 1);
  const limit = parsePositiveInt(resolvedSearchParams?.limit, 6);

  let courses: Course[] = [];
  let totalCourses = 0;

  try {
    const paginatedCourses = await getCoursesPaginated(page, limit, { onlyPublished: true });
    courses = paginatedCourses.courses;
    totalCourses = paginatedCourses.totalCourses;
  } catch (error) {
    console.error("Error fetching courses:", error);
  }

  return (
    <div>
      <CommonHero
        Image={"/breadcrumb-whyus.png"}
        heroHeading={"Courses List"}
        subHeading={"COURSE LIST"}
      />
      <AllCoursesList courses={courses} page={page} limit={limit} total={totalCourses} />
      <JoinCourse />
    </div>
  );
};

export default courses;
