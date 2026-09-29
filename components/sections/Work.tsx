"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Formulation Development",
    category: "Cosmetic Science",
    description:
      "Research-driven formulation development focused on ingredient selection, product performance, stability and the final user experience.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    large: true,
  },
  {
    number: "02",
    title: "Laboratory Setup",
    category: "R&D · GMP",
    description:
      "Planning laboratory workflows, equipment requirements and structured research environments.",
    image:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1600&q=85",
    large: false,
  },
  {
    number: "03",
    title: "Ingredient Research",
    category: "Research & Innovation",
    description:
      "Exploring ingredients, functionality, compatibility and their role within cosmetic formulations.",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=85",
    large: false,
  },
  {
    number: "04",
    title: "Scale-Up & Production",
    category: "Product Development",
    description:
      "Connecting laboratory development with pilot batches, production requirements and practical implementation.",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1600&q=85",
    large: true,
  },
];

export default function Work() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-[#f3f0e8] py-32 text-[#151515] md:py-48"
    >
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[20%] h-[420px] w-[420px] rounded-full bg-[#c7a66a]/[0.055] blur-[140px]"
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
              <span className="h-px w-6 bg-[#967746]" />

              <p className="eyebrow !text-black/45">
                04 / Selected Work
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
              Research into
              <br />

              <span className="italic text-[#967746]">
                real products.
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
              className="mt-10 h-px bg-[#967746]"
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
              className="mt-10 max-w-xl text-base leading-8 text-black/55 md:text-lg"
            >
              Exploring the different stages of product
              development — from scientific research
              and formulation to laboratory development
              and scale-up.
            </motion.p>
          </div>
        </div>

        {/* =======================================
            PROJECT GRID
        ======================================= */}

        <div className="mt-24 grid gap-5 md:mt-32 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.number}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 70,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.12,
              }}
              transition={{
                duration: 0.85,
                delay: shouldReduceMotion
                  ? 0
                  : index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden bg-[#111] text-white ${
                project.large
                  ? "min-h-[540px] md:min-h-[650px]"
                  : "min-h-[500px] md:min-h-[560px]"
              }`}
            >
              {/* =================================
                  IMAGE
              ================================= */}

              <div className="absolute inset-0 overflow-hidden">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  initial={{
                    scale: shouldReduceMotion
                      ? 1
                      : 1.08,
                  }}
                  whileInView={{
                    scale: 1,
                  }}
                  viewport={{
                    once: true,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.1,
                        }
                  }
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full w-full object-cover opacity-60"
                />

                {/* Image tone */}

                <div className="absolute inset-0 bg-black/30 transition-opacity duration-700 group-hover:bg-black/20" />

                {/* Bottom gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/5" />

                {/* Subtle gold wash */}

                <div className="absolute inset-0 bg-[#c7a66a]/0 mix-blend-soft-light transition-all duration-700 group-hover:bg-[#c7a66a]/10" />
              </div>

              {/* =================================
                  EDITORIAL GRID
              ================================= */}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.065]"
              >
                <div className="absolute left-1/4 top-0 h-full w-px bg-white" />

                <div className="absolute left-1/2 top-0 h-full w-px bg-white" />

                <div className="absolute left-3/4 top-0 h-full w-px bg-white" />

                <div className="absolute left-0 top-1/2 h-px w-full bg-white" />
              </div>

              {/* =================================
                  TOP NUMBER
              ================================= */}

              <div className="absolute left-7 top-7 z-20">
                <span className="text-[10px] tracking-[0.2em] text-white/55 md:text-xs">
                  {project.number}
                </span>
              </div>

              {/* =================================
                  CATEGORY
              ================================= */}

              <div className="absolute right-7 top-7 z-20 max-w-[55%] text-right">
                <span className="text-[9px] uppercase tracking-[0.18em] text-[#e0bd7c] md:text-[10px]">
                  {project.category}
                </span>
              </div>

              {/* =================================
                  CENTER VISUAL
              ================================= */}

              <motion.div
                initial={{
                  opacity: 0,
                  scale: shouldReduceMotion
                    ? 1
                    : 0.8,
                }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1,
                  delay: shouldReduceMotion
                    ? 0
                    : 0.2 + index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-1/2 top-[42%] z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-white/15 transition-transform duration-700 group-hover:scale-110 md:h-48 md:w-48">
                  {/* Outer ring */}

                  <div className="absolute inset-3 rounded-full border border-white/[0.08]" />

                  {/* Inner ring */}

                  <div className="absolute inset-5 rounded-full border border-[#c7a66a]/25" />

                  {/* Glow */}

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            opacity: [0.2, 0.45, 0.2],
                            scale: [1, 1.08, 1],
                          }
                    }
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute h-20 w-20 rounded-full bg-[#c7a66a]/20 blur-[50px]"
                  />

                  {/* Center */}

                  <div className="relative h-2.5 w-2.5 rounded-full bg-[#c7a66a] shadow-[0_0_25px_rgba(199,166,106,0.75)]" />

                  {/* Orbit */}

                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? undefined
                        : {
                            rotate: 360,
                          }
                    }
                    transition={{
                      duration: 14,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-[-10px]"
                  >
                    <span className="absolute left-1/2 top-[-3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/75" />
                  </motion.div>
                </div>
              </motion.div>

              {/* =================================
                  BOTTOM CONTENT
              ================================= */}

              <div className="absolute inset-x-7 bottom-7 z-30">
                <div className="flex items-end justify-between gap-5">
                  <div className="max-w-xl">
                    <h3 className="font-display text-3xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                      {project.title}
                    </h3>

                    <p className="mt-4 max-w-lg text-sm leading-7 text-white/55 md:text-[15px]">
                      {project.description}
                    </p>
                  </div>

                  {/* Arrow */}

                  <motion.div
                    animate={{
                      y: 0,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -6,
                          }
                    }
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/20 backdrop-blur-md transition-all duration-500 group-hover:border-[#c7a66a] group-hover:bg-[#c7a66a] group-hover:text-[#111] md:h-12 md:w-12"
                  >
                    <ArrowUpRight
                      size={19}
                      className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </motion.div>
                </div>

                {/* Case study */}

                <div className="mt-7 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/40 transition-colors duration-300 group-hover:text-[#c7a66a] md:text-[10px]">
                  <span>View case study</span>

                  <span className="h-px w-8 bg-white/25 transition-all duration-500 group-hover:w-14 group-hover:bg-[#c7a66a]" />
                </div>
              </div>

              {/* =================================
                  HOVER FRAME
              ================================= */}

              <div className="pointer-events-none absolute inset-0 border border-transparent transition-all duration-500 group-hover:border-[#c7a66a]/40" />

              {/* Corner accents */}

              <div className="pointer-events-none absolute left-5 top-5 z-20 h-4 w-4 border-l border-t border-white/10 transition-colors duration-500 group-hover:border-[#c7a66a]/50" />

              <div className="pointer-events-none absolute right-5 top-5 z-20 h-4 w-4 border-r border-t border-white/10 transition-colors duration-500 group-hover:border-[#c7a66a]/50" />

              <div className="pointer-events-none absolute bottom-5 left-5 z-20 h-4 w-4 border-b border-l border-white/10 transition-colors duration-500 group-hover:border-[#c7a66a]/50" />

              <div className="pointer-events-none absolute bottom-5 right-5 z-20 h-4 w-4 border-b border-r border-white/10 transition-colors duration-500 group-hover:border-[#c7a66a]/50" />
            </motion.article>
          ))}
        </div>

        {/* =======================================
            KEYWORDS
        ======================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 20,
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
          }}
          className="mt-14 grid grid-cols-2 gap-y-4 border-t border-black/15 pt-6 md:grid-cols-4 md:gap-y-0"
        >
          <p className="text-[10px] uppercase tracking-[0.16em] text-black/40">
            Research
          </p>

          <p className="text-[10px] uppercase tracking-[0.16em] text-black/40">
            Formulation
          </p>

          <p className="text-[10px] uppercase tracking-[0.16em] text-black/40">
            Development
          </p>

          <p className="text-[10px] uppercase tracking-[0.16em] text-black/40 md:text-right">
            Innovation
          </p>
        </motion.div>
      </div>

      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-35px] right-0 select-none"
      >
        <span className="font-display text-[20vw] leading-none tracking-[-0.06em] text-black/[0.025]">
          WORK
        </span>
      </div>
    </section>
  );
}