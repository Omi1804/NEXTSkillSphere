"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type ProfileClientProps = {
  name: string;
  email: string;
  accountTag: string;
  enrolledCount: number;
  role?: string;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring" as const, stiffness: 320, damping: 28, delay },
});

const StatCard = ({
  title,
  value,
  icon,
  delay,
}: {
  title: string;
  value: string | number;
  icon: string;
  delay: number;
}) => (
  <motion.div
    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition"
    {...fadeUp(delay)}
    whileHover={{ y: -4, boxShadow: "0 18px 45px rgba(15,23,42,0.1)" }}
  >
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{title}</p>
        <p className="mt-2 text-3xl font-bold text-slate-950">{value}</p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ECA3]/15 text-[#057455]">
        <span className="material-symbols-outlined">{icon}</span>
      </div>
    </div>
  </motion.div>
);

const DetailRow = ({
  label,
  value,
  icon,
  delay,
}: {
  label: string;
  value: string;
  icon: string;
  delay: number;
}) => (
  <motion.div
    className="flex items-start gap-4 border-b border-slate-100 py-5 last:border-b-0"
    {...fadeUp(delay)}
  >
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-white">
      <span className="material-symbols-outlined text-lg">{icon}</span>
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 break-words text-base font-semibold text-slate-900">{value}</p>
    </div>
  </motion.div>
);

export function ProfileClient({
  name,
  email,
  accountTag,
  enrolledCount,
  role = "USER",
}: ProfileClientProps) {
  const initial = name[0]?.toUpperCase() ?? "U";
  const isAdmin = role === "ADMIN";

  return (
    <main className="min-h-screen bg-[#f6f8fb]">
      <section className="relative h-[25rem] isolate overflow-hidden bg-slate-950 px-4 py-12 text-white sm:px-8 lg:px-16 mb-8">
        <img
          src="/course_image10.jpg"
          alt="eLearni learning workspace"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45 object-top"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,#020617_0%,rgba(2,6,23,0.52)_38%,rgba(2,6,23,0.55)_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-8 py-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <motion.div {...fadeUp(0)}>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#00ECA3]">Profile</p>
            <div className="mt-6 flex flex-wrap items-end gap-5">
              <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-white/20 bg-white text-5xl font-black text-slate-950 shadow-2xl">
                {initial}
              </div>
              <div className="min-w-0">
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white ring-1 ring-white/15">
                    <span className="material-symbols-outlined text-sm">verified_user</span>
                    {role.toLowerCase()} account
                  </span>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#00ECA3] px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-950">
                      <span className="material-symbols-outlined text-sm">
                        admin_panel_settings
                      </span>
                      Admin access
                    </span>
                  )}
                </div>
                <h1 className="max-w-4xl text-4xl font-black leading-tight md:text-6xl">{name}</h1>
                <p className="mt-3 flex items-center gap-2 text-sm text-slate-200 md:text-base">
                  <span className="material-symbols-outlined text-base text-[#00ECA3]">mail</span>
                  {email}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"
            {...fadeUp(0.12)}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-300">
              Learning pulse
            </p>
            <p className="mt-3 text-4xl font-black">{enrolledCount}</p>
            <p className="mt-1 text-sm text-slate-300">
              enrolled course{enrolledCount !== 1 ? "s" : ""} connected to this account.
            </p>
            <div className="mt-5 flex gap-3">
              <Link
                href="/mycart"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#00ECA3] px-4 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
              >
                My courses
                <span className="material-symbols-outlined text-base">school</span>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                aria-label="Browse courses"
              >
                <span className="material-symbols-outlined text-base">explore</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-14 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-16">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard title="Courses" value={enrolledCount} icon="school" delay={0.16} />
            <StatCard title="Account Tag" value={accountTag} icon="tag" delay={0.22} />
            <StatCard title="Role" value={role} icon="badge" delay={0.28} />
          </div>

          {isAdmin && (
            <motion.div
              className="overflow-hidden rounded-2xl border border-[#00ECA3]/30 bg-slate-950 text-white shadow-xl"
              {...fadeUp(0.34)}
            >
              <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#00ECA3] text-slate-950">
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                  </div>
                  <h2 className="text-2xl font-black">Admin access enabled</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                    This account has admin privileges. You can manage courses, lessons, images, and
                    publishing from the admin dashboard.
                  </p>
                </div>
                <Link
                  href="/admin/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00ECA3] px-5 py-3 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5"
                >
                  Open dashboard
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>
              <div className="h-1 bg-[linear-gradient(90deg,#00ECA3,#6a7df1)]" />
            </motion.div>
          )}

          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
            {...fadeUp(0.4)}
          >
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00ECA3]/15 text-[#057455]">
                <span className="material-symbols-outlined">manage_accounts</span>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#057455]">
                  Account
                </p>
                <h2 className="text-xl font-black text-slate-950">Overview</h2>
              </div>
            </div>

            <div className="mt-4">
              <DetailRow label="Full name" value={name} icon="person" delay={0.48} />
              <DetailRow label="Email address" value={email} icon="mail" delay={0.54} />
              <DetailRow
                label="Courses enrolled"
                value={`${enrolledCount} course${enrolledCount !== 1 ? "s" : ""}`}
                icon="school"
                delay={0.6}
              />
              <DetailRow label="Account tag" value={accountTag} icon="tag" delay={0.66} />
            </div>
          </motion.div>
        </div>

        <aside className="space-y-6">
          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            {...fadeUp(0.44)}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#057455]">
              Next move
            </p>
            <h2 className="mt-3 text-2xl font-black text-slate-950">Keep the momentum going</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Jump back into your enrolled courses or explore the catalog for your next skill path.
            </p>
            <div className="mt-6 grid gap-3">
              <Link
                href="/mycart"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
              >
                Continue learning
                <span className="material-symbols-outlined text-base">play_arrow</span>
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Browse catalog
                <span className="material-symbols-outlined text-base">explore</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            {...fadeUp(0.52)}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <span className="material-symbols-outlined">shield</span>
              </div>
              <div>
                <p className="text-sm font-black text-slate-950">Access level</p>
                <p className="text-xs text-slate-500">
                  {isAdmin ? "Admin and learner permissions" : "Learner permissions"}
                </p>
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-700">
                {isAdmin
                  ? "You can access the learning area and the admin dashboard."
                  : "You can access purchased courses and lesson progress."}
              </p>
            </div>
          </motion.div>
        </aside>
      </section>
    </main>
  );
}
