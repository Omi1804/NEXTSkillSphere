import { Course } from "@/types/course.types";
import { CourseReview, getAverageRating } from "@/lib/courseReviews";
import Link from "next/link";

type CourseReviewsPageProps = {
  course: Course;
  reviews: CourseReview[];
};

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex text-[#f5b700]" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="material-symbols-outlined text-lg">
        {index < rating ? "star" : "star_outline"}
      </span>
    ))}
  </div>
);

const CourseReviewsPage = ({ course, reviews }: CourseReviewsPageProps) => {
  const averageRating = getAverageRating(reviews);

  return (
    <main className="bg-[#f6f8fb] px-4 py-12 md:px-10">
      <section className="mx-auto max-w-7xl">
        <div className="grid gap-6 rounded-2xl bg-slate-950 p-6 text-white shadow-xl md:grid-cols-[1fr_340px] md:p-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#00ECA3]">
              Reviews
            </p>
            <h1 className="mt-3 text-4xl font-black">{course.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
              Learner stories and ratings that help future students decide whether this course fits
              their next skill goal.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/10 p-5">
            <p className="text-sm text-slate-300">Average rating</p>
            <div className="mt-2 flex items-end gap-3">
              <p className="text-5xl font-black">{averageRating}</p>
              <p className="pb-2 text-sm text-slate-300">/ 5</p>
            </div>
            <div className="mt-3">
              <Stars rating={Math.round(averageRating)} />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={`${review.name}-${review.role}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <Stars rating={review.rating} />
              <p className="mt-4 text-sm leading-7 text-slate-600">{review.body}</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ECA3]/15 text-sm font-black text-[#057455]">
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-950">{review.name}</p>
                  <p className="text-xs text-slate-500">{review.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/courses/${course.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
          >
            Back to course
            <span className="material-symbols-outlined text-base">arrow_back</span>
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Browse courses
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CourseReviewsPage;
