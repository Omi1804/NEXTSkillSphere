"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const quickPrompts = ["Find a course", "Learning path", "Pricing help"];

const LOADER_SIZE = 72;
const LOADER_INSET = 5;
const LOADER_CORNER_RADIUS = 16;
const LOADER_SIDE = LOADER_SIZE - LOADER_INSET * 2;
const LOADER_PATH_LENGTH =
  2 * (LOADER_SIDE + LOADER_SIDE - 4 * LOADER_CORNER_RADIUS) + 2 * Math.PI * LOADER_CORNER_RADIUS;

const ChatAssistantWidget = () => {
  const endRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [draftMessage, setDraftMessage] = useState("");
  const [localMessages, setLocalMessages] = useState<string[]>([]);
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

  useEffect(() => {
    if (isOpen && endRef.current) {
      endRef.current.scrollTo({
        top: endRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [isOpen, localMessages]);

  const panelMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18, scale: 0.96 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 14, scale: 0.96 },
        transition: { type: "spring" as const, stiffness: 360, damping: 28 },
      };

  const handleSend = () => {
    const trimmedMessage = draftMessage.trim();
    if (!trimmedMessage) return;
    setLocalMessages((messages) => [...messages, trimmedMessage]);
    setDraftMessage("");
  };

  const strokeDashoffset = LOADER_PATH_LENGTH * (1 - scrollProgress);

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            {...panelMotion}
            className="z-[1000] w-[min(calc(100vw-2rem),390px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
          >
            <div className="bg-slate-950 p-5 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00ECA3] text-slate-950">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">Skill Sphere Assistant</p>
                    <p className="mt-1 text-xs text-slate-300">Ready to help you choose faster</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Close chat assistant"
                >
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              ref={endRef}
              className="max-h-[420px] space-y-4 !overflow-y-auto bg-[#f6f8fb] p-5"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <div className="max-w-[82%] rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                Hi, I can help you explore courses, compare paths, and continue learning. The chat
                logic is ready for your integration.
              </div>
              <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-[#00ECA3] p-4 text-sm font-semibold leading-6 text-slate-950 shadow-sm">
                I want to find the best course for my goals.
              </div>
              <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                Great. Start with a goal, skill level, or time commitment and I'll guide the flow.
              </div>
              {localMessages.map((message, index) => (
                <div
                  key={`${message}-${index}`}
                  className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-slate-950 p-4 text-sm font-semibold leading-6 text-white shadow-sm"
                >
                  {message}
                </div>
              ))}
              {localMessages.length > 0 && (
                <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-4 text-sm leading-6 text-slate-700 shadow-sm">
                  Nice. The visual chat shell is connected locally; plug your bot endpoint here when
                  the assistant backend is ready.
                </div>
              )}
            </div>

            <div className="border-t border-slate-200 bg-white p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setDraftMessage(prompt)}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-600 transition hover:border-[#00B982] hover:text-[#057455]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                <input
                  type="text"
                  placeholder="Ask about courses..."
                  value={draftMessage}
                  onChange={(event) => setDraftMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                  aria-label="Chat assistant message"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white transition hover:bg-slate-800"
                  aria-label="Send message"
                >
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="group relative flex h-16 w-16 items-center justify-center rounded-[18px] bg-slate-950 text-white shadow-2xl ring-1 ring-white/30 transition hover:-translate-y-1"
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
    </div>
  );
};

export default ChatAssistantWidget;
