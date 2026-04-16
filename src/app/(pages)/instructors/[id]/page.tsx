import CommonHero from "@/components/CommonHero";
import InstructorProfilePage from "@/components/Instructors/InstructorProfilePage";
import { createPageMetadata } from "@/lib/seo";
import { getInstructorProfileById } from "@/repositories/courses.repository";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type InstructorPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: InstructorPageProps): Promise<Metadata> {
  const { id } = await params;
  const instructor = await getInstructorProfileById(id);

  if (!instructor) {
    return createPageMetadata({
      title: "Instructor not found",
      description: "The requested instructor profile could not be found.",
      path: `/instructors/${id}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: instructor.name,
    description: `${instructor.name} teaches ${instructor.courses.length} published course${
      instructor.courses.length === 1 ? "" : "s"
    } on eLearni.`,
    path: `/instructors/${instructor.id}`,
    keywords: [instructor.name, "course instructor", "online educator"],
  });
}

const InstructorPage = async ({ params }: InstructorPageProps) => {
  const { id } = await params;
  const instructor = await getInstructorProfileById(id);

  if (!instructor) {
    notFound();
  }

  return (
    <>
      <CommonHero Image="/breadcrumb-whyus.png" heroHeading={instructor.name} subHeading="INSTRUCTOR" />
      <InstructorProfilePage instructor={instructor} />
    </>
  );
};

export default InstructorPage;
