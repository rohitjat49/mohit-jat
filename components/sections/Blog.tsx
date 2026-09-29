"use client";

import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  read_time: number | null;
  published_at: string | null;
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let mounted = true;

    async function loadPosts() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("blogs")
        .select(
          "slug, title, excerpt, image_url, read_time, published_at"
        )
        .eq("status", "published")
        .order("published_at", {
          ascending: false,
        })
        .limit(3);

      if (error) {
        console.error(
          "Homepage blog fetch error:",
          error
        );

        if (mounted) {
          setPosts([]);
          setLoading(false);
        }

        return;
      }

      if (mounted) {
        setPosts((data || []) as BlogPost[]);
        setLoading(false);
      }
    }

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const formatDate = (
    publishedAt: string | null
  ) => {
    if (!publishedAt) {
      return "Published";
    }

    return new Date(
      publishedAt
    ).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      id="blog"
      className="relative overflow-hidden bg-[#f3f0e8] py-32 text-[#151515] md:py-48"
    >
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
              <span className="h-px w-6 bg-[#967746]" />

              <p className="eyebrow !text-black/45">
                06 / Journal
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
              Ideas,
              <br />

              <span className="italic text-[#967746]">
                observations.
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
              Notes on cosmetic science, formulation,
              research, product development and the ideas
              behind the work.
            </motion.p>
          </div>
        </div>

        {/* =========================================
            BLOG LIST
        ========================================= */}

        <div className="mt-24 border-t border-black/15 md:mt-32">
          {loading ? (
            <>
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border-b border-black/15 py-10 md:py-12"
                >
                  <div className="grid gap-8 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-2">
                      <div className="h-3 w-24 animate-pulse bg-black/10" />
                    </div>

                    <div className="md:col-span-7">
                      <div className="h-10 w-3/4 animate-pulse bg-black/10 md:h-14" />

                      <div className="mt-5 h-4 w-full max-w-xl animate-pulse bg-black/[0.07]" />

                      <div className="mt-3 h-4 w-2/3 max-w-md animate-pulse bg-black/[0.07]" />
                    </div>

                    <div className="md:col-span-3 md:flex md:justify-end">
                      <div className="h-14 w-14 animate-pulse rounded-full bg-black/[0.07]" />
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : posts.length === 0 ? (
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              className="py-20 text-center"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-black/35">
                New articles coming soon.
              </p>
            </motion.div>
          ) : (
            posts.map((post, index) => (
              <motion.article
                key={post.slug}
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
                  amount: 0.15,
                }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduceMotion
                    ? 0
                    : index * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group border-b border-black/15 py-10 md:py-12"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block"
                >
                  <div className="grid gap-8 md:grid-cols-12 md:items-center">
                    {/* =================================
                        DATE
                    ================================= */}

                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] tracking-[0.18em] text-[#967746]">
                          {String(index + 1).padStart(
                            2,
                            "0"
                          )}
                        </span>

                        <span className="hidden h-px w-5 bg-black/10 md:block" />
                      </div>

                      <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-black/40">
                        {formatDate(
                          post.published_at
                        )}
                      </p>
                    </div>

                    {/* =================================
                        IMAGE
                    ================================= */}

                    <div className="relative aspect-[16/9] overflow-hidden bg-[#111] md:col-span-3">
                      {post.image_url ? (
                        <motion.img
                          src={post.image_url}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover"
                          initial={{
                            scale: shouldReduceMotion
                              ? 1
                              : 1.06,
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
                                  scale: 1.08,
                                }
                          }
                          transition={{
                            duration: 1.1,
                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                            Journal
                          </span>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-black/0" />

                      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>

                    {/* =================================
                        CONTENT
                    ================================= */}

                    <div className="md:col-span-6">
                      <h3 className="font-display text-3xl leading-[1.08] tracking-[-0.02em] transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">
                        {post.title}
                      </h3>

                      {post.excerpt && (
                        <p className="mt-5 max-w-xl text-sm leading-7 text-black/50 transition-colors duration-500 group-hover:text-black/65 md:text-base">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-black/35">
                        <Clock3 size={13} />

                        <span>
                          {post.read_time || 1} min
                          read
                        </span>
                      </div>
                    </div>

                    {/* =================================
                        ARROW
                    ================================= */}

                    <div className="flex justify-start md:col-span-1 md:justify-end">
                      <motion.div
                        whileHover={
                          shouldReduceMotion
                            ? undefined
                            : {
                                y: -7,
                                scale: 1.04,
                              }
                        }
                        transition={{
                          duration: 0.3,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex h-12 w-12 items-center justify-center rounded-full border border-black/15 transition-all duration-500 group-hover:border-[#967746] group-hover:bg-[#967746] group-hover:text-white md:h-14 md:w-14"
                      >
                        <ArrowUpRight
                          size={19}
                          className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))
          )}
        </div>

        {/* =========================================
            VIEW ALL
        ========================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: shouldReduceMotion ? 0 : 15,
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
            delay: 0.1,
          }}
          className="mt-10 flex justify-end"
        >
          <Link
            href="/blog"
            className="group inline-flex items-center gap-3 border-b border-black/20 pb-2 text-[10px] uppercase tracking-[0.18em] text-black/60 transition-colors hover:border-[#967746] hover:text-black"
          >
            View all articles

            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* =========================================
          BACKGROUND TYPOGRAPHY
      ========================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-30px] left-0 select-none"
      >
        <span className="font-display text-[22vw] leading-none tracking-[-0.06em] text-black/[0.025]">
          JOURNAL
        </span>
      </div>
    </section>
  );
}