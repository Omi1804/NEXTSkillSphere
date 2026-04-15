"use client";

import { Course } from "@/types/course.types";
import { LessonRecord } from "@/types/lessons.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type LessonProgress = {
  lessonId: string;
  completed: boolean;
};

type LessonFocusClientProps = {
  course: Course;
  lesson: LessonRecord;
  lessons: LessonRecord[];
  progressLessons: LessonProgress[];
};

const getEmbedUrl = (videoUrl: string) => {
  try {
    const url = new URL(videoUrl);

    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube.com/embed/${videoId}` : videoUrl;
    }

    if (url.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed/${url.pathname.replace("/", "")}`;
    }

    if (url.hostname.includes("vimeo.com")) {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://player.vimeo.com/video/${videoId}` : videoUrl;
    }

    return videoUrl;
  } catch {
    return videoUrl;
  }
};

const LessonFocusClient = ({
  course,
  lesson,
  lessons,
  progressLessons,
}: LessonFocusClientProps) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previousLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;
  const isCompleted = progressLessons.find((item) => item.lessonId === lesson.id)?.completed ?? false;
  const embedUrl = useMemo(() => getEmbedUrl(lesson.videoUrl), [lesson.videoUrl]);

  const updateProgress = async (completed: boolean) => {
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/user/lessons/${lesson.id}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to update progress");
      }

      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update progress");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 md:px-8 lg:grid-cols-[1fr_360px]">
        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <Link
              href={`/learn/${course.id}`}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#00ECA3] hover:underline"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Course roadmap
            </Link>
            <Link
              href={`/courses/${course.id}`}
              className="text-sm font-semibold text-slate-300 hover:text-white"
            >
              Course details
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl">
            <div className="aspect-video w-full">
              <iframe
                src={embedUrl}
                title={lesson.title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#00ECA3]">
              Lesson {lesson.position}
            </p>
            <h1 className="mt-3 text-3xl font-bold">{lesson.title}</h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">{course.title}</p>

            {error && (
              <div className="mt-5 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => updateProgress(!isCompleted)}
                className="inline-flex items-center gap-2 rounded-xl bg-[#00ECA3] px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="material-symbols-outlined text-base">
                  {isCompleted ? "undo" : "check_circle"}
                </span>
                {isUpdating
                  ? "Saving..."
                  : isCompleted
                    ? "Mark incomplete"
                    : "Mark complete"}
              </button>

              {previousLesson && (
                <Link
                  href={`/learn/${course.id}/lesson/${previousLesson.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Previous
                </Link>
              )}

              {nextLesson && (
                <Link
                  href={`/learn/${course.id}/lesson/${nextLesson.id}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Next lesson
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              )}
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <h2 className="text-lg font-bold">All lessons</h2>
          <div className="mt-4 space-y-3">
            {lessons.map((item) => {
              const completed =
                progressLessons.find((progress) => progress.lessonId === item.id)?.completed ??
                false;
              const active = item.id === lesson.id;

              return (
                <Link
                  key={item.id}
                  href={`/learn/${course.id}/lesson/${item.id}`}
                  className={`flex gap-3 rounded-xl border p-3 transition ${
                    active
                      ? "border-[#00ECA3] bg-[#00ECA3]/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="material-symbols-outlined text-base text-[#00ECA3]">
                    {completed ? "check_circle" : "play_circle"}
                  </span>
                  <span className="text-sm font-semibold leading-5">{item.title}</span>
                </Link>
              );
            })}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default LessonFocusClient;
