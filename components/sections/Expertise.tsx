"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Cosmetic Formulation Development",
    description:
      "Developing thoughtful cosmetic formulations with a focus on ingredients, performance, stability and product experience.",
  },
  {
    number: "02",
    title: "Cosmetic Laboratory Setup & GMP Planning",
    description:
      "Planning laboratory workflows, equipment requirements, processes and GMP-oriented systems for cosmetic R&D.",
  },
  {
    number: "03",
    title: "Stability & Compatibility Testing",
    description:
      "Evaluating product stability and packaging compatibility to understand how formulations perform over time.",
  },
  {
    number: "04",
    title: "Ingredient Research & Evaluation",
    description:
      "Researching and evaluating ingredients based on functionality, formulation requirements and product goals.",
  },
  {
    number: "05",
    title: "Pilot Batch Production & Scale-Up",
    description:
      "Supporting the transition from laboratory formulation to pilot batches and larger-scale production.",
  },
  {
    number: "06",
    title: "Market & Competitor Analysis",
    description:
      "Understanding market trends, product positioning and competitive landscapes to support product development.",
  },
];

export default function Expertise() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="expertise"
      className="relative overflow-hidden bg-[#0a0a0a] py-32 text-white md:py-48"
    >
      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[220px] top-[25%] h-[500px] w-[500px] rounded-full bg-[#c7a66a]/[0.045] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
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
                02 / Expertise
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 50,
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
              What
              <br />

              <span className="italic text-[#c7a66a]">
                I do.
              </span>
            </h2>

            <div className="mt-10 h-px w-16 bg-[#c7a66a]" />
          </motion.div>
        </div>

        {/* =======================================
            SERVICES
        ======================================= */}

        <div className="mt-24 border-t border-white/15 md:mt-32">
          {services.map((service, index) => {
            const isActive = active === index;

            return (
              <motion.button
                key={service.number}
                type="button"
                onMouseEnter={() =>
                  setActive(index)
                }
                onFocus={() =>
                  setActive(index)
                }
                onClick={() =>
                  setActive(index)
                }
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.65,
                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative grid w-full grid-cols-12 border-b border-white/15 py-7 text-left md:py-9"
              >
                {/* Active indicator */}

                <motion.span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-px bg-[#c7a66a]"
                  initial={false}
                  animate={{
                    width: isActive
                      ? "100%"
                      : "0%",
                    opacity: isActive ? 0.35 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                {/* =================================
                    NUMBER
                ================================= */}

                <div className="col-span-2 pt-1 md:col-span-1">
                  <motion.span
                    animate={{
                      color: isActive
                        ? "#c7a66a"
                        : "rgba(255,255,255,0.32)",
                      x: isActive ? 4 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="inline-block text-[10px] tracking-[0.16em] md:text-xs"
                  >
                    {service.number}
                  </motion.span>
                </div>

                {/* =================================
                    TITLE + DESCRIPTION
                ================================= */}

                <div className="col-span-9 md:col-span-10">
                  <motion.h3
                    animate={{
                      x: isActive ? 10 : 0,
                      color: isActive
                        ? "#ffffff"
                        : "rgba(255,255,255,0.52)",
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="font-display text-[1.65rem] leading-[1.05] tracking-[-0.02em] md:text-4xl lg:text-[2.7rem]"
                  >
                    {service.title}
                  </motion.h3>

                  {/* Mobile Description */}

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive
                        ? "auto"
                        : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden md:hidden"
                  >
                    <p className="max-w-xl pt-5 text-sm leading-7 text-white/45">
                      {service.description}
                    </p>
                  </motion.div>

                  {/* Desktop Description */}

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive
                        ? "auto"
                        : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="hidden overflow-hidden md:block"
                  >
                    <p className="max-w-xl pt-5 text-sm leading-7 text-white/40">
                      {service.description}
                    </p>
                  </motion.div>
                </div>

                {/* =================================
                    ARROW
                ================================= */}

                <div className="col-span-1 flex justify-end pt-1">
                  <motion.span
                    animate={{
                      x: isActive ? 4 : 0,
                      y: isActive ? -4 : 0,
                      rotate: isActive
                        ? 0
                        : -8,
                      color: isActive
                        ? "#c7a66a"
                        : "rgba(255,255,255,0.25)",
                    }}
                    transition={{
                      duration: 0.35,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ArrowUpRight
                      size={20}
                    />
                  </motion.span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* =======================================
            BOTTOM DISCIPLINES
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
            duration: 0.7,
          }}
          className="mt-12 grid gap-4 text-[10px] uppercase tracking-[0.16em] text-white/30 md:grid-cols-3"
        >
          <span>Research</span>

          <span className="md:text-center">
            Development
          </span>

          <span className="md:text-right">
            Innovation
          </span>
        </motion.div>
      </div>
    </section>
  );
}