"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ArticleMotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
     ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ArticleMotion({
  children,
  className = "",
  delay = 0,
}: ArticleMotionProps) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}