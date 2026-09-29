"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Clock3 } from "lucide-react";
import Link from "next/link";

type Blog = {
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  status: "published" | "draft";
  read_time: number | null;
  published_at: string | null;
};

type BlogListProps = {
  posts: Blog[];
};

const revealUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
     ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function BlogList({
  posts,
}: BlogListProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.05,
      }}
    >
      {posts.map((post, index) => {
        const formattedDate = post.published_at
          ? new Date(
              post.published_at
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : "Published";

        return (
          <motion.div
            key={post.slug}
            variants={revealUp}
          >
            <Link
              href={`/blog/${post.slug}`}
              className="group block border-b border-black/15 py-10 md:py-14"
            >
              <div className="grid gap-8 md:grid-cols-12 md:items-center">
                {/* DATE */}

                <div className="md:col-span-2">
                  <div className="overflow-hidden">
                    <motion.p
                      className="text-[10px] uppercase tracking-[0.16em] text-[#967746]"
                      initial={{
                        y: 20,
                        opacity: 0,
                      }}
                      whileInView={{
                        y: 0,
                        opacity: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                      }}
                    >
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </motion.p>
                  </div>

                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-black/40">
                    {formattedDate}
                  </p>
                </div>

                {/* IMAGE */}

                <div className="relative aspect-[16/10] overflow-hidden bg-black md:col-span-3">
                  {post.image_url ? (
                    <motion.img
                      src={post.image_url}
                      alt={post.title}
                      className="h-full w-full object-cover"
                      initial={{
                        scale: 1.08,
                      }}
                      whileInView={{
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.2,
                      }}
                      transition={{
                        duration: 1.2,
                       ease: [0.22, 1, 0.36, 1] as const,
                      }}
                      whileHover={{
                        scale: 1.08,
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-white/30">
                      No Image
                    </div>
                  )}

                  <motion.div
                    className="absolute inset-0 bg-black/15"
                    initial={{
                      opacity: 1,
                    }}
                    whileHover={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.5,
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                </div>

                {/* CONTENT */}

                <div className="md:col-span-6">
                  <h2 className="font-display text-3xl leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                    {post.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-black/50 transition-colors duration-500 group-hover:text-black/65 md:text-base">
                    {post.excerpt ||
                      "Read the full article."}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-black/35">
                    <Clock3 size={14} />
                    {post.read_time || 1} min read
                  </div>
                </div>

                {/* ARROW */}

                <div className="flex md:col-span-1 md:justify-end">
                  <motion.div
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-colors duration-500 group-hover:border-[#967746] group-hover:bg-[#967746] group-hover:text-white"
                    whileHover={{
                      y: -8,
                      scale: 1.05,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </motion.div>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}