"use client";

import { createClient } from "@/lib/supabase/client";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  FileText,
  Globe2,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "All Articles",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    label: "New Article",
    href: "/admin/blogs/new",
    icon: Plus,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [checking, setChecking] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  // =========================================
  // AUTH CHECK
  // =========================================

  useEffect(() => {
    const checkUser = async () => {
      if (pathname === "/admin/login") {
        setChecking(false);
        return;
      }

      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setUserEmail(user.email ?? "");
      setChecking(false);
    };

    checkUser();
  }, [pathname, router]);

  // =========================================
  // CLOSE MOBILE MENU ON ROUTE CHANGE
  // =========================================

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      const supabase = createClient();

      await supabase.auth.signOut();

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
    }
  };

  // =========================================
  // ACTIVE ROUTE
  // =========================================

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }

    return pathname.startsWith(href);
  };

  // =========================================
  // LOGIN PAGE
  // =========================================

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // =========================================
  // AUTH LOADING
  // =========================================

  if (checking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]">
            <div className="h-5 w-5 animate-spin rounded-full border border-white/10 border-t-[#c7a66a]" />
          </div>

          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-white/30">
            Checking access
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ========================================= */}
      {/* MOBILE HEADER */}
      {/* ========================================= */}

      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-[#0a0a0a]/90 px-5 backdrop-blur-xl lg:hidden">
        <Link
          href="/admin"
          className="group"
        >
          <p className="font-display text-xl tracking-tight">
            Mohit Jat
          </p>

          <p className="text-[7px] uppercase tracking-[0.2em] text-white/25">
            Content Studio
          </p>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition-all hover:border-white/20 hover:text-white"
          aria-label="Open admin menu"
        >
          <Menu size={18} />
        </button>
      </header>

      {/* ========================================= */}
      {/* DESKTOP SIDEBAR */}
      {/* ========================================= */}

      <aside className="fixed bottom-0 left-0 top-0 z-30 hidden w-[260px] border-r border-white/10 bg-[#0a0a0a] lg:flex lg:flex-col">
        {/* BRAND */}

        <div className="border-b border-white/10 px-7 py-7">
          <Link
            href="/admin"
            className="group block"
          >
            <p className="font-display text-2xl tracking-tight transition-colors group-hover:text-[#c7a66a]">
              Mohit Jat
            </p>

            <p className="mt-2 text-[9px] uppercase tracking-[0.2em] text-white/25">
              Content Studio
            </p>
          </Link>
        </div>

        {/* NAVIGATION */}

        <nav className="flex-1 px-4 py-7">
          <p className="mb-4 px-3 text-[9px] uppercase tracking-[0.2em] text-white/20">
            Workspace
          </p>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 text-xs transition-all ${
                    active
                      ? "bg-white/[0.07] text-white"
                      : "text-white/35 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="desktop-active-indicator"
                      className="absolute bottom-2 left-0 top-2 w-[2px] rounded-r-full bg-[#c7a66a]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    size={16}
                    className={`transition-colors ${
                      active
                        ? "text-[#c7a66a]"
                        : "text-white/30 group-hover:text-white/60"
                    }`}
                  />

                  <span>{item.label}</span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c7a66a]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* ACCOUNT */}

          <p className="mb-4 mt-10 px-3 text-[9px] uppercase tracking-[0.2em] text-white/20">
            Account
          </p>

          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/35 transition-all hover:bg-white/[0.035] hover:text-white"
          >
            <Globe2
              size={16}
              className="text-white/30 transition-colors group-hover:text-[#c7a66a]"
            />

            <span>View Website</span>

            <ArrowUpRight
              size={13}
              className="ml-auto text-white/20 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>

          <Link
            href="/"
            className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/35 transition-all hover:bg-white/[0.035] hover:text-white"
          >
            <ArrowLeft
              size={16}
              className="text-white/30"
            />

            Back to website
          </Link>
        </nav>

        {/* USER */}

        <div className="border-t border-white/10 p-5">
          <div className="mb-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
            <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
              Signed in as
            </p>

            <p className="mt-2 truncate text-xs text-white/50">
              {userEmail || "Admin"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs text-white/35 transition-all hover:bg-red-400/5 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loggingOut ? (
              <span className="h-4 w-4 animate-spin rounded-full border border-white/10 border-t-red-300" />
            ) : (
              <LogOut size={16} />
            )}

            {loggingOut
              ? "Logging out..."
              : "Logout"}
          </button>
        </div>
      </aside>

      {/* ========================================= */}
      {/* MOBILE MENU */}
      {/* ========================================= */}

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            {/* OVERLAY */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* DRAWER */}

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative flex h-full w-[290px] flex-col border-r border-white/10 bg-[#0a0a0a]"
            >
              {/* MOBILE BRAND */}

              <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
                <Link
                  href="/admin"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                >
                  <p className="font-display text-2xl">
                    Mohit Jat
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/25">
                    Content Studio
                  </p>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:text-white"
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              {/* MOBILE NAV */}

              <nav className="flex-1 px-4 py-7">
                <p className="mb-4 px-3 text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Workspace
                </p>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const active =
                      isActive(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() =>
                          setMobileOpen(false)
                        }
                        className={`relative flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm transition-all ${
                          active
                            ? "bg-white/[0.07] text-white"
                            : "text-white/40 hover:bg-white/[0.035] hover:text-white"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mobile-active-indicator"
                            className="absolute bottom-2 left-0 top-2 w-[2px] rounded-r-full bg-[#c7a66a]"
                          />
                        )}

                        <Icon
                          size={17}
                          className={
                            active
                              ? "text-[#c7a66a]"
                              : "text-white/30"
                          }
                        />

                        {item.label}

                        {active && (
                          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#c7a66a]" />
                        )}
                      </Link>
                    );
                  })}
                </div>

                <p className="mb-4 mt-10 px-3 text-[9px] uppercase tracking-[0.2em] text-white/20">
                  Account
                </p>

                <Link
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm text-white/40 transition-colors hover:text-white"
                >
                  <Globe2 size={17} />

                  View Website

                  <ArrowUpRight
                    size={13}
                    className="ml-auto text-white/20"
                  />
                </Link>

                <Link
                  href="/"
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="mt-1 flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm text-white/40 transition-colors hover:text-white"
                >
                  <ArrowLeft size={17} />

                  Back to website
                </Link>
              </nav>

              {/* MOBILE USER */}

              <div className="border-t border-white/10 p-5">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
                  <p className="text-[9px] uppercase tracking-[0.18em] text-white/20">
                    Signed in as
                  </p>

                  <p className="mt-2 truncate text-xs text-white/40">
                    {userEmail || "Admin"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/40 transition-colors hover:text-red-300 disabled:opacity-50"
                >
                  {loggingOut ? (
                    <span className="h-4 w-4 animate-spin rounded-full border border-white/10 border-t-red-300" />
                  ) : (
                    <LogOut size={17} />
                  )}

                  {loggingOut
                    ? "Logging out..."
                    : "Logout"}
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================= */}

      <main className="min-h-screen lg:ml-[260px]">
        <div className="px-5 pb-16 pt-24 md:px-8 lg:px-10 lg:pt-10">
          {children}
        </div>
      </main>
    </div>
  );
}