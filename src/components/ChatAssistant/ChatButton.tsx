import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const LOADER_SIZE = 64;
const LOADER_INSET = 5;
const LOADER_CORNER_RADIUS = 16;
const LOADER_SIDE = LOADER_SIZE - LOADER_INSET * 2;
const LOADER_PATH_LENGTH =
  2 * (LOADER_SIDE + LOADER_SIDE - 4 * LOADER_CORNER_RADIUS) + 2 * Math.PI * LOADER_CORNER_RADIUS;

const ChatButton = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: any }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let rafId: number | null = null;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
      rafId = null;
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  const strokeDashoffset = LOADER_PATH_LENGTH * (1 - scrollProgress);

  return (
    <motion.button
      type="button"
      onClick={() => setIsOpen((current: boolean) => !current)}
      className="group relative flex h-14 w-14 items-center justify-center rounded-[18px] bg-slate-950 text-white shadow-2xl ring-1 ring-white/30 transition hover:-translate-y-1"
      aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
    >
      <svg
        width={LOADER_SIZE}
        height={LOADER_SIZE}
        viewBox={`0 0 ${LOADER_SIZE} ${LOADER_SIZE}`}
        className="pointer-events-none absolute -inset-1"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="scroll-ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00ECA3" />
            <stop offset="100%" stopColor="#6a7df1" />
          </linearGradient>
        </defs>

        <rect
          x={LOADER_INSET}
          y={LOADER_INSET}
          width={LOADER_SIDE}
          height={LOADER_SIDE}
          rx={LOADER_CORNER_RADIUS}
          fill="none"
          stroke="white"
          strokeOpacity={0.08}
          strokeWidth={2.5}
        />

        <rect
          x={LOADER_INSET}
          y={LOADER_INSET}
          width={LOADER_SIDE}
          height={LOADER_SIDE}
          rx={LOADER_CORNER_RADIUS}
          fill="none"
          stroke="url(#scroll-ring-gradient)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeDasharray={LOADER_PATH_LENGTH}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>

      <span className="material-symbols-outlined !text-3xl">
        {isOpen ? "forum" : "support_agent"}
      </span>

      {!isOpen && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#00ECA3] text-[10px] font-black text-slate-950 shadow">
          AI
        </span>
      )}
    </motion.button>
  );
};

export default ChatButton;
