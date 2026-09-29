"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Eye,
  FileText,
  PenLine,
  Pencil,
  Plus,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ElementType } from "react";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  status: "published" | "draft";
  read_time: number | null;
  published_at: string | null;
  created_at: string;
};

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // --------------------------------
  // FETCH BLOGS
  // --------------------------------

  const fetchBlogs = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const supabase = createClient();

      const { data, error } = await supabase
        .from("blogs")
        .select(
          "id, slug, title, excerpt, image_url, status, read_time, published_at, created_at"
        )
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Dashboard blogs error:",
          error
        );

        alert(error.message);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while loading the dashboard."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // --------------------------------
  // STATS
  // --------------------------------

  const totalArticles = blogs.length;

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftCount = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  const publishedPercentage =
    totalArticles > 0
      ? Math.round(
          (publishedCount / totalArticles) * 100
        )
      : 0;

  // --------------------------------
  // RECENT POSTS
  // --------------------------------

  const recentPosts = useMemo(() => {
    return blogs.slice(0, 4);
  }, [blogs]);

  // --------------------------------
  // LATEST PUBLISHED
  // --------------------------------

  const latestPublished = useMemo(() => {
    return (
      blogs.find(
        (blog) => blog.status === "published"
      ) || null
    );
  }, [blogs]);

  // --------------------------------
  // DATE
  // --------------------------------

  const formatDate = (blog: Blog) => {
    const date =
      blog.status === "published" &&
      blog.published_at
        ? blog.published_at
        : blog.created_at;

    if (!date) return "—";

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="flex flex-col gap-7 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7a66a]">
            Content Studio
          </p>

          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            Dashboard
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Manage your journal, publish new articles and
            keep your website content up to date.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fetchBlogs(true)}
            disabled={refreshing}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 px-4 text-xs uppercase tracking-[0.14em] text-white/45 transition-all hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <Link
            href="/admin/blogs/new"
            className="group inline-flex items-center gap-3 rounded-full bg-[#c7a66a] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[#111] transition-transform hover:-translate-y-1"
          >
            <Plus size={16} />

            New Article

            <ArrowUpRight
              size={15}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>

      {/* ================================= */}
      {/* STATS */}
      {/* ================================= */}

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Total Articles"
          value={totalArticles}
          icon={FileText}
          loading={loading}
          delay={0}
        />

        <StatCard
          label="Published"
          value={publishedCount}
          icon={Eye}
          loading={loading}
          delay={0.08}
          accent
        />

        <StatCard
          label="Drafts"
          value={draftCount}
          icon={PenLine}
          loading={loading}
          delay={0.16}
        />
      </div>

      {/* ================================= */}
      {/* OVERVIEW */}
      {/* ================================= */}

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_340px]">
        {/* PUBLISHING OVERVIEW */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-7"
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Publishing Overview
              </p>

              <h2 className="mt-3 font-display text-2xl">
                Journal activity
              </h2>
            </div>

            <div className="rounded-full border border-white/10 p-3">
              <FileText
                size={16}
                className="text-white/30"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-display">
                  {loading
                    ? "--"
                    : `${publishedPercentage}%`}
                </p>

                <p className="mt-2 text-xs text-white/30">
                  of your articles are published
                </p>
              </div>

              <p className="text-xs text-white/30">
                {publishedCount} / {totalArticles}
              </p>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.05]">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${publishedPercentage}%`,
                }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                }}
                className="h-full rounded-full bg-[#c7a66a]"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
                Published
              </p>

              <p className="mt-3 font-display text-2xl">
                {loading
                  ? "--"
                  : publishedCount}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-[9px] uppercase tracking-[0.14em] text-white/25">
                Drafts
              </p>

              <p className="mt-3 font-display text-2xl">
                {loading ? "--" : draftCount}
              </p>
            </div>
          </div>
        </motion.div>

        {/* LATEST PUBLISHED */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 0.23,
          }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#151515]"
        >
          <div className="p-6">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#c7a66a]">
              Latest Published
            </p>

            {loading ? (
              <div className="mt-8 animate-pulse">
                <div className="h-5 w-24 rounded bg-white/[0.05]" />
                <div className="mt-5 h-7 w-full rounded bg-white/[0.05]" />
                <div className="mt-2 h-7 w-4/5 rounded bg-white/[0.05]" />
              </div>
            ) : latestPublished ? (
              <>
                <h3 className="mt-5 line-clamp-3 font-display text-2xl leading-tight">
                  {latestPublished.title}
                </h3>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-white/30">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={12} />
                    {formatDate(
                      latestPublished
                    )}
                  </span>

                  <span>·</span>

                  <span className="flex items-center gap-1.5">
                    <Clock3 size={12} />
                    {latestPublished.read_time ||
                      1}{" "}
                    min
                  </span>
                </div>

                <div className="mt-7 flex gap-2">
                  <Link
                    href={`/blog/${latestPublished.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-white/50 transition-all hover:border-white/20 hover:text-white"
                  >
                    <Eye size={14} />
                    View
                  </Link>

                  <Link
                    href={`/admin/blogs/${latestPublished.slug}/edit`}
                    className="inline-flex items-center gap-2 rounded-full bg-[#c7a66a] px-4 py-2.5 text-[10px] uppercase tracking-[0.14em] text-[#111] transition-transform hover:-translate-y-0.5"
                  >
                    <Pencil size={14} />
                    Edit
                  </Link>
                </div>
              </>
            ) : (
              <div className="mt-8">
                <p className="text-sm text-white/35">
                  No published articles yet.
                </p>

                <Link
                  href="/admin/blogs/new"
                  className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#c7a66a]"
                >
                  Create article
                  <ArrowUpRight size={13} />
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ================================= */}
      {/* RECENT ARTICLES */}
      {/* ================================= */}

      <div className="mt-14">
        <div className="flex items-end justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Content
            </p>

            <h2 className="mt-2 font-display text-2xl md:text-3xl">
              Recent Articles
            </h2>
          </div>

          <Link
            href="/admin/blogs"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/40 transition-colors hover:text-white"
          >
            View all
            <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="mt-2">
          {loading ? (
            <RecentLoading />
          ) : recentPosts.length === 0 ? (
            <EmptyArticles />
          ) : (
            recentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + index * 0.08,
                }}
                className="group flex flex-col gap-5 border-b border-white/10 py-6 transition-colors hover:bg-white/[0.015] md:flex-row md:items-center md:justify-between md:px-3"
              >
                <div className="flex min-w-0 items-start gap-5">
                  <span className="pt-1 text-[10px] tracking-[0.16em] text-[#c7a66a]">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div className="min-w-0">
                    <h3 className="line-clamp-2 font-display text-xl leading-tight text-white/85 transition-colors group-hover:text-white md:text-2xl">
                      {post.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.12em] text-white/25">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={12} />
                        {formatDate(post)}
                      </span>

                      <span>·</span>

                      <span className="flex items-center gap-1.5">
                        <Clock3 size={12} />
                        {post.read_time || 1}{" "}
                        min
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] ${
                      post.status ===
                      "published"
                        ? "border-[#c7a66a]/30 text-[#c7a66a]"
                        : "border-white/10 text-white/30"
                    }`}
                  >
                    {post.status}
                  </span>

                  <Link
                    href={`/admin/blogs/${post.slug}/edit`}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all hover:border-[#c7a66a]/40 hover:bg-[#c7a66a]/10 hover:text-[#c7a66a]"
                    title="Edit article"
                  >
                    <Pencil size={15} />
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ================================= */}
      {/* QUICK ACTION */}
      {/* ================================= */}

      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
          delay: 0.5,
        }}
        className="mt-14 overflow-hidden rounded-2xl border border-white/10 bg-[#151515]"
      >
        <div className="relative flex flex-col gap-8 p-7 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#c7a66a]/[0.04] blur-3xl" />

          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#c7a66a]">
              Keep publishing
            </p>

            <h2 className="mt-3 font-display text-3xl md:text-4xl">
              Have something new to share?
            </h2>

            <p className="mt-3 max-w-lg text-sm leading-7 text-white/40">
              Write a new article and publish it
              directly to the journal.
            </p>
          </div>

          <Link
            href="/admin/blogs/new"
            className="group relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 transition-all duration-500 hover:-translate-y-1 hover:border-[#c7a66a] hover:bg-[#c7a66a] hover:text-[#111]"
          >
            <ArrowUpRight
              size={21}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </motion.div>

      {/* ================================= */}
      {/* FOOTER */}
      {/* ================================= */}

      <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
        <span>
          {totalArticles} total articles
        </span>

        <span>
          Mohit Jat · Content Studio
        </span>
      </div>
    </div>
  );
}

// =================================
// STAT CARD
// =================================

function StatCard({
  label,
  value,
  icon: Icon,
  loading,
  delay,
  accent = false,
}: {
  label: string;
  value: number;
icon: LucideIcon;
  loading: boolean;
  delay: number;
  accent?: boolean;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.55,
        delay,
      }}
      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition-colors hover:bg-white/[0.045]"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
          {label}
        </p>

        <Icon
          size={17}
          className={`transition-colors ${
            accent
              ? "text-[#c7a66a]/60 group-hover:text-[#c7a66a]"
              : "text-white/20 group-hover:text-white/40"
          }`}
        />
      </div>

      <p className="mt-7 font-display text-5xl">
        {loading
          ? "--"
          : String(value).padStart(2, "0")}
      </p>
    </motion.div>
  );
}

// =================================
// RECENT LOADING
// =================================

function RecentLoading() {
  return (
    <div className="divide-y divide-white/10">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex animate-pulse items-center justify-between gap-5 py-6"
        >
          <div className="flex flex-1 items-start gap-5">
            <div className="h-3 w-5 rounded bg-white/[0.05]" />

            <div className="flex-1">
              <div className="h-6 w-2/3 rounded bg-white/[0.05]" />

              <div className="mt-3 h-3 w-32 rounded bg-white/[0.04]" />
            </div>
          </div>

          <div className="h-7 w-20 rounded-full bg-white/[0.04]" />
        </div>
      ))}
    </div>
  );
}

// =================================
// EMPTY ARTICLES
// =================================

function EmptyArticles() {
  return (
    <div className="border-b border-white/10 py-14 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]">
        <FileText
          size={19}
          className="text-white/20"
        />
      </div>

      <p className="mt-5 text-sm text-white/35">
        No articles yet.
      </p>

      <Link
        href="/admin/blogs/new"
        className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-[#c7a66a]"
      >
        Create your first article
        <ArrowUpRight size={13} />
      </Link>
    </div>
  );
}