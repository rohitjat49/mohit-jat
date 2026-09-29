"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";

const focusAreas = [
  "Cosmetic Science",
  "Formulation Development",
  "Research & Innovation",
  "Product Development",
];

const stats = [
  {
    number: "01",
    label: "Scientific Approach",
  },
  {
    number: "02",
    label: "Research Driven",
  },
  {
    number: "03",
    label: "Product Focused",
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0a0a0a] py-32 text-white md:py-48"
    >
      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[20%] h-[420px] w-[420px] rounded-full bg-[#c7a66a]/[0.035] blur-[140px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[10%] right-[-180px] h-[500px] w-[500px] rounded-full bg-[#c7a66a]/[0.04] blur-[160px]"
      />

      <div className="container relative z-10">
        {/* =======================================
            HEADER
        ======================================= */}

        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
            }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[#c7a66a]" />

              <p className="eyebrow">
                03 / About
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 55,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-9 md:col-start-4"
          >
            <h2 className="section-title">
              Science with
              <br />

              <span className="italic text-[#c7a66a]">
                purpose.
              </span>
            </h2>

            <div className="mt-10 h-px w-16 bg-[#c7a66a]" />
          </motion.div>
        </div>

        {/* =======================================
            MAIN CONTENT
        ======================================= */}

        <div className="mt-24 grid gap-16 md:mt-32 md:grid-cols-12 md:items-start md:gap-10">
          {/* =====================================
              VISUAL
          ===================================== */}

          <motion.div
            initial={{
              opacity: 0,
              scale: shouldReduceMotion ? 1 : 0.94,
              y: shouldReduceMotion ? 0 : 30,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-5"
          >
            <div className="group relative aspect-[4/5] overflow-hidden bg-[#111111]">
              {/* Grid */}

              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.055]"
              >
                <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
                <div className="absolute left-3/4 top-0 h-full w-px bg-white" />

                <div className="absolute left-0 top-1/4 h-px w-full bg-white" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-white" />
                <div className="absolute left-0 top-3/4 h-px w-full bg-white" />
              </div>

              {/* Corner marks */}

              <div className="absolute left-5 top-5 z-30 h-5 w-5 border-l border-t border-[#c7a66a]/40" />

              <div className="absolute right-5 top-5 z-30 h-5 w-5 border-r border-t border-[#c7a66a]/40" />

              <div className="absolute bottom-5 left-5 z-30 h-5 w-5 border-b border-l border-[#c7a66a]/40" />

              <div className="absolute bottom-5 right-5 z-30 h-5 w-5 border-b border-r border-[#c7a66a]/40" />

              {/* Inner border */}

              <div className="absolute inset-6 z-20 border border-white/[0.08] md:inset-7" />

              {/* =================================
                  CENTRAL ORBIT
              ================================= */}

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : {
                          rotate: 360,
                        }
                  }
                  transition={{
                    duration: 32,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="relative h-56 w-56 rounded-full border border-[#c7a66a]/20 md:h-72 md:w-72"
                >
                  {/* Orbit point */}

                  <div className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 rounded-full bg-[#c7a66a] shadow-[0_0_18px_rgba(199,166,106,0.55)]" />

                  {/* Inner orbit */}

                  <div className="absolute inset-8 rounded-full border border-white/[0.08]" />

                  {/* Glow */}

                  <div className="absolute inset-[25%] rounded-full bg-[#c7a66a]/10 blur-2xl" />

                  {/* Second orbit */}

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            rotate: -360,
                          }
                    }
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[18%] rounded-full border border-dashed border-white/[0.07]"
                  />
                </motion.div>

                {/* Center identity */}

                <div className="absolute text-center">
                  <span className="font-display text-[5.5rem] leading-none text-white/[0.08] md:text-[8rem]">
                    MJ
                  </span>

                  <p className="eyebrow mt-2">
                    Cosmetic Science
                  </p>
                </div>
              </div>

              {/* =================================
                  TOP META
              ================================= */}

              <div className="absolute left-7 top-7 z-30">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/25">
                  03
                </p>

                <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-white/20">
                  Scientific Practice
                </p>
              </div>

              {/* =================================
                  BOTTOM LABEL
              ================================= */}

              <div className="absolute bottom-7 left-7 z-30">
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Mohit Jat
                </p>

                <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/20">
                  Research · Formulation · Innovation
                </p>
              </div>

              {/* Glow */}

              <motion.div
                aria-hidden="true"
                animate={
                  shouldReduceMotion
                    ? undefined
                    : {
                        opacity: [0.3, 0.55, 0.3],
                        scale: [1, 1.08, 1],
                      }
                }
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#c7a66a]/10 blur-[100px]"
              />
            </div>
          </motion.div>

          {/* =====================================
              TEXT
          ===================================== */}

          <div className="md:col-span-6 md:col-start-7">
            <motion.div
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.85,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="max-w-xl font-display text-2xl leading-[1.35] text-white/75 md:text-4xl">
                I am interested in the space where
                scientific thinking, formulation and
                product innovation come together.
              </p>

              <p className="mt-8 max-w-xl text-base leading-8 text-white/45">
                My work revolves around understanding
                ingredients, developing formulations,
                studying product performance and
                translating research into practical
                personal care products.
              </p>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/45">
                I enjoy exploring the details behind a
                product — from the first laboratory idea
                and ingredient selection to development,
                testing and the final product experience.
              </p>
            </motion.div>

            {/* =====================================
                FOCUS AREAS
            ===================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.8,
                delay: 0.12,
              }}
              className="mt-14 border-t border-white/10"
            >
              <div className="py-6">
                <p className="eyebrow mb-5">
                  Areas of Focus
                </p>

                {focusAreas.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: shouldReduceMotion
                        ? 0
                        : -15,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.06,
                    }}
                    className="group flex items-center justify-between border-b border-white/10 py-4"
                  >
                    <div className="flex items-center gap-5">
                      <span className="text-[10px] tracking-[0.15em] text-white/25">
                        0{index + 1}
                      </span>

                      <span className="font-display text-xl text-white/60 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white md:text-2xl">
                        {item}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={17}
                      className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* =====================================
                CTA
            ===================================== */}

            <motion.a
              href="#contact"
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.3,
              }}
              className="group mt-10 inline-flex items-center gap-3 border-b border-white/20 pb-2 text-[10px] uppercase tracking-[0.2em] text-white/65 transition-colors duration-300 hover:border-[#c7a66a] hover:text-white md:text-xs"
            >
              Let&apos;s connect

              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </motion.a>
          </div>
        </div>

        {/* =======================================
            PHILOSOPHY / STATS
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
          }}
          className="mt-24 border-t border-white/10 pt-8 md:mt-32"
        >
          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.number}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion
                    ? 0
                    : 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.6,
                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.1,
                }}
                className="group border-b border-white/10 pb-7 last:border-b-0 md:border-b-0 md:pb-0"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.16em] text-[#c7a66a]">
                    {stat.number}
                  </span>

                  <Plus
                    size={15}
                    className="text-white/20 transition-all duration-300 group-hover:rotate-90 group-hover:text-[#c7a66a]"
                  />
                </div>

                <p className="mt-10 font-display text-2xl text-white/60 transition-colors duration-300 group-hover:text-white md:text-3xl">
                  {stat.label}
                </p>

                <div className="mt-6 h-px w-0 bg-[#c7a66a] transition-all duration-500 group-hover:w-10" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-25px] left-0 select-none"
      >
        <span className="font-display text-[22vw] leading-none tracking-[-0.06em] text-white/[0.025]">
          ABOUT
        </span>
      </div>
    </section>
  );
}