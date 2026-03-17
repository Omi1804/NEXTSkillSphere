"use client";

import { motion } from "framer-motion";

type ProfileClientProps = {
  name: string;
  email: string;
  accountTag: string;
  enrolledCount: number;
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 320, damping: 28, delay },
});

const StatCard = ({
  title,
  value,
  icon,
  delay,
  accent,
}: {
  title: string;
  value: string | number;
  icon: string;
  delay: number;
  accent: "green" | "indigo" | "mixed";
}) => {
  const gradients = {
    green: "from-[#00eda4]/20 to-[#00eda4]/5",
    indigo: "from-[#6a7df1]/20 to-[#6a7df1]/5",
    mixed: "from-[#00eda4]/15 to-[#6a7df1]/15",
  };
  const iconColors = {
    green: "#00c98a",
    indigo: "#6a7df1",
    mixed: "#5b6de0",
  };

  return (
    <motion.div
      className={`flex-1 min-w-[170px] relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradients[accent]} border border-white shadow-sm p-6 cursor-default`}
      {...fadeUp(delay)}
      whileHover={{ y: -4, boxShadow: "0 16px 40px rgba(106,125,241,0.12)" }}
      transition={{ type: "spring", stiffness: 340, damping: 22 }}
    >
      {/* Corner decoration */}
      <div
        className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"
        style={{
          background:
            accent === "green"
              ? "radial-gradient(circle, #00eda4, transparent)"
              : accent === "indigo"
                ? "radial-gradient(circle, #6a7df1, transparent)"
                : "radial-gradient(circle, #6a7df1, #00eda4, transparent)",
        }}
      />
      <span
        className="material-symbols-outlined text-2xl mb-3 block"
        style={{ color: iconColors[accent] }}
      >
        {icon}
      </span>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 font-body">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-800 mt-1 font-body">{value}</p>
    </motion.div>
  );
};

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
    className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
    {...fadeUp(delay)}
    transition={{ type: "spring", stiffness: 340, damping: 22 }}
  >
    <div
      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
      style={{ background: "linear-gradient(135deg, #00eda4, #6a7df1)" }}
    >
      <span className="material-symbols-outlined text-white text-base">{icon}</span>
    </div>
    <div className="flex-1 min-w-0 border-b border-gray-100 pb-3">
      <span className="text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold block mb-0.5">
        {label}
      </span>
      <span className="text-base text-gray-800 font-body font-medium truncate block">{value}</span>
    </div>
  </motion.div>
);

export function ProfileClient({ name, email, accountTag, enrolledCount }: ProfileClientProps) {
  const initial = name[0]?.toUpperCase() ?? "U";

  return (
    <section className="min-h-[80vh] py-14 px-4 sm:px-8 lg:px-16 bg-[#f7f8fc]">
      {/* Ambient background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
          style={{
            background: "radial-gradient(circle, #00eda4, transparent)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-3xl"
          style={{
            background: "radial-gradient(circle, #6a7df1, transparent)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* ── Hero Card ── */}
        <motion.div
          className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-white"
          //   {...fadeUp(0)}
        >
          {/* Gradient slash banner */}
          <div
            className="h-28 w-full"
            style={{
              background: "linear-gradient(105deg, #00eda4 0%, #6a7df1 100%)",
            }}
          />
          {/* Diagonal cut overlay */}
          <div
            className="absolute top-0 left-0 right-0 h-28"
            style={{
              background:
                "linear-gradient(105deg, rgba(0,237,164,0.9) 0%, rgba(106,125,241,0.9) 60%, transparent 100%)",
            }}
          />
          {/* Dot pattern overlay */}
          <div
            className="absolute top-0 left-0 right-0 h-28 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

          <div className="px-8 pb-8">
            {/* Avatar — overlaps the banner */}
            <div className="relative -mt-12 mb-4 flex items-end justify-between">
              <motion.div
                className="relative"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 22,
                  delay: 0.15,
                }}
              >
                {/* Gradient ring */}
                <div
                  className="w-24 h-24 rounded-3xl p-[3px] shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #00eda4, #6a7df1)",
                  }}
                >
                  <div
                    className="w-full h-full rounded-[calc(1.5rem-3px)] bg-white flex items-center justify-center text-4xl font-bold"
                    style={{
                      background: "linear-gradient(135deg, #00eda4, #6a7df1)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {initial}
                  </div>
                </div>
                {/* Online dot */}
                <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-[#00eda4] border-2 border-white shadow" />
              </motion.div>

              {/* Edit profile pill */}
              <motion.button
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium border border-gray-200 text-gray-600 hover:border-[#6a7df1]/40 hover:text-[#6a7df1] transition-all duration-200 bg-white shadow-sm"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="material-symbols-outlined text-base">edit</span>
                Edit Profile
              </motion.button>
            </div>

            <motion.div
              {...fadeUp(0.2)}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-semibold mb-1">
                Member
              </p>
              <h1 className="text-3xl font-bold text-gray-900 font-body leading-tight">{name}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <span className="flex items-center gap-1 text-sm text-gray-500 font-body">
                  <span className="material-symbols-outlined text-base text-gray-400">mail</span>
                  {email}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <div className="flex flex-wrap gap-4">
          <StatCard
            title="Courses Enrolled"
            value={enrolledCount}
            icon="school"
            delay={0.25}
            accent="green"
          />

          <StatCard title="Account Tag" value={accountTag} icon="tag" delay={0.39} accent="mixed" />
        </div>

        {/* ── Account Overview ── */}
        <motion.div
          className="bg-white rounded-3xl border border-white shadow-lg overflow-hidden"
          {...fadeUp(0.45)}
          transition={{ type: "spring", stiffness: 340, damping: 22 }}
        >
          {/* Section header */}
          <div className="px-8 pt-7 pb-4 flex items-center gap-3 border-b border-gray-100">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #00eda4, #6a7df1)",
              }}
            >
              <span className="material-symbols-outlined text-white text-base">
                manage_accounts
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-800 font-body">Account Overview</h2>
            {/* Gradient accent line */}
            <motion.div
              className="flex-1 h-px ml-2"
              style={{
                background: "linear-gradient(90deg, #00eda4, #6a7df1, transparent)",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            />
          </div>

          <div className="px-4 py-4 grid md:grid-cols-2 gap-1">
            <DetailRow label="Full Name" value={name} icon="person" delay={0.5} />

            <DetailRow label="Email Address" value={email} icon="mail" delay={0.6} />
            <DetailRow
              label="Courses Enrolled"
              value={`${enrolledCount} course${enrolledCount !== 1 ? "s" : ""}`}
              icon="school"
              delay={0.65}
            />
            <DetailRow label="Account Tag" value={accountTag} icon="tag" delay={0.7} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
