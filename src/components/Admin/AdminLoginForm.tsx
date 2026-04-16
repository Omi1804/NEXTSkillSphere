"use client";

import { getApiErrorMessage, getClientErrorMessage } from "@/errors/clientError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

const AdminLoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/v1/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(getApiErrorMessage(data, "Unable to login"));
      }

      router.refresh();
      router.replace("/admin/dashboard");
    } catch (err) {
      setError(getClientErrorMessage(err, "Something went wrong"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="grid min-h-screen bg-slate-950 px-4 py-10 text-white md:px-10 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden items-end overflow-hidden rounded-2xl bg-white/5 p-10 lg:flex">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#00ECA3]">
            eLearni Admin
          </p>
          <h1 className="mt-5 max-w-xl text-5xl font-bold leading-tight">
            Manage courses, lessons, and assets from one calm dashboard.
          </h1>
          <Link href="/" className="mt-8 inline-flex text-sm font-bold text-[#00ECA3]">
            Back to website
          </Link>
        </div>
      </section>

      <section className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 text-slate-950 shadow-2xl md:p-8"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#057455]">Login</p>
          <h2 className="mt-3 text-3xl font-bold">Admin access</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use an account with the ADMIN role to enter the course management area.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-[#00B982] focus:bg-white focus:ring-4 focus:ring-[#00ECA3]/15"
              />
            </div>
          </div>

          {error && (
            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Enter dashboard"}
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>
      </section>
    </main>
  );
};

export default AdminLoginForm;
