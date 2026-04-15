import AdminLessonsManager from "@/components/Admin/AdminLessonsManager";
import { getCourseById } from "@/repositories/courses.repository";
import { getLessonsByCourseId } from "@/repositories/lessons.repository";
import Link from "next/link";
import { notFound } from "next/navigation";

type AdminCourseLessonsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const AdminCourseLessonsPage = async ({ params }: AdminCourseLessonsPageProps) => {
  const { id } = await params;
  const [course, lessons] = await Promise.all([getCourseById(id), getLessonsByCourseId(id)]);

  if (!course) {
    notFound();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057455]">
            Lessons
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">{course.title}</h2>
        </div>
        <Link
          href="/admin/courses"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-white"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Courses
        </Link>
      </div>

      <AdminLessonsManager course={course} lessons={lessons} />
    </div>
  );
};

export default AdminCourseLessonsPage;
