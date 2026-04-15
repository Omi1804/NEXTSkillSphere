import AdminCoursesTable from "@/components/Admin/AdminCoursesTable";
import { getAllCourses } from "@/repositories/courses.repository";
import Link from "next/link";

const AdminCoursesPage = async () => {
  const courses = await getAllCourses();

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057455]">
            Catalog
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Courses</h2>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-base">add</span>
          New course
        </Link>
      </div>

      <AdminCoursesTable courses={courses} />
    </div>
  );
};

export default AdminCoursesPage;
