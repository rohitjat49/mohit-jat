"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const journey = [
  {
    year: "2021 — 2025",
    number: "01",
    title: "Pharmacy & Scientific Foundation",
    company: "Education",
    description:
      "Building a strong foundation in pharmaceutical sciences, formulation principles, laboratory practices and scientific thinking.",
  },
  {
    year: "Early Career",
    number: "02",
    title: "Pharmacy Internship",
    company: "Hind Pharma",
    description:
      "Gaining practical exposure to pharmaceutical workflows, quality-oriented processes and professional laboratory environments.",
  },
  {
    year: "Professional Experience",
    number: "03",
    title: "Research & Quality Assurance",
    company: "Havintha",
    description:
      "Working across research and quality-focused responsibilities while developing a deeper understanding of product and process requirements.",
  },
  {
    year: "Current",
    number: "04",
    title: "Cosmetic Research & Product Development",
    company: "Cosmetic Science",
    description:
      "Working around cosmetic formulation, ingredient research, laboratory development, product performance and innovation.",
  },
];

export default function Journey() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#0a0a0a] py-32 text-white md:py-48"
    >
      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-180px] top-[28%] h-[520px] w-[520px] rounded-full bg-[#c7a66a]/[0.035] blur-[150px]"
      />

      <div className="container relative z-10">
        {/* =========================================
            HEADER
        ========================================= */}

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
                05 / Journey
              </p>
            </div>
          </motion.div>

          <div className="md:col-span-9 md:col-start-4">
            <motion.h2
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 60,
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
              className="section-title"
            >
              The path
              <br />

              <span className="italic text-[#c7a66a]">
                so far.
              </span>
            </motion.h2>

            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{
                width: 64,
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.12,
              }}
              className="mt-10 h-px bg-[#c7a66a]"
            />

            <motion.p
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
              }}
              transition={{
                duration: 0.8,
                delay: 0.18,
              }}
              className="mt-10 max-w-xl text-base leading-8 text-white/45 md:text-lg"
            >
              A journey shaped by education, research,
              experimentation and a continuous curiosity
              to understand how better products are created.
            </motion.p>
          </div>
        </div>

        {/* =========================================
            TIMELINE
        ========================================= */}

        <div className="relative mt-24 md:mt-32">
          {/* Main timeline */}

          <motion.div
            initial={{
              scaleY: shouldReduceMotion ? 1 : 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: true,
              amount: 0.1,
            }}
            transition={{
              duration: 1.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            className="absolute left-[11px] top-0 h-full w-px bg-gradient-to-b from-[#c7a66a]/60 via-white/10 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-20 md:space-y-0">
            {journey.map((item, index) => {
              const isRight = index % 2 !== 0;

              return (
                <motion.div
                  key={item.number}
                  initial={{
                    opacity: 0,
                    y: shouldReduceMotion ? 0 : 60,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.18,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: shouldReduceMotion
                      ? 0
                      : index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="relative md:grid md:min-h-[350px] md:grid-cols-2"
                >
                  {/* =================================
                      TIMELINE NODE
                  ================================= */}

                  <div className="absolute left-[-1px] top-0 z-20 flex h-7 w-7 items-center justify-center rounded-full border border-[#c7a66a]/30 bg-[#0a0a0a] md:left-1/2 md:-translate-x-1/2">
                    <motion.div
                      initial={{
                        scale: 0,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.5,
                        delay: shouldReduceMotion
                          ? 0
                          : 0.2 + index * 0.1,
                      }}
                      className="h-2.5 w-2.5 rounded-full bg-[#c7a66a] shadow-[0_0_18px_rgba(199,166,106,0.5)]"
                    />
                  </div>

                  {/* =================================
                      CONTENT
                  ================================= */}

                  <div
                    className={`pl-14 md:pl-0 ${
                      isRight
                        ? "md:col-start-2 md:pl-20"
                        : "md:col-start-1 md:pr-20"
                    }`}
                  >
                    <div className="group relative">
                      {/* Year / Company */}

                      <div className="mb-5 flex flex-wrap items-center gap-3 md:mb-6">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-[#c7a66a] md:text-xs">
                          {item.year}
                        </span>

                        <span className="h-px w-6 bg-white/15" />

                        <span className="text-[9px] uppercase tracking-[0.18em] text-white/30 md:text-[10px]">
                          {item.company}
                        </span>
                      </div>

                      {/* Large number */}

                      <p className="pointer-events-none font-display text-[5rem] leading-none tracking-[-0.06em] text-white/[0.045] transition-colors duration-500 group-hover:text-[#c7a66a]/[0.09] md:text-[7rem]">
                        {item.number}
                      </p>

                      {/* Title */}

                      <h3 className="relative mt-[-22px] max-w-xl font-display text-3xl leading-[1.08] tracking-[-0.02em] text-white/85 transition-colors duration-500 group-hover:text-white md:mt-[-30px] md:text-5xl">
                        {item.title}
                      </h3>

                      {/* Description */}

                      <p className="mt-6 max-w-lg text-sm leading-7 text-white/40 transition-colors duration-500 group-hover:text-white/50 md:text-[15px]">
                        {item.description}
                      </p>

                      {/* Explore */}

                      <div className="mt-7 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.17em] text-white/25 transition-colors duration-300 group-hover:text-[#c7a66a]">
                        <span>Explore</span>

                        <span className="h-px w-5 bg-white/15 transition-all duration-500 group-hover:w-9 group-hover:bg-[#c7a66a]" />

                        <ArrowUpRight
                          size={14}
                          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>

                      {/* Desktop hover line */}

                      <div
                        className={`pointer-events-none absolute top-[4px] hidden h-px w-16 bg-[#c7a66a]/40 opacity-0 transition-all duration-500 group-hover:opacity-100 md:block ${
                          isRight
                            ? "right-full mr-5"
                            : "left-full ml-5"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* =========================================
            CLOSING STATEMENT
        ========================================= */}

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
            duration: 1,
          }}
          className="mt-24 border-t border-white/10 pt-10 md:mt-20 md:pt-14"
        >
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-2">
              <p className="eyebrow">
                Philosophy
              </p>
            </div>

            <div className="md:col-span-9 md:col-start-4">
              <p className="max-w-4xl font-display text-2xl leading-relaxed text-white/55 md:text-4xl">
                “The journey is less about reaching a
                destination and more about continuously
                learning, experimenting and building.”
              </p>

              <div className="mt-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#c7a66a]" />

                <span className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                  Mohit Jat
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30px] right-0 select-none"
      >
        <span className="font-display text-[18vw] leading-none tracking-[-0.06em] text-white/[0.025]">
          JOURNEY
        </span>
      </div>
    </section>
  );
}