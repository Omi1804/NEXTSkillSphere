"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

type HomeMotionSectionProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

const HomeMotionSection = ({ children, delay = 0, className = "" }: HomeMotionSectionProps) => {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <section className={className}>{children}</section>;
  }

  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 44, scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.18, margin: "0px 0px -8% 0px" }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 24,
        mass: 0.9,
        delay,
      }}
    >
      {children}
    </motion.section>
  );
};

export default HomeMotionSection;
