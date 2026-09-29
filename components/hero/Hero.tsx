"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import dynamic from "next/dynamic";

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene"),
  {
    ssr: false,
  }
);

const titleTransition = {
  duration: 1.15,
    ease: [0.16, 1, 0.3, 1] as const,
};

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToIntro = () => {
    document
      .querySelector("#intro")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const reveal = (
    delay = 0,
    distance = 30
  ) => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
      };
    }

    return {
      initial: {
        opacity: 0,
        y: distance,
      },
      animate: {
        opacity: 1,
        y: 0,
      },
      transition: {
        duration: 0.85,
        delay,
          ease: [0.16, 1, 0.3, 1] as const,
      },
    };
  };

  return (
    <section className="relative flex min-h-screen overflow-hidden bg-[#0a0a0a] text-white">
      {/* =========================================
          3D BACKGROUND
      ========================================= */}

      <div className="absolute inset-0">
        <HeroScene />
      </div>

      {/* =========================================
          AMBIENT LIGHT
      ========================================= */}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c7a66a]/10 blur-[140px] md:h-[620px] md:w-[620px]"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.45, 0.7, 0.45],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* =========================================
          EDITORIAL GRID
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
      >
        <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-white" />
      </div>

      {/* Subtle top gradient */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/30 to-transparent"
      />

      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="container relative z-10 flex min-h-screen flex-col justify-center pt-28 pb-20 md:pt-32">
        {/* =======================================
            EYEBROW
        ======================================= */}

        <motion.div
          {...reveal(0.1, 20)}
          className="mb-10 md:mb-12"
        >
          <div className="flex items-center gap-4">
            <motion.span
              className="h-px bg-[#c7a66a]"
              initial={{
                width: 0,
              }}
              animate={{
                width: shouldReduceMotion
                  ? 40
                  : 40,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                  ease: [0.16, 1, 0.3, 1] as const,
              }}
            />

            <p className="eyebrow text-white/45">
              Mohit Jat
            </p>
          </div>
        </motion.div>

        {/* =======================================
            MAIN TITLE
        ======================================= */}

        <div className="max-w-[1250px]">
          {/* COSMETIC */}

          <div className="overflow-hidden">
            <motion.h1
              initial={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: "110%" }
              }
              animate={{ y: 0 }}
              transition={{
                ...titleTransition,
                delay: 0.15,
              }}
              className="font-display text-[clamp(3.7rem,9vw,9.5rem)] leading-[0.82] tracking-[-0.055em]"
            >
              Cosmetic
            </motion.h1>
          </div>

          {/* SCIENCE */}

          <div className="overflow-hidden">
            <motion.h1
              initial={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: "110%" }
              }
              animate={{ y: 0 }}
              transition={{
                ...titleTransition,
                delay: 0.23,
              }}
              className="font-display ml-[4vw] text-[clamp(3.7rem,9vw,9.5rem)] leading-[0.82] tracking-[-0.055em] italic text-[#c7a66a]"
            >
              Science
              <span className="not-italic text-white">
                .
              </span>
            </motion.h1>
          </div>

          {/* MEETS */}

          <div className="overflow-hidden">
            <motion.h1
              initial={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: "110%" }
              }
              animate={{ y: 0 }}
              transition={{
                ...titleTransition,
                delay: 0.31,
              }}
              className="font-display text-[clamp(3.7rem,9vw,9.5rem)] leading-[0.82] tracking-[-0.055em]"
            >
              Meets
            </motion.h1>
          </div>

          {/* INNOVATION */}

          <div className="overflow-hidden">
            <motion.h1
              initial={
                shouldReduceMotion
                  ? { y: 0 }
                  : { y: "110%" }
              }
              animate={{ y: 0 }}
              transition={{
                ...titleTransition,
                delay: 0.39,
              }}
              className="font-display ml-[9vw] text-[clamp(3.7rem,9vw,9.5rem)] leading-[0.82] tracking-[-0.055em]"
            >
              Innovation
              <span className="text-[#c7a66a]">
                .
              </span>
            </motion.h1>
          </div>
        </div>

        {/* =======================================
            BOTTOM CONTENT
        ======================================= */}

        <div className="mt-14 grid gap-10 md:mt-20 md:grid-cols-12 md:items-end">
          <motion.div
            {...reveal(0.7, 35)}
            className="md:col-span-5 md:col-start-7"
          >
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7a66a] md:text-xs">
              Formulation · Research · Product
              Development
            </p>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/50 md:text-lg md:leading-8">
              Turning scientific ideas into
              thoughtfully developed personal care
              products through research, formulation
              and innovation.
            </p>

            <button
              onClick={scrollToIntro}
              className="group mt-8 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-[10px] uppercase tracking-[0.2em] text-white/70 transition-all duration-300 hover:border-[#c7a66a] hover:text-white md:text-xs"
            >
              Explore my work

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>

        {/* =======================================
            SCROLL INDICATOR
        ======================================= */}

        <motion.button
          {...reveal(1.15, 10)}
          onClick={scrollToIntro}
          className="absolute bottom-8 left-6 hidden items-center gap-3 text-white/35 transition-colors duration-300 hover:text-white/65 md:flex"
        >
          <span className="eyebrow">
            Scroll to explore
          </span>

          <motion.span
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, 6, 0],
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          >
            <ArrowDown size={16} />
          </motion.span>
        </motion.button>

        {/* =======================================
            IDENTITY
        ======================================= */}

        <motion.div
          {...reveal(1.05, 10)}
          className="absolute bottom-8 right-6 hidden text-right md:block"
        >
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/25">
            Research · Development · Innovation
          </p>

          <p className="mt-2 text-xs text-white/40">
            India
          </p>
        </motion.div>

        {/* =======================================
            MOBILE BOTTOM MARK
        ======================================= */}

        <motion.div
          {...reveal(0.95, 15)}
          className="mt-14 flex items-center gap-3 md:hidden"
        >
          <span className="h-px w-8 bg-[#c7a66a]/60" />

          <span className="text-[9px] uppercase tracking-[0.18em] text-white/30">
            Research · Development · Innovation
          </span>
        </motion.div>
      </div>
    </section>
  );
}