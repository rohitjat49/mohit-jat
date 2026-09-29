"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Mail,
} from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    label: "About",
    href: "#about",
    type: "section",
  },
  {
    label: "Expertise",
    href: "#expertise",
    type: "section",
  },
  {
    label: "Work",
    href: "#work",
    type: "section",
  },
  {
    label: "Journey",
    href: "#journey",
    type: "section",
  },
  {
    label: "Blog",
    href: "/blog",
    type: "page",
  },
  {
    label: "Contact",
    href: "#contact",
    type: "section",
  },
];

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (href: string) => {
    document
      .querySelector(href)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* =========================================
          MAIN FOOTER
      ========================================= */}

      <div className="container border-t border-white/10 py-20 md:py-28">
        <div className="grid gap-16 md:grid-cols-12 md:gap-10">
          {/* =======================================
              BRAND
          ======================================= */}

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
              amount: 0.2,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="md:col-span-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-6 bg-[#c7a66a]" />

              <p className="eyebrow">
                Scientist · Builder · Entrepreneur
              </p>
            </div>

            <h2 className="mt-8 font-display text-[clamp(4rem,8vw,8rem)] leading-[0.82] tracking-[-0.055em]">
              Mohit
              <br />
              <span className="italic text-[#c7a66a]">
                Jat.
              </span>
            </h2>

            <p className="mt-8 max-w-md text-sm leading-7 text-white/40">
              Exploring cosmetic science, formulation,
              research, product development and ideas
              that create meaningful impact.
            </p>

            <div className="mt-10 flex items-center gap-3 text-[9px] uppercase tracking-[0.18em] text-white/25">
              <span>Research</span>
              <span className="h-px w-5 bg-white/10" />
              <span>Formulation</span>
              <span className="h-px w-5 bg-white/10" />
              <span>Innovation</span>
            </div>
          </motion.div>

          {/* =======================================
              NAVIGATION
          ======================================= */}

          <div className="md:col-span-3">
            <p className="eyebrow mb-6">
              Navigate
            </p>

            <nav className="flex flex-col">
              {footerLinks.map((link, index) => {
                if (link.type === "page") {
                  return (
                    <motion.div
                      key={link.label}
                      initial={{
                        opacity: 0,
                        x: shouldReduceMotion
                          ? 0
                          : 20,
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
                        delay: shouldReduceMotion
                          ? 0
                          : index * 0.05,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="group flex w-full items-center justify-between border-b border-white/10 py-3 text-sm text-white/50 transition-colors hover:text-white"
                      >
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          {link.label}
                        </span>

                        <ArrowUpRight
                          size={14}
                          className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
                        />
                      </Link>
                    </motion.div>
                  );
                }

                return (
                  <motion.button
                    key={link.label}
                    type="button"
                    initial={{
                      opacity: 0,
                      x: shouldReduceMotion
                        ? 0
                        : 20,
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
                      delay: shouldReduceMotion
                        ? 0
                        : index * 0.05,
                    }}
                    onClick={() =>
                      scrollToSection(link.href)
                    }
                    className="group flex w-full items-center justify-between border-b border-white/10 py-3 text-left text-sm text-white/50 transition-colors hover:text-white"
                  >
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {link.label}
                    </span>

                    <ArrowUpRight
                      size={14}
                      className="text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
                    />
                  </motion.button>
                );
              })}
            </nav>
          </div>

          {/* =======================================
              CONNECT
          ======================================= */}

          <div className="md:col-span-3">
            <p className="eyebrow mb-6">
              Connect
            </p>

            <div className="flex flex-col">
              {/* EMAIL */}

              <a
                href="mailto:hello@mohitjat.com"
                className="group flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <Mail
                  size={15}
                  className="text-white/35 transition-colors group-hover:text-[#c7a66a]"
                />

                <span>Email</span>

                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
                />
              </a>

              {/* LINKEDIN */}

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <span className="flex h-4 w-4 items-center justify-center text-[10px] font-bold text-white/45 transition-colors group-hover:text-[#c7a66a]">
                  in
                </span>

                <span>LinkedIn</span>

                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
                />
              </a>

              {/* INSTAGRAM */}

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 border-b border-white/10 py-3 text-sm text-white/50 transition-colors hover:text-white"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded border border-white/20 text-[8px] font-medium text-white/40 transition-colors group-hover:border-[#c7a66a] group-hover:text-[#c7a66a]">
                  IG
                </span>

                <span>Instagram</span>

                <ArrowUpRight
                  size={14}
                  className="ml-auto text-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#c7a66a]"
                />
              </a>
            </div>

            <p className="mt-8 text-[9px] uppercase tracking-[0.18em] text-white/20">
              India · Open to collaboration
            </p>
          </div>
        </div>
      </div>

      {/* =========================================
          LARGE CTA
      ========================================= */}

      <div className="container">
        <motion.a
          href="mailto:hello@mohitjat.com"
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.9,
          }}
          className="group block border-t border-white/10 py-16 md:py-24"
        >
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-5">
                Have an idea?
              </p>

              <h3 className="font-display text-[clamp(3rem,6vw,7rem)] leading-[0.9] tracking-[-0.045em] transition-colors duration-500 group-hover:text-[#c7a66a]">
                Let&apos;s talk.
              </h3>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/35">
                Let&apos;s discuss research, formulation,
                product development or a new idea.
              </p>
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
              }}
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 group-hover:border-[#c7a66a] group-hover:bg-[#c7a66a] group-hover:text-[#0a0a0a] md:h-20 md:w-20"
            >
              <ArrowUpRight
                size={24}
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </motion.div>
          </div>
        </motion.a>
      </div>

      {/* =========================================
          BOTTOM BAR
      ========================================= */}

      <div className="container border-t border-white/10 py-6">
        <div className="flex flex-col gap-5 text-[9px] uppercase tracking-[0.16em] text-white/25 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Mohit Jat.
            All rights reserved.
          </p>

          <p>
            Cosmetic Science · Research · Innovation
          </p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group flex items-center gap-2 transition-colors hover:text-white"
          >
            Back to top

            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>

      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-35px] left-0 select-none"
      >
        <span className="font-display text-[23vw] leading-none tracking-[-0.06em] text-white/[0.02]">
          MOHIT
        </span>
      </div>
    </footer>
  );
}