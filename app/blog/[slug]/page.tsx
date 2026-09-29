import type { Metadata } from "next";
import {
  ArrowUpRight,
  Clock3,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Navbar from "@/components/navbar/Navbar";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

type Blog = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  status: "published" | "draft";
  read_time: number | null;
  published_at: string | null;
};

type RelatedBlog = {
  slug: string;
  title: string;
  excerpt: string | null;
  image_url: string | null;
  read_time: number | null;
  published_at: string | null;
};

async function getArticle(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select(
      "slug, title, excerpt, content, image_url, status, read_time, published_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  return data as Blog;
}

async function getRelatedArticles(currentSlug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("blogs")
    .select(
      "slug, title, excerpt, image_url, read_time, published_at"
    )
    .eq("status", "published")
    .neq("slug", currentSlug)
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error(
      "Related articles fetch error:",
      error
    );

    return [];
  }

  return (data || []) as RelatedBlog[];
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Mohit Jat",
      description:
        "The requested article could not be found.",
    };
  }

  const description =
    article.excerpt ||
    "Research, formulation, cosmetic science and product development insights by Mohit Jat.";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mohitjat.com";

  const articleUrl = `${siteUrl}/blog/${article.slug}`;

  return {
    title: `${article.title} | Mohit Jat`,
    description,

    alternates: {
      canonical: articleUrl,
    },

    openGraph: {
      title: article.title,
      description,
      url: articleUrl,
      siteName: "Mohit Jat",
      type: "article",

      ...(article.published_at
        ? {
            publishedTime: article.published_at,
          }
        : {}),

      ...(article.image_url
        ? {
            images: [
              {
                url: article.image_url,
                alt: article.title,
              },
            ],
          }
        : {}),
    },

    twitter: {
      card: article.image_url
        ? "summary_large_image"
        : "summary",
      title: article.title,
      description,

      ...(article.image_url
        ? {
            images: [article.image_url],
          }
        : {}),
    },
  };
}

export default async function BlogArticlePage({
  params,
}: Props) {
  const { slug } = await params;

  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles =
    await getRelatedArticles(slug);

  const formattedDate = article.published_at
    ? new Date(
        article.published_at
      ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "Published";
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mohitjat.com";

  const articleUrl = `${siteUrl}/blog/${article.slug}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description:
      article.excerpt ||
      "Research, formulation, cosmetic science and product development insights by Mohit Jat.",
    url: articleUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: "Mohit Jat",
      url: siteUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Mohit Jat",
      url: siteUrl,
    },
    ...(article.image_url
      ? {
          image: [article.image_url],
        }
      : {}),
    ...(article.published_at
      ? {
          datePublished: article.published_at,
          dateModified: article.published_at,
        }
      : {}),
  };

 
   return (
  <main className="min-h-screen bg-[#f3f0e8] text-[#151515]">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          ARTICLE HEADER
      ===================================================== */}

      <section className="container pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="grid gap-12 md:grid-cols-12">
          {/* META */}

          <div className="md:col-span-2">
            <p className="eyebrow !text-black/45">
              Journal
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.14em] text-black/40">
                {formattedDate}
              </span>

              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-black/40">
                <Clock3 size={13} />
                {article.read_time || 1} min read
              </span>
            </div>
          </div>

          {/* TITLE */}

          <div className="md:col-span-9 md:col-start-4">
            <h1 className="font-display text-[clamp(3.5rem,8vw,8.5rem)] leading-[0.88] tracking-[-0.055em]">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mt-12 max-w-3xl font-display text-xl leading-relaxed text-black/55 md:text-3xl">
                {article.excerpt}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          HERO IMAGE
      ===================================================== */}

      {article.image_url && (
        <section className="container">
          <div className="group relative aspect-[16/9] overflow-hidden bg-black md:aspect-[2/1]">
            <img
              src={article.image_url}
              alt={article.title}
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/65">
                Cosmetic Science · Research · Development
              </p>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          ARTICLE BODY
      ===================================================== */}

      <article className="container py-28 md:py-40">
        <div className="grid gap-12 md:grid-cols-12">
          {/* LEFT INFORMATION */}

          <aside className="md:col-span-2">
            <p className="eyebrow !text-black/40">
              Article
            </p>

            <div className="mt-7 hidden border-l border-black/10 pl-4 md:block">
              <p className="text-xs leading-7 text-black/40">
                Research
                <br />
                Formulation
                <br />
                Ingredients
                <br />
                Stability
                <br />
                Development
              </p>
            </div>
          </aside>

          {/* CONTENT */}

          <div className="md:col-span-8 md:col-start-4">
            {!article.content ? (
              <p className="text-base leading-8 text-black/50 md:text-lg">
                This article does not have any content yet.
              </p>
            ) : (
              <section>
                {/* SECTION NUMBER */}

                <div className="mb-5 flex items-center gap-4">
                  <span className="text-xs uppercase tracking-[0.18em] text-[#967746]">
                    01
                  </span>

                  <span className="h-px w-8 bg-[#967746]/40" />
                </div>

                {/* HEADING */}

                <h2 className="font-display text-3xl leading-tight md:text-5xl">
                  The article
                </h2>

                {/* RICH CONTENT */}

                <div
                  className="article-content mt-7"
                  dangerouslySetInnerHTML={{
                    __html: article.content,
                  }}
                />
              </section>
            )}
          </div>
        </div>
      </article>

      {/* =====================================================
          RELATED ARTICLES
      ===================================================== */}

      {relatedArticles.length > 0 && (
        <section className="border-t border-black/10">
          <div className="container py-24 md:py-32">
            {/* SECTION HEADER */}

            <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-2">
                <p className="eyebrow !text-black/40">
                  Journal
                </p>
              </div>

              <div className="md:col-span-7 md:col-start-4">
                <h2 className="font-display text-4xl leading-tight md:text-6xl">
                  More from
                  <br />
                  <span className="italic text-[#967746]">
                    the journal.
                  </span>
                </h2>
              </div>

              <div className="md:col-span-2 md:col-start-11 md:flex md:justify-end">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-black/45 transition-colors hover:text-black"
                >
                  View all
                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>

            {/* ARTICLES */}

            <div className="grid gap-6 md:grid-cols-3">
              {relatedArticles.map(
                (related, index) => {
                  const relatedDate =
                    related.published_at
                      ? new Date(
                          related.published_at
                        ).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Published";

                  return (
                    <Link
                      key={related.slug}
                      href={`/blog/${related.slug}`}
                      className="group"
                    >
                      {/* IMAGE */}

                      <div className="relative aspect-[4/3] overflow-hidden bg-black">
                        {related.image_url ? (
                          <img
                            src={related.image_url}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.15em] text-white/30">
                            No Image
                          </div>
                        )}

                        <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />

                        {/* NUMBER */}

                        <div className="absolute left-4 top-4">
                          <span className="text-[10px] uppercase tracking-[0.16em] text-white/70">
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div className="pt-6">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] uppercase tracking-[0.15em] text-[#967746]">
                            {relatedDate}
                          </span>

                          <ArrowUpRight
                            size={16}
                            className="text-black/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#967746]"
                          />
                        </div>

                        <h3 className="mt-4 font-display text-2xl leading-tight transition-transform duration-500 group-hover:translate-x-1 md:text-3xl">
                          {related.title}
                        </h3>

                        {related.excerpt && (
                          <p className="mt-4 line-clamp-3 text-sm leading-7 text-black/45">
                            {related.excerpt}
                          </p>
                        )}

                        <div className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/35">
                          <Clock3 size={13} />
                          {related.read_time || 1} min read
                        </div>
                      </div>
                    </Link>
                  );
                }
              )}
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          BACK TO JOURNAL
      ===================================================== */}

      <section className="border-t border-black/10">
        <div className="container py-16 md:py-24">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow !text-black/40">
                Continue reading
              </p>

              <h3 className="mt-4 font-display text-3xl md:text-5xl">
                Explore more ideas.
              </h3>
            </div>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-3 border-b border-black/20 pb-2 text-xs uppercase tracking-[0.18em] transition-colors hover:border-[#967746]"
            >
              Back to journal

              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-black/10">
        <div className="container flex flex-col gap-4 py-8 text-xs uppercase tracking-[0.15em] text-black/35 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} Mohit Jat
          </span>

          <Link
            href="/"
            className="transition-colors hover:text-black"
          >
            Mohit Jat
          </Link>
        </div>
      </footer>
    </main>
  );
}