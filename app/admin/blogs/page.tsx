"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Eye,
  FileText,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { ElementType } from "react";


type Filter = "all" | "published" | "draft";

type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  status: "published" | "draft";
  read_time: number | null;
  published_at: string | null;
  created_at: string;
  updated_at?: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(
    null
  );

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
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch blogs error:", error);
        alert(error.message);
        return;
      }

      setBlogs(data || []);
    } catch (error) {
      console.error(error);
      alert(
        "Something went wrong while loading articles."
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
  // FILTER
  // --------------------------------

  const filteredBlogs = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesSearch =
        !searchText ||
        blog.title.toLowerCase().includes(searchText) ||
        (blog.excerpt || "")
          .toLowerCase()
          .includes(searchText);

      const matchesFilter =
        filter === "all" || blog.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [blogs, search, filter]);

  // --------------------------------
  // COUNTS
  // --------------------------------

  const publishedCount = blogs.filter(
    (blog) => blog.status === "published"
  ).length;

  const draftCount = blogs.filter(
    (blog) => blog.status === "draft"
  ).length;

  // --------------------------------
  // DATE
  // --------------------------------

  const formatDate = (blog: Blog) => {
    const date =
      blog.status === "published" && blog.published_at
        ? blog.published_at
        : blog.created_at;

    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // --------------------------------
  // DELETE IMAGE
  // --------------------------------

  const deleteStorageImage = async (
    imageUrl: string | null
  ) => {
    if (!imageUrl) return;

    try {
      const imageUrlObject = new URL(imageUrl);

      const marker =
        "/storage/v1/object/public/blog-images/";

      if (!imageUrlObject.pathname.includes(marker)) {
        return;
      }

      const imagePath =
        imageUrlObject.pathname.split(marker)[1];

      if (!imagePath) return;

      const supabase = createClient();

      const { error } = await supabase.storage
        .from("blog-images")
        .remove([
          decodeURIComponent(imagePath),
        ]);

      if (error) {
        console.error(
          "Storage image delete error:",
          error
        );
      }
    } catch (error) {
      console.error(
        "Image URL parsing error:",
        error
      );
    }
  };

  // --------------------------------
  // DELETE ARTICLE
  // --------------------------------

  const handleDelete = async (blog: Blog) => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"?\n\nThis will permanently delete the article and its cover image.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(blog.id);

      const supabase = createClient();

      // Delete cover image first
      await deleteStorageImage(blog.image_url);

      // Delete database record
      const { error } = await supabase
        .from("blogs")
        .delete()
        .eq("id", blog.id);

      if (error) {
        console.error(
          "Delete blog error:",
          error
        );

        alert(error.message);
        return;
      }

      setBlogs((currentBlogs) =>
        currentBlogs.filter(
          (item) => item.id !== blog.id
        )
      );

      alert("Article deleted successfully.");
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while deleting the article."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------
  // FILTER BUTTON
  // --------------------------------

  const filters: {
    key: Filter;
    label: string;
    count: number;
  }[] = [
    {
      key: "all",
      label: "All",
      count: blogs.length,
    },
    {
      key: "published",
      label: "Published",
      count: publishedCount,
    },
    {
      key: "draft",
      label: "Drafts",
      count: draftCount,
    },
  ];

  // --------------------------------
  // PAGE
  // --------------------------------

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* -------------------------------- */}
      {/* HEADER */}
      {/* -------------------------------- */}

      <div className="flex flex-col gap-7 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7a66a]">
            Content Studio
          </p>

          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            All Articles
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
            Manage, edit and publish articles for the
            Mohit Jat journal.
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

      {/* -------------------------------- */}
      {/* SUMMARY */}
      {/* -------------------------------- */}

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <SummaryCard
          label="Total Articles"
          value={blogs.length}
          icon={FileText}
        />

        <SummaryCard
          label="Published"
          value={publishedCount}
          icon={Eye}
        />

        <SummaryCard
          label="Drafts"
          value={draftCount}
          icon={Pencil}
        />
      </div>

      {/* -------------------------------- */}
      {/* SEARCH + FILTER */}
      {/* -------------------------------- */}

      <div className="mt-12 border-y border-white/10 py-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* SEARCH */}

          <div className="relative w-full lg:max-w-lg">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
            />

            <input
              type="text"
              placeholder="Search articles by title or description..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.03] pl-11 pr-10 text-sm text-white outline-none placeholder:text-white/25 transition-colors focus:border-[#c7a66a]/50"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/25 hover:text-white"
              >
                ×
              </button>
            )}
          </div>

          {/* FILTER */}

          <div className="flex w-full overflow-x-auto rounded-xl border border-white/10 bg-white/[0.02] p-1 lg:w-fit">
            {filters.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() =>
                  setFilter(item.key)
                }
                className={`flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-[10px] uppercase tracking-[0.15em] transition-all ${
                  filter === item.key
                    ? "bg-white/[0.08] text-white"
                    : "text-white/35 hover:text-white/70"
                }`}
              >
                {item.label}

                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                    filter === item.key
                      ? "bg-white/10 text-white/60"
                      : "text-white/20"
                  }`}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RESULT INFO */}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
            {search
              ? `Search results for "${search}"`
              : filter === "all"
                ? "All articles"
                : `${filter} articles`}
          </p>

          <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
            {filteredBlogs.length} of {blogs.length}{" "}
            articles
          </p>
        </div>
      </div>

      {/* -------------------------------- */}
      {/* LOADING */}
      {/* -------------------------------- */}

      {loading ? (
        <LoadingState />
      ) : filteredBlogs.length === 0 ? (
        <EmptyState
          search={search}
          filter={filter}
          onClear={() => {
            setSearch("");
            setFilter("all");
          }}
        />
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          {filteredBlogs.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{
                opacity: 0,
                y: 18,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              className="group border-b border-white/10 bg-white/[0.02] p-5 last:border-b-0 transition-colors hover:bg-white/[0.045] md:p-6"
            >
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
                {/* -------------------------------- */}
                {/* IMAGE */}
                {/* -------------------------------- */}

                <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-xl bg-black sm:h-56 xl:h-32 xl:w-52">
                  {blog.image_url ? (
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <FileText
                        size={30}
                        className="text-white/15"
                      />
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-black/15" />

                  {/* STATUS */}

                  <div className="absolute left-3 top-3">
                    <span
                      className={`rounded-full border bg-black/50 px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] backdrop-blur-md ${
                        blog.status === "published"
                          ? "border-[#c7a66a]/30 text-[#c7a66a]"
                          : "border-white/10 text-white/50"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </div>
                </div>

                {/* -------------------------------- */}
                {/* CONTENT */}
                {/* -------------------------------- */}

                <div className="min-w-0 flex-1">
                  {/* META */}

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/25">
                      <CalendarDays size={12} />

                      {formatDate(blog)}
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-white/25">
                      <Clock3 size={12} />

                      {blog.read_time || 1} min
                    </span>
                  </div>

                  {/* TITLE */}

                  <h2 className="mt-4 line-clamp-2 font-display text-2xl leading-tight text-white/85 transition-colors group-hover:text-white md:text-3xl">
                    {blog.title}
                  </h2>

                  {/* EXCERPT */}

                  <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-white/35">
                    {blog.excerpt ||
                      "No description available."}
                  </p>

                  {/* SLUG */}

                  <p className="mt-4 truncate text-[10px] tracking-[0.08em] text-white/15">
                    /blog/{blog.slug}
                  </p>
                </div>

                {/* -------------------------------- */}
                {/* ACTIONS */}
                {/* -------------------------------- */}

                <div className="flex items-center gap-2 border-t border-white/10 pt-5 xl:border-t-0 xl:pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-white/25 hover:bg-white/[0.05] hover:text-white"
                    title="View article"
                  >
                    <Eye size={16} />
                  </Link>

                  <Link
                    href={`/admin/blogs/${blog.slug}/edit`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-[#c7a66a]/40 hover:bg-[#c7a66a]/10 hover:text-[#c7a66a]"
                    title="Edit article"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(blog)
                    }
                    disabled={
                      deletingId === blog.id
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Delete article"
                  >
                    {deletingId === blog.id ? (
                      <span className="h-4 w-4 animate-spin rounded-full border border-white/20 border-t-red-300" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* -------------------------------- */}
      {/* FOOTER */}
      {/* -------------------------------- */}

      {!loading && blogs.length > 0 && (
        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.15em] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Showing {filteredBlogs.length} of{" "}
            {blogs.length} articles
          </span>

          <span>
            Mohit Jat · Content Studio
          </span>
        </div>
      )}
    </div>
  );
}

// --------------------------------
// SUMMARY CARD
// --------------------------------

function SummaryCard({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: number;
 icon: LucideIcon;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 transition-colors hover:bg-white/[0.04]"
    >
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/30">
          {label}
        </p>

        <Icon
          size={16}
          className="text-white/20 transition-colors group-hover:text-[#c7a66a]/60"
        />
      </div>

      <p className="mt-6 font-display text-4xl">
        {String(value).padStart(2, "0")}
      </p>
    </motion.div>
  );
}

// --------------------------------
// LOADING STATE
// --------------------------------

function LoadingState() {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse border-b border-white/10 bg-white/[0.02] p-5 last:border-b-0 md:p-6"
        >
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center">
            <div className="h-48 w-full rounded-xl bg-white/[0.04] sm:h-56 xl:h-32 xl:w-52" />

            <div className="flex-1">
              <div className="h-3 w-32 rounded bg-white/[0.05]" />

              <div className="mt-5 h-8 w-3/4 rounded bg-white/[0.05]" />

              <div className="mt-4 h-4 w-full max-w-xl rounded bg-white/[0.04]" />

              <div className="mt-2 h-4 w-2/3 rounded bg-white/[0.04]" />
            </div>

            <div className="flex gap-2">
              <div className="h-11 w-11 rounded-full bg-white/[0.04]" />
              <div className="h-11 w-11 rounded-full bg-white/[0.04]" />
              <div className="h-11 w-11 rounded-full bg-white/[0.04]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// --------------------------------
// EMPTY STATE
// --------------------------------

function EmptyState({
  search,
  filter,
  onClear,
}: {
  search: string;
  filter: Filter;
  onClear: () => void;
}) {
  const hasFilters =
    search.trim().length > 0 ||
    filter !== "all";

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] py-24 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
        <Search
          size={22}
          className="text-white/20"
        />
      </div>

      <h3 className="mt-6 font-display text-2xl">
        No articles found
      </h3>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/35">
        {hasFilters
          ? "No articles match your current search or filter."
          : "You haven't created any articles yet."}
      </p>

      {hasFilters ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-7 rounded-full border border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-white/50 transition-colors hover:border-white/20 hover:text-white"
        >
          Clear Filters
        </button>
      ) : (
        <Link
          href="/admin/blogs/new"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#c7a66a] px-5 py-3 text-[10px] uppercase tracking-[0.14em] text-[#111] transition-transform hover:-translate-y-0.5"
        >
          <Plus size={15} />
          Create First Article
        </Link>
      )}
    </div>
  );
}