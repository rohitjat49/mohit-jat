"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";

export default function Intro() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 45,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="intro"
      className="relative overflow-hidden bg-[#f3f0e8] py-32 text-[#151515] md:py-48"
    >
      {/* =========================================
          SUBTLE BACKGROUND DETAIL
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-[15%] h-[360px] w-[360px] rounded-full bg-[#c7a66a]/[0.06] blur-[120px]"
      />

      <div className="container relative z-10">
        {/* =======================================
            MAIN CONTENT
        ======================================= */}

        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          {/* INDEX */}

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[#967746]" />

              <p className="eyebrow !text-black/45">
                01 / Introduction
              </p>
            </div>
          </motion.div>

          {/* TEXT */}

          <div className="md:col-span-9 md:col-start-4">
            {/* Heading */}

            <motion.h2
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.2,
              }}
              className="section-title"
            >
              Science,
              <br />

              <span className="italic text-[#967746]">
                formulation
              </span>
              <br />

              & innovation.
            </motion.h2>

            {/* GOLD LINE */}

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{
                width: shouldReduceMotion
                  ? 48
                  : 72,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="mt-10 h-px bg-[#967746]"
            />

            {/* DESCRIPTION */}

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                delay: 0.12,
              }}
              className="mt-12 max-w-2xl"
            >
              <p className="text-base leading-8 text-black/60 md:text-lg md:leading-8">
                I work at the intersection of
                cosmetic science, formulation,
                research and product development —
                turning ideas into thoughtfully
                developed personal care products.
              </p>

              <p className="mt-6 text-base leading-8 text-black/60 md:text-lg md:leading-8">
                From ingredient research and
                formulation development to stability
                testing, laboratory planning and
                scale-up, I focus on understanding the
                details that make a product work.
              </p>
            </motion.div>

            {/* SMALL SIGNATURE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.25,
              }}
              className="mt-12 flex items-center gap-4"
            >
              <span className="font-display text-2xl italic text-black/70">
                Mohit Jat
              </span>

              <span className="h-px w-10 bg-black/15" />

              <span className="text-[10px] uppercase tracking-[0.18em] text-black/35">
                Cosmetic Science
              </span>
            </motion.div>
          </div>
        </div>

        {/* =======================================
            BOTTOM DISCIPLINE BAR
        ======================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="mt-24 border-t border-black/15 pt-6 md:mt-32"
        >
          <div className="grid gap-5 text-[10px] uppercase tracking-[0.16em] text-black/40 md:grid-cols-3 md:gap-8">
            <div className="flex items-center justify-between gap-4 md:justify-start">
              <span>Cosmetic Science</span>

              <span className="h-px w-6 bg-black/15 md:hidden" />
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-start">
              <span>Research & Development</span>

              <span className="h-px w-6 bg-black/15 md:hidden" />
            </div>

            <div className="flex items-center justify-between gap-4 md:justify-start">
              <span>Product Innovation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}