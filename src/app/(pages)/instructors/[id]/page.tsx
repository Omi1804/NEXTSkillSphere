import CommonHero from "@/components/CommonHero";
import InstructorProfilePage from "@/components/Instructors/InstructorProfilePage";
import { getInstructorProfileById } from "@/repositories/courses.repository";
import { notFound } from "next/navigation";

type InstructorPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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
