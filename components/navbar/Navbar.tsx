"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    setOpen(false);

    /* =========================================
       BLOG → OPEN BLOG PAGE
    ========================================= */

    if (href === "/blog") {
      router.push("/blog");
      return;
    }

    /* =========================================
       HOME PAGE → SCROLL + UPDATE URL
    ========================================= */

    if (pathname === "/") {
      const element = document.querySelector(href);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        window.history.pushState(
          null,
          "",
          href
        );
      }

      return;
    }

    /* =========================================
       OTHER PAGES → HOME + SECTION
    ========================================= */

    router.push(`/${href}`);
  };

  /* =========================================
     LOGO
  ========================================= */

  const handleLogoClick = () => {
    setOpen(false);

    if (pathname === "/") {
      window.history.pushState(
        null,
        "",
        "/"
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    router.push("/");
  };

  return (
    <>
      {/* =========================================
          NAVBAR
      ========================================= */}

      <header className="fixed left-0 top-0 z-50 w-full px-4 py-4 md:px-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-xl md:px-6">
          {/* LOGO */}

          <button
            type="button"
            onClick={handleLogoClick}
            className="group flex items-center gap-3"
          >
            <span className="font-display text-xl tracking-tight">
              Mohit Jat
            </span>

            <ArrowUpRight
              size={15}
              className="opacity-50 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>

          {/* =========================================
              DESKTOP NAVIGATION
          ========================================= */}

          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => {
              const active =
                item.href === "/blog" &&
                pathname === "/blog";

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    handleClick(item.href)
                  }
                  className={`group relative text-xs uppercase tracking-[0.14em] transition-colors duration-300 ${
                    active
                      ? "text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-white transition-all duration-300 ${
                      active
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* =========================================
              MOBILE BUTTON
          ========================================= */}

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* =========================================
          MOBILE MENU
      ========================================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-[#0a0a0a]"
          >
            <div className="flex h-full flex-col px-6 py-6">
              {/* HEADER */}

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleLogoClick}
                  className="font-display text-xl"
                >
                  Mohit Jat
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* LINKS */}

              <nav className="mt-24 flex flex-col">
                {navItems.map((item, index) => {
                  const active =
                    item.href === "/blog" &&
                    pathname === "/blog";

                  return (
                    <motion.button
                      key={item.label}
                      type="button"
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: index * 0.08,
                      }}
                      onClick={() =>
                        handleClick(item.href)
                      }
                      className={`group flex items-center justify-between border-b border-white/10 py-5 text-left font-display text-4xl transition-colors ${
                        active
                          ? "text-[#c7a66a]"
                          : "text-white hover:text-white/60"
                      }`}
                    >
                      <span>{item.label}</span>

                      <ArrowUpRight
                        size={22}
                        className="opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-60"
                      />
                    </motion.button>
                  );
                })}
              </nav>

              {/* FOOTER */}

              <div className="mt-auto">
                <p className="eyebrow">
                  Scientist · Builder · Entrepreneur
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}