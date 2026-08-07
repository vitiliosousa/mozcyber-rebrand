"use client";

import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState } from "react";

type Props = {
  name?: string;
  defaultValue?: string;
};

function ToolBtn({
  label,
  active,
  onClick,
  disabled,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-2.5 py-1.5 text-xs transition-colors disabled:opacity-50 ${
        active
          ? "bg-moz-teal/20 text-moz-teal"
          : "text-white/80 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

export default function BlogEditor({
  name = "content",
  defaultValue = "",
}: Props) {
  const [html, setHtml] = useState(defaultValue || "<p></p>");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full h-auto my-4",
        },
      }),
      Placeholder.configure({
        placeholder: "Escreve o artigo…",
      }),
    ],
    content: defaultValue || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => setHtml(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "blog-editor min-h-72 px-4 py-3 text-base leading-relaxed text-white outline-none",
      },
    },
  });

  const active = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) {
        return {
          bulletList: false,
          orderedList: false,
          blockquote: false,
          bold: false,
          italic: false,
          h2: false,
          h3: false,
        };
      }
      return {
        bulletList: ed.isActive("bulletList"),
        orderedList: ed.isActive("orderedList"),
        blockquote: ed.isActive("blockquote"),
        bold: ed.isActive("bold"),
        italic: ed.isActive("italic"),
        h2: ed.isActive("heading", { level: 2 }),
        h3: ed.isActive("heading", { level: 3 }),
      };
    },
  });

  async function uploadInlineImage(file: File) {
    if (!editor) return;
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Falha no upload.");
      }
      editor.chain().focus().setImage({ src: data.url }).run();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Falha no upload.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <div className="relative rounded-lg border border-white/15 bg-white/3">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 rounded-t-lg border-b border-white/10 bg-[#101820]/95 p-2 backdrop-blur-md">
        <ToolBtn
          label="• Lista"
          active={active?.bulletList}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        />
        <ToolBtn
          label="1. Lista"
          active={active?.orderedList}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        />
        <ToolBtn
          label="Citação"
          active={active?.blockquote}
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        />
        <ToolBtn
          label={uploading ? "A enviar…" : "Imagem"}
          disabled={!editor || uploading}
          onClick={() => fileRef.current?.click()}
        />
        <span className="mx-1 h-4 w-px bg-white/15" aria-hidden />
        <ToolBtn
          label="Desfazer"
          onClick={() => editor?.chain().focus().undo().run()}
        />
        <ToolBtn
          label="Refazer"
          onClick={() => editor?.chain().focus().redo().run()}
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void uploadInlineImage(file);
          }}
        />
      </div>

      {editor && (
        <BubbleMenu
          editor={editor}
          appendTo={() => document.body}
          options={{
            strategy: "fixed",
            placement: "top",
            offset: 8,
            flip: true,
            shift: true,
          }}
          className="z-50 flex gap-1 rounded-lg border border-white/15 bg-[#0b0f14] p-1 shadow-xl"
        >
          <ToolBtn
            label="N"
            active={active?.bold}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <ToolBtn
            label="I"
            active={active?.italic}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <ToolBtn
            label="H2"
            active={active?.h2}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          />
          <ToolBtn
            label="H3"
            active={active?.h3}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          />
        </BubbleMenu>
      )}

      {editor && (
        <FloatingMenu
          editor={editor}
          appendTo={() => document.body}
          options={{
            strategy: "fixed",
            placement: "left-start",
            offset: 8,
            flip: true,
            shift: true,
          }}
          className="z-50 flex flex-col gap-1 rounded-lg border border-white/15 bg-[#0b0f14] p-1 shadow-xl"
        >
          <ToolBtn
            label="•"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolBtn
            label="1."
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <ToolBtn
            label="H2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          />
          <ToolBtn
            label="Img"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
          />
        </FloatingMenu>
      )}

      <EditorContent editor={editor} />
      <input type="hidden" name={name} value={html} readOnly />
    </div>
  );
}
