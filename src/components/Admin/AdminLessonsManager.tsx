"use client";

import { Course } from "@/types/course.types";
import { LessonRecord } from "@/types/lessons.types";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type AdminLessonsManagerProps = {
  course: Course;
  lessons: LessonRecord[];
};

const AdminLessonsManager = ({ course, lessons }: AdminLessonsManagerProps) => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [position, setPosition] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setVideoUrl("");
    setPosition("");
    setEditingId(null);
  };

  const startEdit = (lesson: LessonRecord) => {
    setTitle(lesson.title);
    setVideoUrl(lesson.videoUrl);
    setPosition(String(lesson.position));
    setEditingId(lesson.id);
  };

  const saveLesson = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = {
      title,
      videoUrl,
      ...(position ? { position: Number(position) } : {}),
    };

    try {
      const response = await fetch(
        editingId
          ? `/api/v1/admin/lessons/${editingId}`
          : `/api/v1/admin/courses/${course.id}/lessons`,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to save lesson");
      }

      resetForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save lesson");
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteLesson = async (lessonId: string) => {
    const confirmed = window.confirm("Delete this lesson?");
    if (!confirmed) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/admin/lessons/${lessonId}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to delete lesson");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete lesson");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">Lessons</h3>
        <div className="mt-5 space-y-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="grid gap-4 rounded-2xl border border-slate-200 p-4 md:grid-cols-[auto_1fr_auto]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ECA3]/15 text-sm font-bold text-[#057455]">
                {lesson.position}
              </div>
              <div>
                <p className="font-bold text-slate-950">{lesson.title}</p>
                <a
                  href={lesson.videoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 line-clamp-1 text-xs text-slate-500 hover:text-[#057455]"
                >
                  {lesson.videoUrl}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(lesson)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => deleteLesson(lesson.id)}
                  className="rounded-lg border border-red-200 px-3 py-2 text-sm font-bold text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="mt-5 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
            No lessons added yet.
          </div>
        )}
      </section>

      <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-950">
          {editingId ? "Edit lesson" : "Add lesson"}
        </h3>
        <form className="mt-5 space-y-5" onSubmit={saveLesson}>
          <div>
            <label htmlFor="title" className="text-sm font-bold text-slate-700">
              Title
            </label>
            <input
              id="title"
              value={title}
              required
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            />
          </div>

          <div>
            <label htmlFor="videoUrl" className="text-sm font-bold text-slate-700">
              Video URL
            </label>
            <input
              id="videoUrl"
              value={videoUrl}
              required
              onChange={(event) => setVideoUrl(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            />
          </div>

          <div>
            <label htmlFor="position" className="text-sm font-bold text-slate-700">
              Position
            </label>
            <input
              id="position"
              type="number"
              min="1"
              value={position}
              placeholder={String(lessons.length + 1)}
              onChange={(event) => setPosition(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Saving..." : editingId ? "Save lesson" : "Add lesson"}
            <span className="material-symbols-outlined text-base">save</span>
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Cancel edit
            </button>
          )}
        </form>
      </aside>
    </div>
  );
};

export default AdminLessonsManager;
