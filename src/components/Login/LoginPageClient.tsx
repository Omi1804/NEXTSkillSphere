"use client";

import { getApiErrorMessage, getClientErrorMessage } from "@/errors/clientError";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const LoginPageClient = () => {
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Unable to login"));
      }

      const safeNextPath = nextPath.startsWith("/") ? nextPath : "/";

      window.location.assign(safeNextPath);
    } catch (err) {
      setError(getClientErrorMessage(err, "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-[#f6f8fb] px-4 py-16 md:px-10">
      <section className="mx-auto grid h-[560px] max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[560px] overflow-hidden bg-slate-950 lg:block">
          <img
            src="/course_image10.jpg"
            alt="Students learning online"
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
          <div className="absolute bottom-0 left-0 p-10 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#00ECA3]">
              eLearni
            </p>
            <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight">
              Continue learning where you left off.
            </h1>
          </div>
        </div>

        <div className="px-6 py-10 md:px-12 lg:px-16">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#057455]">
              Login
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">Welcome back</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Sign in to access your enrolled courses, lessons, and progress.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  required
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  required
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
                  placeholder="Enter your password"
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
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Signing in..." : "Log in"}
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-600">
              New here?{" "}
              <Link href="/register" className="font-bold text-[#057455] hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPageClient;
