import Link from "next/link";

type PaymentStatusProps = {
  status: "success" | "failed";
  courseId?: string;
};

const PaymentStatus = ({ status, courseId }: PaymentStatusProps) => {
  const isSuccess = status === "success";

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-4 py-16 md:px-10">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12">
        <div
          className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
            isSuccess ? "bg-[#00ECA3]/15 text-[#057455]" : "bg-red-50 text-red-600"
          }`}
        >
          <span className="material-symbols-outlined text-3xl">
            {isSuccess ? "check_circle" : "error"}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-950">
          {isSuccess ? "Enrollment confirmed" : "Payment could not be completed"}
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600">
          {isSuccess
            ? "Your course is unlocked and ready in the learning area."
            : "No enrollment was completed. You can return to checkout and try again when the payment step is ready."}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {isSuccess && courseId && (
            <Link
              href={`/learn/${courseId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-[#00ECA3] px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
            >
              Start learning
              <span className="material-symbols-outlined text-base">school</span>
            </Link>
          )}

          {!isSuccess && courseId && (
            <Link
              href={`/checkout/${courseId}`}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
            >
              Back to checkout
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          )}

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Browse courses
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PaymentStatus;
