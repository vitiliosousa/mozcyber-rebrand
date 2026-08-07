"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState } from "react";
import { createSlashExtension } from "@/components/blog/slash-command";

type Props = {
  name?: string;
  defaultValue?: string;
};

function MarkBtn({
  label,
  active,
  onClick,
  italic,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  italic?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`min-w-8 rounded-md px-2 py-1.5 text-sm transition-colors ${
        italic ? "italic" : "font-semibold"
      } ${
        active
          ? "bg-moz-teal/20 text-moz-teal"
          : "text-white/70 hover:bg-white/10 hover:text-white"
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
  const imageTrigger = useRef(() => {});

  imageTrigger.current = () => fileRef.current?.click();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full h-auto my-6",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-moz-teal underline underline-offset-2",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      Placeholder.configure({
        placeholder: "Começa a escrever, ou digita / para comandos…",
      }),
      createSlashExtension(() => imageTrigger.current()),
    ],
    content: defaultValue || "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => setHtml(ed.getHTML()),
    editorProps: {
      attributes: {
        class:
          "blog-editor blog-editor--paper min-h-[28rem] text-[1.0625rem] leading-[1.8] text-white/80 outline-none",
      },
    },
  });

  const active = useEditorState({
    editor,
    selector: ({ editor: ed }) => {
      if (!ed) {
        return {
          bold: false,
          italic: false,
          h2: false,
          h3: false,
          link: false,
          bulletList: false,
          orderedList: false,
          blockquote: false,
        };
      }
      return {
        bold: ed.isActive("bold"),
        italic: ed.isActive("italic"),
        h2: ed.isActive("heading", { level: 2 }),
        h3: ed.isActive("heading", { level: 3 }),
        link: ed.isActive("link"),
        bulletList: ed.isActive("bulletList"),
        orderedList: ed.isActive("orderedList"),
        blockquote: ed.isActive("blockquote"),
      };
    },
  });

  function setLink() {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL do link", prev || "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

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
    <div className="relative">
      {editor && (
        <BubbleMenu
          editor={editor}
          appendTo={() => document.body}
          options={{
            strategy: "fixed",
            placement: "top",
            offset: 10,
            flip: true,
            shift: true,
          }}
          className="z-50 flex items-center gap-0.5 rounded-xl border border-white/15 bg-[#0d1218] p-1 shadow-xl"
        >
          <MarkBtn
            label="N"
            active={active?.bold}
            onClick={() => editor.chain().focus().toggleBold().run()}
          />
          <MarkBtn
            label="I"
            italic
            active={active?.italic}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          />
          <span className="mx-0.5 h-4 w-px bg-white/15" aria-hidden />
          <MarkBtn
            label="H2"
            active={active?.h2}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          />
          <MarkBtn
            label="H3"
            active={active?.h3}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          />
          <span className="mx-0.5 h-4 w-px bg-white/15" aria-hidden />
          <MarkBtn
            label="•"
            active={active?.bulletList}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <MarkBtn
            label="1."
            active={active?.orderedList}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <MarkBtn
            label="“"
            active={active?.blockquote}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          />
          <MarkBtn label="Link" active={active?.link} onClick={setLink} />
          <MarkBtn
            label={uploading ? "…" : "Img"}
            onClick={() => fileRef.current?.click()}
          />
        </BubbleMenu>
      )}

      <EditorContent editor={editor} />
      <p className="mt-8 text-center text-[11px] tracking-wide text-white/30">
        Selecciona texto para formatar · digita{" "}
        <kbd className="rounded bg-white/8 px-1.5 py-0.5 font-sans text-white/45">
          /
        </kbd>{" "}
        para blocos
      </p>

      <input type="hidden" name={name} value={html} readOnly />
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
  );
}
