"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import RichTextEditor from "@/components/admin/RichTextEditor";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  ImagePlus,
  Save,
  X,
} from "lucide-react";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

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
};

export default function EditBlogPage({ params }: Props) {
  const [slug, setSlug] = useState("");

  const [blog, setBlog] = useState<Blog | null>(null);

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  // --------------------------------
  // LOAD PARAMS
  // --------------------------------

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    loadParams();
  }, [params]);

  // --------------------------------
  // LOAD ARTICLE
  // --------------------------------

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Fetch blog error:", error);
          alert(error.message);
          return;
        }

        if (!data) {
          alert("Article not found.");
          return;
        }

        setBlog(data);

        setTitle(data.title || "");
        setExcerpt(data.excerpt || "");
        setContent(data.content || "");
        setImage(data.image_url || "");
        setStatus(data.status || "draft");
      } catch (error) {
        console.error(error);
        alert("Something went wrong while loading the article.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // --------------------------------
  // READING TIME
  // --------------------------------

  const getReadingTime = () => {
    const plainText = content
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (!plainText) {
      return 1;
    }

    const wordCount = plainText
      .split(/\s+/)
      .filter(Boolean).length;

    return Math.max(1, Math.ceil(wordCount / 200));
  };

  // --------------------------------
  // SLUG
  // --------------------------------

  const generateSlug = (value: string) => {
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!generatedSlug) {
      return `article-${Date.now()}`;
    }

    return generatedSlug;
  };

  // --------------------------------
  // UNIQUE SLUG
  // --------------------------------

  const generateUniqueSlug = async (
    value: string,
    currentSlug: string
  ) => {
    const supabase = createClient();

    const baseSlug = generateSlug(value);

    // If generated slug is same as current slug,
    // keep the existing slug.
    if (baseSlug === currentSlug) {
      return currentSlug;
    }

    let newSlug = baseSlug;
    let counter = 2;

    while (true) {
      const { data, error } = await supabase
        .from("blogs")
        .select("id")
        .eq("slug", newSlug)
        .neq("id", blog?.id || "");

      if (error) {
        console.error("Slug check error:", error);
        throw new Error("Unable to check article slug.");
      }

      if (!data || data.length === 0) {
        return newSlug;
      }

      newSlug = `${baseSlug}-${counter}`;
      counter++;
    }
  };

  // --------------------------------
  // IMAGE UPLOAD
  // --------------------------------

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const supabase = createClient();

      // Delete old Supabase image
      if (image) {
        try {
          const imageUrl = new URL(image);

          const marker =
            "/storage/v1/object/public/blog-images/";

          if (imageUrl.pathname.includes(marker)) {
            const oldPath =
              imageUrl.pathname.split(marker)[1];

            if (oldPath) {
              await supabase.storage
                .from("blog-images")
                .remove([decodeURIComponent(oldPath)]);
            }
          }
        } catch (error) {
          console.error(
            "Old image delete error:",
            error
          );
        }
      }

      const fileExt =
        file.name.split(".").pop()?.toLowerCase() ||
        "jpg";

      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const filePath = `articles/${fileName}`;

      const { error } = await supabase.storage
        .from("blog-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.error("Image upload error:", error);
        alert(error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage
        .from("blog-images")
        .getPublicUrl(filePath);

      setImage(publicUrl);

      // Reset file input
      e.target.value = "";

      alert("Image replaced successfully!");
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    }
  };

  // --------------------------------
  // REMOVE IMAGE
  // --------------------------------

  const removeImage = async () => {
    if (!image) return;

    try {
      const supabase = createClient();

      const imageUrl = new URL(image);

      const marker =
        "/storage/v1/object/public/blog-images/";

      if (imageUrl.pathname.includes(marker)) {
        const oldPath =
          imageUrl.pathname.split(marker)[1];

        if (oldPath) {
          await supabase.storage
            .from("blog-images")
            .remove([decodeURIComponent(oldPath)]);
        }
      }
    } catch (error) {
      console.error("Image remove error:", error);
    }

    setImage("");
  };

  // --------------------------------
  // UPDATE ARTICLE
  // --------------------------------

  const updateArticle = async () => {
    if (!blog) return;

    if (!title.trim()) {
      alert("Please enter an article title.");
      return;
    }

    if (!content.trim()) {
      alert("Please write some article content.");
      return;
    }

    try {
      setSaving(true);

      const supabase = createClient();

      const newSlug = await generateUniqueSlug(
        title,
        blog.slug
      );

      const readTime = getReadingTime();

      const updateData = {
        title: title.trim(),
        slug: newSlug,
        excerpt: excerpt.trim(),
        content: content.trim(),
        image_url: image || null,
        status,
        read_time: readTime,
        published_at:
          status === "published"
            ? blog.published_at ||
              new Date().toISOString()
            : null,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("blogs")
        .update(updateData)
        .eq("id", blog.id);

      if (error) {
        console.error(
          "Update article error:",
          error
        );

        alert(error.message);
        return;
      }

      alert("Article updated successfully!");

      window.location.href = "/admin/blogs";
    } catch (error) {
      console.error(error);

      alert(
        "Something went wrong while updating the article."
      );
    } finally {
      setSaving(false);
    }
  };

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#c7a66a]" />

          <p className="mt-5 text-sm text-white/35">
            Loading article...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------
  // ARTICLE NOT FOUND
  // --------------------------------

  if (!blog) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl">
            Article not found
          </h1>

          <p className="mt-3 text-sm text-white/35">
            The article you are trying to edit does not
            exist.
          </p>

          <Link
            href="/admin/blogs"
            className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-[#c7a66a]"
          >
            <ArrowLeft size={14} />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------
  // PREVIEW
  // --------------------------------

  if (preview) {
    return (
      <main className="min-h-screen bg-[#f3f0e8] text-[#151515]">
        <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-8 md:py-16">
          <button
            type="button"
            onClick={() => setPreview(false)}
            className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black/45 transition-colors hover:text-black"
          >
            <ArrowLeft size={15} />
            Back to Editor
          </button>

          <div className="flex flex-wrap items-center gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#967746]">
              Article Preview
            </p>

            <span className="rounded-full border border-black/10 px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-black/40">
              {status}
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-8xl">
            {title || "Your article title"}
          </h1>

          <p className="mt-8 max-w-2xl font-display text-xl leading-relaxed text-black/50 md:text-2xl">
            {excerpt ||
              "Your article excerpt will appear here."}
          </p>

          <div className="mt-8 flex flex-wrap gap-5 text-[10px] uppercase tracking-[0.15em] text-black/40">
            <span>
              {getReadingTime()} min read
            </span>

            <span>·</span>

            <span>Mohit Jat</span>
          </div>

          {image && (
            <div className="mt-12 overflow-hidden bg-black">
              <img
                src={image}
                alt={title || "Article cover"}
                className="max-h-[600px] w-full object-contain"
              />
            </div>
          )}

          {content ? (
            <article
              className="article-content mt-16"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          ) : (
            <article className="mt-16 text-base leading-8 text-black/40 md:text-lg md:leading-9">
              Your article content will appear here.
            </article>
          )}
        </div>
      </main>
    );
  }

  // --------------------------------
  // EDITOR
  // --------------------------------

  return (
    <div className="mx-auto max-w-[1400px]">
      {/* HEADER */}

      <div className="flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Link
            href="/admin/blogs"
            className="mb-6 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-white/35 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            All Articles
          </Link>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#c7a66a]">
            Content Studio
          </p>

          <h1 className="mt-3 font-display text-4xl tracking-tight md:text-6xl">
            Edit Article
          </h1>

          <p className="mt-4 text-sm text-white/35">
            Update your article content, image and
            publishing status.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setPreview(true)}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.14em] text-white/55 transition-all hover:border-white/25 hover:text-white"
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      {/* MAIN */}

      <div className="mt-10 grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* MAIN EDITOR */}

        <div className="space-y-6">
          {/* TITLE */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Article Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              placeholder="What Makes a Cosmetic Formulation Work?"
              className="mt-5 w-full border-b border-white/10 bg-transparent pb-5 font-display text-3xl text-white outline-none placeholder:text-white/15 focus:border-[#c7a66a]/50 md:text-5xl"
            />
          </div>

          {/* EXCERPT */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Short Description
            </label>

            <textarea
              value={excerpt}
              onChange={(e) =>
                setExcerpt(e.target.value)
              }
              placeholder="Write a short description for the article..."
              rows={4}
              className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-white outline-none placeholder:text-white/20 focus:border-[#c7a66a]/40"
            />

            <p className="mt-3 text-[10px] text-white/20">
              This appears on the blog listing and
              article header.
            </p>
          </div>

          {/* CONTENT */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 md:p-8">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Article Content
              </label>

              <span className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                Rich content
              </span>
            </div>

            <div className="mt-5">
              <RichTextEditor
                value={content}
                onChange={setContent}
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] text-white/20">
                {content.length} characters
              </span>

              <span className="text-[10px] text-white/20">
                {getReadingTime()} min read
              </span>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}

        <aside className="space-y-6">
          {/* COVER IMAGE */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                Cover Image
              </p>

              {image && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-white/25 transition-colors hover:text-red-300"
                  title="Remove image"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {image ? (
              <div className="mt-5 overflow-hidden rounded-xl bg-black">
                <img
                  src={image}
                  alt={title || "Article cover"}
                  className="max-h-[500px] w-full object-contain"
                />
              </div>
            ) : (
              <label className="mt-5 flex aspect-[4/3] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] transition-colors hover:border-[#c7a66a]/40 hover:bg-white/[0.04]">
                <ImagePlus
                  size={25}
                  className="text-white/25"
                />

                <span className="mt-4 text-xs text-white/40">
                  Upload cover image
                </span>

                <span className="mt-2 text-[10px] text-white/20">
                  JPG, PNG, WEBP
                </span>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}

            {image && (
              <label className="mt-4 flex cursor-pointer items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-[10px] uppercase tracking-[0.14em] text-white/40 transition-colors hover:border-white/20 hover:text-white">
                Replace Image

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* IMAGE URL */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Image URL
            </p>

            <input
              type="text"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
              className="mt-5 h-12 w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 text-xs text-white outline-none placeholder:text-white/20 focus:border-[#c7a66a]/40"
              placeholder="https://..."
            />

            <p className="mt-3 text-[10px] leading-5 text-white/20">
              You can also use an external image URL.
            </p>
          </div>

          {/* ARTICLE INFO */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Article Info
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                  Current Status
                </p>

                <p
                  className={`mt-2 text-sm ${
                    status === "published"
                      ? "text-[#c7a66a]"
                      : "text-white/50"
                  }`}
                >
                  {status === "published"
                    ? "Published"
                    : "Draft"}
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                  Author
                </p>

                <p className="mt-2 text-sm text-white/60">
                  Mohit Jat
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                  Reading Time
                </p>

                <p className="mt-2 text-sm text-white/60">
                  {getReadingTime()} min
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                  Slug
                </p>

                <p className="mt-2 break-all text-xs text-white/35">
                  /blog/{blog.slug}
                </p>
              </div>
            </div>
          </div>

          {/* STATUS */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Publishing Status
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() =>
                  setStatus("draft")
                }
                className={`rounded-xl border px-4 py-3 text-xs uppercase tracking-[0.14em] transition-all ${
                  status === "draft"
                    ? "border-white/20 bg-white/[0.08] text-white"
                    : "border-white/10 text-white/30 hover:text-white/60"
                }`}
              >
                Draft
              </button>

              <button
                type="button"
                onClick={() =>
                  setStatus("published")
                }
                className={`rounded-xl border px-4 py-3 text-xs uppercase tracking-[0.14em] transition-all ${
                  status === "published"
                    ? "border-[#c7a66a]/40 bg-[#c7a66a]/10 text-[#c7a66a]"
                    : "border-white/10 text-white/30 hover:text-white/60"
                }`}
              >
                Published
              </button>
            </div>
          </div>

          {/* SAVE */}

          <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Save Changes
            </p>

            <p className="mt-4 text-xs leading-6 text-white/30">
              Your changes will be saved directly to this
              article.
            </p>

            <button
              type="button"
              onClick={updateArticle}
              disabled={saving}
              className="group mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-[#c7a66a] px-5 py-4 text-xs uppercase tracking-[0.14em] text-[#111] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d4b879] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />

              {saving
                ? "Saving..."
                : "Save Changes"}

              {!saving && (
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* BOTTOM NOTE */}

      <div className="mt-8 border-t border-white/10 pt-6">
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
          Content Studio · Edit Article
        </p>
      </div>
    </div>
  );
}