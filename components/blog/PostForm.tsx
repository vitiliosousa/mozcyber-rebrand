"use client";

import BlogEditor from "@/components/blog/BlogEditor";
import CoverUpload from "@/components/blog/CoverUpload";
import SubmitButton from "@/components/ui/SubmitButton";
import {
  createPostAction,
  updatePostAction,
  type ActionState,
} from "@/lib/actions";
import { EXCERPT_MAX_WORDS, countWords } from "@/lib/blog";
import Link from "next/link";
import { useActionState, useLayoutEffect, useRef, useState } from "react";

type PostStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

type PostFields = {
  id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  image?: string | null;
  status?: PostStatus;
  rejectionReason?: string | null;
};

const statusMessage: Record<PostStatus, string> = {
  DRAFT: "Rascunho",
  PENDING: "Em revisão",
  PUBLISHED: "Publicado",
  REJECTED: "Rejeitado",
};

function autoResize(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "0px";
  el.style.height = `${el.scrollHeight}px`;
}

export default function PostForm({
  post,
  isAdmin = false,
}: {
  post?: PostFields;
  isAdmin?: boolean;
}) {
  const action = post?.id ? updatePostAction : createPostAction;
  const [state, formAction, pending] = useActionState(
    action,
    {} as ActionState,
  );
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const excerptRef = useRef<HTMLTextAreaElement>(null);

  const excerptWords = countWords(excerpt);

  useLayoutEffect(() => {
    autoResize(titleRef.current);
    autoResize(excerptRef.current);
  }, [excerpt]);

  const status = post?.status;
  const canEdit =
    !status || status === "DRAFT" || status === "REJECTED" || isAdmin;
  const locked =
    !isAdmin && (status === "PENDING" || status === "PUBLISHED");

  if (locked && post?.id) {
    return (
      <div className="mx-auto max-w-xl space-y-6 rounded-2xl border border-white/10 bg-white/3 p-8 text-center">
        <p className="text-sm text-moz-muted">
          Estado:{" "}
          <span className="text-moz-teal">{statusMessage[status]}</span>
        </p>
        <p className="text-sm text-white/55">
          {status === "PENDING"
            ? "Enquanto o artigo está em revisão, não podes editá-lo."
            : "Artigo já publicado. Só um administrador pode alterar o conteúdo."}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href={`/dashboard/blog/${post.id}`}
            className="rounded-lg bg-moz-teal px-5 py-2.5 text-sm font-semibold text-[#0b0f14] hover:bg-white"
          >
            Ver preview
          </Link>
          <Link
            href="/dashboard/blog"
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm text-white/80 hover:border-moz-teal hover:text-moz-teal"
          >
            Voltar à lista
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="writing-desk">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      <div className="writing-toolbar sticky top-0 z-20 -mx-4 mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#0b0f14]/90 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/dashboard/blog"
            className="shrink-0 text-sm text-white/45 transition-colors hover:text-moz-teal"
          >
            ← Artigos
          </Link>
          {status && (
            <span className="truncate text-xs uppercase tracking-[0.2em] text-white/35">
              {statusMessage[status]}
            </span>
          )}
        </div>

        {canEdit && (
          <div className="flex flex-wrap items-center gap-2">
            <SubmitButton
              type="submit"
              name="intent"
              value="draft"
              pendingLabel="A guardar…"
              disabled={pending}
              className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 hover:border-moz-teal hover:text-moz-teal"
            >
              Guardar
            </SubmitButton>
            <SubmitButton
              type="submit"
              name="intent"
              value="preview"
              pendingLabel="A abrir…"
              disabled={pending || excerptWords > EXCERPT_MAX_WORDS}
              className="rounded-lg bg-moz-teal px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-white disabled:opacity-40"
            >
              Pré-visualizar
            </SubmitButton>
          </div>
        )}
      </div>

      {status === "REJECTED" && post?.rejectionReason && (
        <div className="mx-auto mb-6 max-w-[52rem] rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          <p className="font-semibold">Motivo da rejeição</p>
          <p className="mt-1 text-red-100/80">{post.rejectionReason}</p>
        </div>
      )}

      {state.error && (
        <p className="mx-auto mb-4 max-w-[52rem] text-sm text-red-400">
          {state.error}
        </p>
      )}

      <article className="writing-sheet mx-auto w-full max-w-[52rem] overflow-x-hidden">
        <CoverUpload defaultImage={post?.image} />

        <label className="sr-only" htmlFor="post-category">
          Categoria
        </label>
        <input
          id="post-category"
          name="category"
          required
          defaultValue={post?.category || "Geral"}
          placeholder="Categoria"
          className="mt-6 w-full border-0 bg-transparent text-xs uppercase tracking-[0.2em] text-moz-teal outline-none placeholder:text-white/30"
        />

        <label className="sr-only" htmlFor="post-title">
          Título
        </label>
        <textarea
          ref={titleRef}
          id="post-title"
          name="title"
          required
          rows={1}
          defaultValue={post?.title}
          placeholder="Título"
          onInput={(e) => autoResize(e.currentTarget)}
          className="mt-4 w-full max-w-full resize-none overflow-hidden whitespace-pre-wrap break-words border-0 bg-transparent text-[2.15rem] leading-[1.2] text-white outline-none placeholder:text-white/25 md:text-[2.75rem]"
        />

        <label className="sr-only" htmlFor="post-excerpt">
          Resumo
        </label>
        <textarea
          ref={excerptRef}
          id="post-excerpt"
          name="excerpt"
          required
          rows={2}
          value={excerpt}
          placeholder="Uma frase que convida a ler…"
          onChange={(e) => {
            const next = e.target.value;
            if (countWords(next) <= EXCERPT_MAX_WORDS) {
              setExcerpt(next);
            } else {
              const words = next.trim().split(/\s+/).slice(0, EXCERPT_MAX_WORDS);
              setExcerpt(words.join(" "));
            }
          }}
          onInput={(e) => autoResize(e.currentTarget)}
          className="mt-4 w-full max-w-full resize-none overflow-hidden whitespace-pre-wrap break-words border-0 bg-transparent text-base leading-relaxed text-white/55 outline-none placeholder:text-white/25"
        />
        <p
          className={`mt-1 text-right text-xs ${
            excerptWords >= EXCERPT_MAX_WORDS
              ? "text-red-400"
              : "text-white/35"
          }`}
        >
          {excerptWords}/{EXCERPT_MAX_WORDS} palavras
        </p>

        <div className="mt-8 border-t border-white/10 pt-8">
          <BlogEditor defaultValue={post?.content} />
        </div>
      </article>
    </form>
  );
}
