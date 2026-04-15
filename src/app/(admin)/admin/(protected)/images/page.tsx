import AdminImagesManager from "@/components/Admin/AdminImagesManager";
import { getAllCourses } from "@/repositories/courses.repository";
import { getAllCourseImages } from "@/repositories/images.repository";

const AdminImagesPage = async () => {
  const [images, courses] = await Promise.all([getAllCourseImages(), getAllCourses()]);

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057455]">
          Assets
        </p>
        <h2 className="mt-2 text-3xl font-bold text-slate-950">Course images</h2>
      </div>

      <AdminImagesManager images={images} courses={courses} />
    </div>
  );
};

export default AdminImagesPage;
