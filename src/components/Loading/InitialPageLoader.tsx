"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import SkillSphereLoader from "./SkillSphereLoader";

const INITIAL_LOADER_STORAGE_KEY = "elearni-initial-loader-shown";
const LEGACY_INITIAL_LOADER_STORAGE_KEY = "skill-sphere-initial-loader-shown";
const LOADER_DURATION_MS = 1000 * 2;

export default function InitialPageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let hideDelay = LOADER_DURATION_MS;

    try {
      const hasSeenLoader =
        window.sessionStorage.getItem(INITIAL_LOADER_STORAGE_KEY) ||
        window.sessionStorage.getItem(LEGACY_INITIAL_LOADER_STORAGE_KEY);

      if (hasSeenLoader) {
        hideDelay = 0;
      } else {
        window.sessionStorage.setItem(INITIAL_LOADER_STORAGE_KEY, "true");
      }
    } catch {
      hideDelay = LOADER_DURATION_MS;
    }

    const hideTimer = window.setTimeout(
      () => {
        setIsVisible(false);
      },
      shouldReduceMotion ? 250 : hideDelay,
    );

    return () => window.clearTimeout(hideTimer);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!isVisible) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[1200]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: "easeOut" }}
          aria-live="polite"
          aria-label="eLearni is loading"
        >
          <SkillSphereLoader progressTarget={100} durationMs={1950} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
