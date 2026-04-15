"use client";

import { Course } from "@/types/course.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type AdminCoursesTableProps = {
  courses: Course[];
};

const getImageSource = (image?: string | null) => {
  if (!image) return "/home-2-intro.jpg";
  if (image.startsWith("http") || image.startsWith("/")) return image;
  return `/${image}.jpg`;
};

const AdminCoursesTable = ({ courses }: AdminCoursesTableProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const deleteCourse = async (courseId: string) => {
    const confirmed = window.confirm("Delete this course and its lessons?");
    if (!confirmed) return;

    setDeletingId(courseId);
    setError(null);

    try {
      const response = await fetch(`/api/v1/admin/courses/${courseId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete course");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete course");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="text-xs uppercase tracking-widest text-slate-500">
            <tr>
              <th className="border-b border-slate-200 py-3">Course</th>
              <th className="border-b border-slate-200 py-3">Price</th>
              <th className="border-b border-slate-200 py-3">Image</th>
              <th className="border-b border-slate-200 py-3">Status</th>
              <th className="border-b border-slate-200 py-3">Instructor</th>
              <th className="border-b border-slate-200 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border-b border-slate-100 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageSource(course.imageLink)}
                      alt={course.title}
                      className="h-12 w-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold text-slate-950">{course.title}</p>
                      <p className="line-clamp-1 max-w-sm text-xs text-slate-500">
                        {course.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="border-b border-slate-100 py-4 font-semibold">₹{course.price}</td>
                <td className="border-b border-slate-100 py-4">
                  {course.image_id ? `#${course.image_id}` : "Unassigned"}
                </td>
                <td className="border-b border-slate-100 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      course.isPublished
                        ? "bg-[#00ECA3]/15 text-[#057455]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {course.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="border-b border-slate-100 py-4">{course.instructor}</td>
                <td className="border-b border-slate-100 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/courses/${course.id}/lessons`}
                      className="rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      Lessons
                    </Link>
                    <Link
                      href={`/admin/courses/${course.id}/edit`}
                      className="rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                      Edit
                    </Link>
                    <button
                      type="button"
                      disabled={deletingId === course.id}
                      onClick={() => deleteCourse(course.id)}
                      className="rounded-lg border border-red-200 px-3 py-2 font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === course.id ? "Deleting" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {courses.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
          No courses created yet.
        </div>
      )}
    </section>
  );
};

export default AdminCoursesTable;
