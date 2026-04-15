import AdminCourseForm from "@/components/Admin/AdminCourseForm";
import { getCourseById } from "@/repositories/courses.repository";
import { getAllCourseImages } from "@/repositories/images.repository";
import { notFound } from "next/navigation";

type AdminEditCoursePageProps = {
  params: Promise<{
    id: string;
  }>;
};

const AdminEditCoursePage = async ({ params }: AdminEditCoursePageProps) => {
  const { id } = await params;
  const [course, images] = await Promise.all([getCourseById(id), getAllCourseImages()]);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057455]">
          Catalog
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">Edit course</h2>
      </div>

      <AdminCourseForm mode="edit" course={course} images={images} />
    </div>
  );
};

export default AdminEditCoursePage;
