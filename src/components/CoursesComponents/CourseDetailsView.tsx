"use client";

import { Course } from "@/types/course.types";
import { motion } from "framer-motion";
import Link from "next/link";
import { getAverageRating, getCourseReviews } from "@/lib/courseReviews";
import { useCourseCollections } from "@/hooks/useCourseCollections";

type CourseProgress = {
  totalLessons: number;
  completedLessons: number;
  completionPercentage: number;
  isCompleted: boolean;
};

type LessonItem = {
  id: string;
  title: string;
  videoUrl: string;
  position: number;
};

type CourseDetailsViewProps = {
  course: Course;
  lessons: LessonItem[];
  progress: CourseProgress | null;
  hasAccess: boolean;
  isLoggedIn: boolean;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const CourseDetailsView = ({
  course,
  lessons,
  progress,
  hasAccess,
  isLoggedIn,
}: CourseDetailsViewProps) => {
  const imageSource = course.imageLink
    ? course.imageLink.startsWith("http")
      ? course.imageLink
      : `/${course.imageLink}.jpg`
    : "/home-2-intro.jpg";

  const progressWidth = Math.max(0, Math.min(progress?.completionPercentage ?? 0, 100));
  const reviews = getCourseReviews(course.id);
  const averageRating = getAverageRating(reviews);
  const { addToCart, isInCart } = useCourseCollections();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,#c4fff0_0%,#ffffff_35%,#f4f8ff_100%)] px-4 py-10 md:px-10 lg:px-16">
      <motion.section
        className="mx-auto grid w-full max-w-7xl gap-8 rounded-3xl border border-white/80 bg-white/70 p-6 shadow-xl backdrop-blur md:grid-cols-[1.2fr_0.8fr] lg:p-10"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
          <p className="mb-3 inline-block rounded-full bg-[#00ECA3]/20 px-4 py-1 text-xs font-semibold tracking-[0.2em] text-[#057455]">
            COURSE DETAILS
          </p>
          <h1 className="text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-700 md:text-base">
            {course.description}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Price</p>
              <p className="mt-1 text-xl font-bold text-slate-900">₹{course.price}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Lessons</p>
              <p className="mt-1 text-xl font-bold text-slate-900">{lessons.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Instructor</p>
              {course.instructorId ? (
                <Link
                  href={`/instructors/${course.instructorId}`}
                  className="mt-1 line-clamp-1 text-lg font-bold text-slate-900 transition hover:text-[#057455]"
                >
                  {course.instructor || "Unknown"}
                </Link>
              ) : (
                <p className="mt-1 line-clamp-1 text-lg font-bold text-slate-900">
                  {course.instructor || "Unknown"}
                </p>
              )}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-xs uppercase tracking-widest text-slate-500">Rating</p>
              <p className="mt-1 text-xl font-bold text-slate-900">
                {averageRating}/5
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {!isLoggedIn && (
              <Link
                href={`/login?next=/courses/${course.id}`}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-2px]"
              >
                Sign In To Track Progress
              </Link>
            )}
            {isLoggedIn && !hasAccess && (
              <Link
                href={`/checkout/${course.id}`}
                className="rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:translate-y-[-2px]"
              >
                Purchase To Unlock Lessons
              </Link>
            )}
            {hasAccess && (
              <Link
                href={`/learn/${course.id}`}
                className="rounded-xl bg-[#00ECA3]/20 px-4 py-3 text-sm font-semibold text-[#05654c] transition hover:bg-[#00ECA3]/30"
              >
                You own this course. Keep learning.
              </Link>
            )}
            <Link
              href={`/courses/${course.id}/reviews`}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:translate-y-[-2px] hover:bg-slate-50"
            >
              View Reviews
            </Link>
            <button
              type="button"
              onClick={() => addToCart(course.id)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:translate-y-[-2px] hover:bg-slate-50"
            >
              {isInCart(course.id) ? "In Cart" : "Add to Cart"}
            </button>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="relative">
          <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-[#00ECA3]/30 blur-2xl" />
          <img
            src={imageSource}
            alt={course.title}
            className="relative h-[330px] w-full rounded-3xl object-cover shadow-lg md:h-[420px]"
          />
        </motion.div>
      </motion.section>

      <motion.section
        className="mx-auto mt-10 grid w-full max-w-7xl gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-md lg:grid-cols-[320px_1fr]"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#057455]">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-black text-slate-950">{averageRating}/5 Rating</h2>
          <Link
            href={`/courses/${course.id}/reviews`}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            All reviews
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.slice(0, 2).map((review) => (
            <article key={review.name} className="rounded-2xl border border-slate-200 p-5">
              <div className="flex text-[#f5b700]">
                {Array.from({ length: 5 }, (_, index) => (
                  <span key={index} className="material-symbols-outlined text-lg">
                    {index < review.rating ? "star" : "star_outline"}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">{review.body}</p>
              <p className="mt-4 font-bold text-slate-950">{review.name}</p>
              <p className="text-xs text-slate-500">{review.role}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="mx-auto mt-10 w-full max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-md lg:p-8"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Course Progress</h2>
          <p className="text-sm font-medium text-slate-600">
            {progress
              ? `${progress.completedLessons}/${progress.totalLessons} lessons completed`
              : "Progress available after purchase"}
          </p>
        </div>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-[#00ECA3] to-[#32b3ff]"
            initial={{ width: 0 }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        </div>
      </motion.section>

      <section className="mx-auto mt-10 w-full max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-900">Lesson Roadmap</h2>
          <p className="text-sm text-slate-500">Structured path from fundamentals to mastery</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-lg"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00ECA3]/20 text-sm font-bold text-[#066f53]">
                  {lesson.position}
                </div>
                <div className="min-w-0">
                  <h3 className="line-clamp-1 text-lg font-semibold text-slate-900">
                    {lesson.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">Video lesson</p>
                  {hasAccess ? (
                    <Link
                      href={`/learn/${course.id}/lesson/${lesson.id}`}
                      className="mt-3 inline-flex items-center text-sm font-semibold text-[#0a7cde] underline-offset-4 transition hover:underline"
                    >
                      Open lesson
                    </Link>
                  ) : (
                    <p className="mt-3 text-sm font-semibold text-slate-400">Locked</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {lessons.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No lessons added yet for this course.
          </div>
        )}
      </section>
    </div>
  );
};

export default CourseDetailsView;
