"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { ReactNode } from "react";

const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
  useSmoothScroll();

  return <>{children}</>;
};

export default SmoothScrollProvider;
