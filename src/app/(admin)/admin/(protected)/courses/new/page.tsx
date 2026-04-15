import AdminCourseForm from "@/components/Admin/AdminCourseForm";
import { getAllCourseImages } from "@/repositories/images.repository";

const AdminNewCoursePage = async () => {
  const images = await getAllCourseImages();

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057455]">
          Catalog
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">Create course</h2>
      </div>

      <AdminCourseForm mode="create" images={images} />
    </div>
  );
};

export default AdminNewCoursePage;
