"use client";

import { useEffect, useMemo, useState } from "react";

type SkillSphereLoaderProps = {
  title?: string;
  message?: string;
  progressLabel?: string;
  progressValue?: string;
  progressTarget?: number;
  durationMs?: number;
  autoAnimate?: boolean;
  stages?: string[];
};

const DEFAULT_STAGES = ["Syncing", "Curating", "Personalizing", "Finalizing"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const parseProgressFromLabel = (progressValue?: string) => {
  if (!progressValue) {
    return undefined;
  }

  const parsed = Number.parseInt(progressValue.replace("%", "").trim(), 10);
  return Number.isNaN(parsed) ? undefined : clamp(parsed, 0, 100);
};

export default function SkillSphereLoader({
  title = "Preparing your learning journey...",
  message = "Tailoring a vibrant Skill Sphere experience just for you.",
  progressLabel = "Optimizing",
  progressValue = "75%",
  progressTarget,
  durationMs = 2200,
  autoAnimate = true,
  stages = DEFAULT_STAGES,
}: SkillSphereLoaderProps) {
  const derivedTarget = useMemo(() => {
    if (typeof progressTarget === "number") {
      return clamp(Math.round(progressTarget), 0, 100);
    }
    return parseProgressFromLabel(progressValue) ?? 75;
  }, [progressTarget, progressValue]);

  const [animatedProgress, setAnimatedProgress] = useState(10);

  useEffect(() => {
    if (!autoAnimate) {
      return;
    }

    const start = performance.now();
    let frameId = 0;
    const startValue = 10;

    const animate = (now: number) => {
      const elapsed = now - start;
      const t = clamp(elapsed / durationMs, 0, 1);
      // Ease-out for a smooth finish and less robotic motion.
      const eased = 1 - Math.pow(1 - t, 3);
      const next = Math.round(startValue + (derivedTarget - startValue) * eased);
      setAnimatedProgress(next);

      if (t < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [autoAnimate, derivedTarget, durationMs]);

  const progress = autoAnimate ? animatedProgress : derivedTarget;
  const stagePool = stages.length > 0 ? stages : DEFAULT_STAGES;
  const stageIndex = Math.min(
    stagePool.length - 1,
    Math.floor((progress / 100) * stagePool.length),
  );
  const currentLabel = autoAnimate ? stagePool[stageIndex] : progressLabel;
  const currentValue = autoAnimate ? `${progress}%` : progressValue;

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] px-6 text-center text-[#003628]">
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(0,105,68,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,105,68,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />

      <main className="relative z-10 flex w-full max-w-lg flex-col items-center">
        <div className="group relative mb-10">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#00eda6] to-[#4757f1] opacity-20 blur-2xl transition-transform duration-700 group-hover:scale-110" />
          <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_24px_70px_rgba(0,54,40,0.18)] md:h-40 md:w-40">
            <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(0,237,166,0.14),transparent_45%,rgba(71,87,241,0.14))]" />
            <div className="absolute h-[150%] w-[150%] animate-spin rounded-[30%] border border-[#00eda6]/20 [animation-duration:10s]" />
            <div className="absolute left-5 top-5 h-2 w-2 rotate-45 bg-[#4757f1]/50" />
            <div className="absolute bottom-6 right-6 h-3 w-3 rotate-45 bg-[#00eda6]/70" />
            <div className="absolute -bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rotate-45 border border-[#00eda6]/20" />
            <span
              className="material-symbols-outlined relative animate-pulse bg-gradient-to-br from-[#006944] to-[#4757f1] bg-clip-text !text-7xl text-transparent md:!text-8xl"
              style={{ fontVariationSettings: "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 48" }}
              aria-hidden="true"
            >
              school
            </span>
          </div>
        </div>

        <div className="mb-9 space-y-3">
          <h1
            className="text-2xl font-extrabold tracking-normal text-[#003628] md:text-3xl"
            style={{ fontFamily: "var(--font-poppins)" }}
          >
            {title}
          </h1>
          <p className="mx-auto max-w-xs font-[var(--font-roboto)] text-sm leading-6 text-[#316553] md:text-base">
            {message}
          </p>
        </div>

        <div className="w-full max-w-xs space-y-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#b3f6dc]">
            <div
              className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-[#006944] via-[#00eda6] to-[#4757f1] shadow-[0_0_18px_rgba(0,105,68,0.24)] transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-y-0 right-0 w-10 animate-pulse bg-white/40 blur-[1px]" />
              <div className="absolute inset-0 animate-pulse bg-white/35" />
            </div>
          </div>
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#4d816e]">
              {currentLabel}
            </span>
            <span className="text-xs font-bold text-[#006944]">{currentValue}</span>
          </div>
        </div>
      </main>

      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4d816e]/70">
          High Performance Learning
        </p>
      </div>
    </div>
  );
}
