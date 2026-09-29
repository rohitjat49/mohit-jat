"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from "lucide-react";

export default function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#0a0a0a] py-32 text-white md:py-48"
    >
      {/* =========================================
          BACKGROUND ATMOSPHERE
      ========================================= */}

      <motion.div
        aria-hidden="true"
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 1.12, 1],
                opacity: [0.25, 0.4, 0.25],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 top-[15%] h-[500px] w-[500px] rounded-full bg-[#c7a66a]/[0.045] blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent"
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
                07 / Contact
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
              Let&apos;s build
              <br />
              something{" "}
              <span className="italic text-[#c7a66a]">
                meaningful.
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
              Whether you want to discuss formulation,
              research, product development or a potential
              collaboration, feel free to get in touch.
            </motion.p>
          </div>
        </div>

        {/* =========================================
            MAIN EMAIL CTA
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
            duration: 0.9,
            delay: 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-24 border-y border-white/10 py-12 md:mt-32 md:py-16"
        >
          <a
            href="mailto:hello@mohitjat.com"
            className="group block"
          >
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="min-w-0">
                <p className="eyebrow mb-5">
                  Start a conversation
                </p>

                <div className="overflow-hidden">
                  <h3 className="break-all font-display text-[clamp(2.2rem,6vw,6rem)] leading-[0.95] tracking-[-0.045em] text-white/90 transition-colors duration-500 group-hover:text-[#c7a66a] sm:break-normal">
                    hello@mohitjat.com
                  </h3>
                </div>
              </div>

              <motion.div
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.04,
                      }
                }
                transition={{
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-[#c7a66a] group-hover:bg-[#c7a66a] group-hover:text-[#0a0a0a] md:h-20 md:w-20"
              >
                <ArrowUpRight
                  size={24}
                  className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </motion.div>
            </div>
          </a>
        </motion.div>

        {/* =========================================
            CONTACT DETAILS
        ========================================= */}

        <div className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
          {/* EMAIL */}

          <motion.a
            href="mailto:hello@mohitjat.com"
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
              duration: 0.6,
            }}
            className="group relative border-t border-white/10 pt-5"
          >
            <div className="flex items-center justify-between">
              <Mail
                size={18}
                className="text-white/35 transition-colors duration-300 group-hover:text-[#c7a66a]"
              />

              <ArrowUpRight
                size={16}
                className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
              />
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/25">
              Email
            </p>

            <p className="mt-2 text-sm text-white/65 transition-colors duration-300 group-hover:text-white">
              hello@mohitjat.com
            </p>

            <div className="mt-6 h-px w-0 bg-[#c7a66a] transition-all duration-500 group-hover:w-10" />
          </motion.a>

          {/* LINKEDIN */}

          <motion.a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer"
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
              duration: 0.6,
              delay: 0.1,
            }}
            className="group relative border-t border-white/10 pt-5"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-9 w-9 items-center justify-center rounded border border-white/15 text-sm font-semibold text-white/45 transition-all duration-300 group-hover:border-[#c7a66a] group-hover:text-[#c7a66a]">
                in
              </div>

              <ArrowUpRight
                size={16}
                className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
              />
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/25">
              Social
            </p>

            <p className="mt-2 text-sm text-white/65 transition-colors duration-300 group-hover:text-white">
              LinkedIn
            </p>

            <div className="mt-6 h-px w-0 bg-[#c7a66a] transition-all duration-500 group-hover:w-10" />
          </motion.a>

          {/* LOCATION */}

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
              duration: 0.6,
              delay: 0.2,
            }}
            className="group relative border-t border-white/10 pt-5"
          >
            <div className="flex items-center justify-between">
              <MapPin
                size={18}
                className="text-white/35 transition-colors duration-300 group-hover:text-[#c7a66a]"
              />
            </div>

            <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-white/25">
              Based in
            </p>

            <p className="mt-2 text-sm text-white/65">
              India
            </p>

            <div className="mt-6 h-px w-0 bg-[#c7a66a] transition-all duration-500 group-hover:w-10" />
          </motion.div>
        </div>

        {/* =========================================
            CLOSING LINE
        ========================================= */}

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
          }}
          transition={{
            duration: 0.8,
            delay: 0.15,
          }}
          className="mt-20 border-t border-white/10 pt-6 md:mt-28"
        >
          <div className="flex flex-col gap-3 text-[9px] uppercase tracking-[0.18em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Research · Formulation · Development
            </span>

            <span>
              Open to meaningful collaborations
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-0 select-none"
      >
        <span className="font-display text-[22vw] leading-none tracking-[-0.06em] text-white/[0.025]">
          HELLO
        </span>
      </div>
    </section>
  );
}