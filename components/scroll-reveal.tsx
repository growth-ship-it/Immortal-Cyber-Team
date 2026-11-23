"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function ScrollReveal({ children, className, id, delay = 0 }: { children: ReactNode; className?: string; id?: string; delay?: number }) {
  const reducedMotion = useReducedMotion();

  return <motion.div id={id} className={className} data-scroll-reveal
    initial={reducedMotion ? false : { opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: .15, margin: "0px 0px -32px 0px" }}
    transition={{ duration: reducedMotion ? 0 : .7, delay: reducedMotion ? 0 : delay, ease: [.2, .8, .2, 1] }}>
    {children}
  </motion.div>;
}
