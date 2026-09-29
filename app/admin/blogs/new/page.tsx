"use client";

import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { motion } from "framer-motion";
import RichTextEditor from "@/components/admin/RichTextEditor";
import {
  ArrowLeft,
  ImagePlus,
  Eye,
  Save,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";

export default function NewBlogPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(false);

  // --------------------------------
  // IMAGE UPLOAD
  // --------------------------------

  const handleImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const supabase = createClient();

      const fileExt = file.name.split(".").pop();
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
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    }
  };

  const removeImage = () => {
    setImage("");
  };

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
    const slug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Hindi / non-English title fallback
    if (!slug) {
      return `article-${Date.now()}`;
    }

    return slug;
  };

  // --------------------------------
  // UNIQUE SLUG
  // --------------------------------

  const generateUniqueSlug = async (value: string) => {
    const supabase = createClient();

    const baseSlug = generateSlug(value);

    let slug = baseSlug;
    let counter = 2;

    while (true) {
      const { data, error } = await supabase
        .from("blogs")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Slug check error:", error);
        throw new Error("Unable to check article slug.");
      }

      if (!data) {
        return slug;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }
  };

  // --------------------------------
  // SAVE DRAFT
  // --------------------------------

  const saveDraft = async () => {
    if (!title.trim()) {
      alert("Please enter an article title.");
      return;
    }

    try {
      const supabase = createClient();

      const slug = await generateUniqueSlug(title);
      const readTime = getReadingTime();

      const { error } = await supabase
        .from("blogs")
        .insert({
          title: title.trim(),
          slug,
          excerpt: excerpt.trim(),
          content: content.trim(),
          image_url: image || null,
          status: "draft",
          read_time: readTime,
        });

      if (error) {
        console.error("Save draft error:", error);
        alert(error.message);
        return;
      }

      alert("Draft saved successfully!");

      window.location.href = "/admin/blogs";
    } catch (error) {
      console.error(error);
      alert("Something went wrong while saving the draft.");
    }
  };

  // --------------------------------
  // PUBLISH ARTICLE
  // --------------------------------

  const publishArticle = async () => {
    if (!title.trim()) {
      alert("Please enter an article title.");
      return;
    }

    if (!content.trim()) {
      alert("Please write some article content.");
      return;
    }

    try {
      const supabase = createClient();

      const slug = await generateUniqueSlug(title);
      const readTime = getReadingTime();

      const { error } = await supabase
        .from("blogs")
        .insert({
          title: title.trim(),
          slug,
          excerpt: excerpt.trim(),
          content: content.trim(),
          image_url: image || null,
          status: "published",
          read_time: readTime,
          published_at: new Date().toISOString(),
        });

      if (error) {
        console.error("Publish article error:", error);
        alert(error.message);
        return;
      }

      alert("Article published successfully!");

      window.location.href = "/admin/blogs";
    } catch (error) {
      console.error(error);
      alert("Something went wrong while publishing the article.");
    }
  };

  // --------------------------------
  // PREVIEW
  // --------------------------------

  if (preview) {
    return (
      <main className="min-h-screen bg-[#f3f0e8] text-[#151515]">
        <div className="mx-auto max-w-[1000px] px-5 py-10 md:px-8 md:py-16">
          <button
            onClick={() => setPreview(false)}
            className="mb-12 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-black/45 transition-colors hover:text-black"
          >
            <ArrowLeft size={15} />
            Back to Editor
          </button>

          <p className="text-[10px] uppercase tracking-[0.2em] text-[#967746]">
            Preview
          </p>

          <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-[-0.04em] md:text-8xl">
            {title || "Your article title"}
          </h1>

          <p className="mt-8 max-w-2xl font-display text-xl leading-relaxed text-black/50 md:text-2xl">
            {excerpt || "Your article excerpt will appear here."}
          </p>

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
            New Article
          </h1>

          <p className="mt-4 text-sm text-white/35">
            Write and publish a new journal article.
          </p>
        </div>

        <button
          onClick={() => setPreview(true)}
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-xs uppercase tracking-[0.14em] text-white/55 transition-all hover:border-white/25 hover:text-white"
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      {/* EDITOR */}

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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write a short description for the article..."
              rows={4}
              className="mt-5 w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm leading-7 text-white outline-none placeholder:text-white/20 focus:border-[#c7a66a]/40"
            />

            <p className="mt-3 text-[10px] text-white/20">
              This appears on the blog listing and article header.
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

            <RichTextEditor
              value={content}
              onChange={setContent}
            />

            <div className="mt-4 flex items-center justify-between">
              <span className="text-[10px] text-white/20">
                {content.length} characters
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
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {image ? (
              <div className="mt-5 overflow-hidden rounded-xl">
                <img
                  src={image}
                  alt="Article cover"
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
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* ARTICLE INFO */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Article Info
            </p>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/20">
                  Status
                </p>

                <p className="mt-2 text-sm text-[#c7a66a]">
                  Draft
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
            </div>
          </div>

          {/* ACTIONS */}

          <div className="rounded-2xl border border-white/10 bg-[#151515] p-5">
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/30">
              Publish
            </p>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                onClick={saveDraft}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3.5 text-xs uppercase tracking-[0.14em] text-white/60 transition-all hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
              >
                <Save size={16} />
                Save Draft
              </button>

              <button
                type="button"
                onClick={publishArticle}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#c7a66a] px-4 py-3.5 text-xs uppercase tracking-[0.14em] text-[#111] transition-transform hover:-translate-y-0.5"
              >
                <Send size={16} />
                Publish Article
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* BOTTOM NOTE */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-8 border-t border-white/10 pt-6"
      >
        <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
          Content Studio · New Article
        </p>
      </motion.div>
    </div>
  );
}