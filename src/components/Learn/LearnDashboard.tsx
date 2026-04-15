import { Course } from "@/types/course.types";
import { LessonRecord } from "@/types/lessons.types";
import Link from "next/link";

type LessonProgress = {
  lessonId: string;
  title: string;
  position: number;
  completed: boolean;
};

type LearnDashboardProps = {
  course: Course;
  lessons: LessonRecord[];
  progressLessons: LessonProgress[];
};

const LearnDashboard = ({ course, lessons, progressLessons }: LearnDashboardProps) => {
  const completedLessons = progressLessons.filter((lesson) => lesson.completed).length;
  const completionPercentage =
    lessons.length === 0 ? 0 : Math.round((completedLessons / lessons.length) * 100);
  const nextLesson =
    lessons.find((lesson) => {
      const progress = progressLessons.find((item) => item.lessonId === lesson.id);
      return !progress?.completed;
    }) || lessons[0];

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-10 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl bg-slate-950 p-8 text-white shadow-xl md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#00ECA3]">
              Learning dashboard
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Pick up the next lesson, review the roadmap, and keep your progress moving.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">Lessons</p>
                <p className="mt-2 text-2xl font-bold">{lessons.length}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">Completed</p>
                <p className="mt-2 text-2xl font-bold">{completedLessons}</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-400">Progress</p>
                <p className="mt-2 text-2xl font-bold">{completionPercentage}%</p>
              </div>
            </div>

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#00ECA3]"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            {nextLesson && (
              <Link
                href={`/learn/${course.id}/lesson/${nextLesson.id}`}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#00ECA3] px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
              >
                Continue lesson
                <span className="material-symbols-outlined text-base">play_arrow</span>
              </Link>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="text-xl font-bold text-slate-950">Course overview</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p>
            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Instructor
              </p>
              <p className="mt-2 font-bold text-slate-900">{course.instructor}</p>
            </div>
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#057455]">
                Lessons
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">Course roadmap</h2>
            </div>
            <Link
              href={`/courses/${course.id}`}
              className="text-sm font-bold text-[#057455] hover:underline"
            >
              Back to course details
            </Link>
          </div>

          <div className="grid gap-4">
            {lessons.map((lesson) => {
              const progress = progressLessons.find((item) => item.lessonId === lesson.id);

              return (
                <Link
                  key={lesson.id}
                  href={`/learn/${course.id}/lesson/${lesson.id}`}
                  className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md md:grid-cols-[auto_1fr_auto]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ECA3]/15 text-sm font-bold text-[#057455]">
                    {lesson.position}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{lesson.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">Video lesson</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                    <span className="material-symbols-outlined text-base">
                      {progress?.completed ? "check_circle" : "play_circle"}
                    </span>
                    {progress?.completed ? "Completed" : "Start"}
                  </div>
                </Link>
              );
            })}
          </div>

          {lessons.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
              Lessons have not been added to this course yet.
            </div>
          )}
        </section>
      </section>
    </main>
  );
};

export default LearnDashboard;
