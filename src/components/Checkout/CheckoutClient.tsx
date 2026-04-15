"use client";

import { Course } from "@/types/course.types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CheckoutClientProps = {
  course: Course;
  alreadyPurchased: boolean;
};

const CheckoutClient = ({ course, alreadyPurchased }: CheckoutClientProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const confirmEnrollment = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/v1/user/courses/purchase/${course.id}`, {
        method: "POST",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Unable to confirm enrollment");
      }

      router.refresh();
      router.replace(`/payment/success?courseId=${course.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to confirm enrollment");
      router.replace(`/payment/failed?courseId=${course.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-12 md:px-10">
      <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_420px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#057455]">
            Checkout
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950">{course.title}</h1>
          <p className="mt-4 text-sm leading-7 text-slate-600">{course.description}</p>

          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#057455]">payments</span>
              <div>
                <h2 className="font-bold text-slate-950">Payment gateway slot</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Razorpay can be mounted here later. For now this page uses the existing manual
                  enrollment endpoint so the course flow remains testable end to end.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
          <h2 className="text-xl font-bold text-slate-950">Order summary</h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">{course.title}</p>
                <p className="mt-1 text-sm text-slate-500">{course.instructor}</p>
              </div>
              <p className="font-bold text-slate-950">₹{course.price}</p>
            </div>
            <div className="border-t border-slate-200 pt-4">
              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-950">Total</p>
                <p className="text-2xl font-bold text-slate-950">₹{course.price}</p>
              </div>
            </div>
          </div>

          {alreadyPurchased ? (
            <Link
              href={`/learn/${course.id}`}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#00ECA3] px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
            >
              Go to learning
              <span className="material-symbols-outlined text-base">school</span>
            </Link>
          ) : (
            <button
              type="button"
              disabled={isSubmitting}
              onClick={confirmEnrollment}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Confirming..." : "Confirm enrollment"}
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          )}

          <Link
            href={`/courses/${course.id}`}
            className="mt-4 block text-center text-sm font-semibold text-slate-500 hover:text-slate-950"
          >
            Back to course details
          </Link>
        </aside>
      </section>
    </main>
  );
};

export default CheckoutClient;
