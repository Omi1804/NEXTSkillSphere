import { getAdminCourseStats, getAllCourses } from "@/repositories/courses.repository";
import Link from "next/link";

const AdminDashboardPage = async () => {
  const [stats, courses] = await Promise.all([getAdminCourseStats(), getAllCourses()]);
  const latestCourses = courses.slice(0, 5);

  const statCards = [
    { label: "Courses", value: stats.totalCourses, icon: "library_books" },
    { label: "Published", value: stats.publishedCourses, icon: "verified" },
    { label: "Drafts", value: stats.draftCourses, icon: "edit_note" },
    { label: "Lessons", value: stats.totalLessons, icon: "play_lesson" },
    { label: "Purchases", value: stats.totalPurchases, icon: "shopping_bag" },
    { label: "Revenue", value: `₹${stats.revenue}`, icon: "payments" },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#057455]">
            Overview
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-950">Dashboard</h2>
        </div>
        <Link
          href="/admin/courses/new"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
        >
          <span className="material-symbols-outlined text-base">add</span>
          New course
        </Link>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-500">{card.label}</p>
              <span className="material-symbols-outlined text-[#057455]">{card.icon}</span>
            </div>
            <p className="mt-4 text-3xl font-bold text-slate-950">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold text-slate-950">Recent courses</h3>
          <Link href="/admin/courses" className="text-sm font-bold text-[#057455] hover:underline">
            View all
          </Link>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="text-xs uppercase tracking-widest text-slate-500">
              <tr>
                <th className="border-b border-slate-200 py-3">Course</th>
                <th className="border-b border-slate-200 py-3">Price</th>
                <th className="border-b border-slate-200 py-3">Status</th>
                <th className="border-b border-slate-200 py-3">Instructor</th>
                <th className="border-b border-slate-200 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {latestCourses.map((course) => (
                <tr key={course.id}>
                  <td className="border-b border-slate-100 py-4 font-semibold text-slate-950">
                    {course.title}
                  </td>
                  <td className="border-b border-slate-100 py-4">₹{course.price}</td>
                  <td className="border-b border-slate-100 py-4">
                    {course.isPublished ? "Published" : "Draft"}
                  </td>
                  <td className="border-b border-slate-100 py-4">{course.instructor}</td>
                  <td className="border-b border-slate-100 py-4">
                    <Link
                      href={`/admin/courses/${course.id}/edit`}
                      className="font-bold text-[#057455] hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboardPage;
