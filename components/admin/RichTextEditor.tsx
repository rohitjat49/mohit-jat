"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Heading2,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react";

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: value || "<p></p>",

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[420px] px-5 py-5 text-sm leading-8 text-white outline-none md:text-base",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();

    if (value && value !== currentContent) {
      editor.commands.setContent(value, {
        emitUpdate: false,
      });
    }

    if (!value && currentContent !== "<p></p>") {
      editor.commands.clearContent();
    }
  }, [editor, value]);

  if (!editor) {
    return (
      <div className="min-h-[470px] animate-pulse rounded-xl border border-white/10 bg-white/[0.02]" />
    );
  }

  const toolbarButton =
    "flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-20";

  const activeButton =
    "bg-[#c7a66a] text-[#111] hover:bg-[#c7a66a] hover:text-[#111]";

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt(
      "Enter URL",
      previousUrl || "https://"
    );

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({
        href: url,
      })
      .run();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-[#151515] p-2">
        {/* BOLD */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`${toolbarButton} ${
            editor.isActive("bold") ? activeButton : ""
          }`}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        {/* ITALIC */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`${toolbarButton} ${
            editor.isActive("italic") ? activeButton : ""
          }`}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* HEADING */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor
              .chain()
              .focus()
              .toggleHeading({ level: 2 })
              .run();
          }}
          className={`${toolbarButton} ${
            editor.isActive("heading", { level: 2 })
              ? activeButton
              : ""
          }`}
          title="Heading 2"
        >
          <Heading2 size={17} />
        </button>

        {/* BULLET LIST */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`${toolbarButton} ${
            editor.isActive("bulletList") ? activeButton : ""
          }`}
          title="Bullet List"
        >
          <List size={17} />
        </button>

        {/* NUMBERED LIST */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`${toolbarButton} ${
            editor.isActive("orderedList") ? activeButton : ""
          }`}
          title="Numbered List"
        >
          <ListOrdered size={17} />
        </button>

        {/* QUOTE */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`${toolbarButton} ${
            editor.isActive("blockquote") ? activeButton : ""
          }`}
          title="Quote"
        >
          <Quote size={17} />
        </button>

        {/* LINK */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            setLink();
          }}
          className={`${toolbarButton} ${
            editor.isActive("link") ? activeButton : ""
          }`}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* UNDO */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          disabled={!editor.can().undo()}
          className={toolbarButton}
          title="Undo"
        >
          <Undo2 size={16} />
        </button>

        {/* REDO */}
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          disabled={!editor.can().redo()}
          className={toolbarButton}
          title="Redo"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} />
    </div>
  );
}