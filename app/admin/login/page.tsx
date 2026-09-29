"use client";

import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const supabase = createClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-5 text-white">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c7a66a]/10 blur-[140px]" />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.035]">
        <div className="absolute left-1/4 top-0 h-full w-px bg-white" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-white" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Brand */}
        <div className="mb-10 text-center">
          <p className="font-display text-3xl tracking-tight">
            Mohit Jat
          </p>

          <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/30">
            Content Studio
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-7 backdrop-blur-xl md:p-9">

          <div className="mb-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7a66a]">
              Admin Access
            </p>

            <h1 className="mt-3 font-display text-4xl tracking-tight">
              Welcome back.
            </h1>

            <p className="mt-3 text-sm leading-6 text-white/35">
              Sign in to manage your journal and publish new articles.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                Email
              </label>

              <div className="relative mt-2">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/15 transition-colors focus:border-[#c7a66a]/50"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                Password
              </label>

              <div className="relative mt-2">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-white/15 transition-colors focus:border-[#c7a66a]/50"
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">
                <p className="text-xs leading-5 text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#c7a66a] px-5 py-4 text-xs uppercase tracking-[0.16em] text-[#111] transition-all hover:-translate-y-0.5 hover:bg-[#d2b57d] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.16em] text-white/15">
          Mohit Jat · Private Content Studio
        </p>
      </motion.div>
    </main>
  );
}