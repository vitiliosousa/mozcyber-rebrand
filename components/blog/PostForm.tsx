"use client";

import BlogEditor from "@/components/blog/BlogEditor";
import CoverUpload from "@/components/blog/CoverUpload";
import SubmitButton from "@/components/ui/SubmitButton";
import {
  createPostAction,
  updatePostAction,
  type ActionState,
} from "@/lib/actions";
import Link from "next/link";
import { useActionState } from "react";

type PostStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";

type PostFields = {
  id?: string;
  title?: string;
  excerpt?: string;
  content?: string;
  category?: string;
  image?: string | null;
  status?: PostStatus;
};

const inputClass =
  "w-full rounded-lg border border-white/15 bg-white/3 px-4 py-3 text-white outline-none placeholder:text-white/35 focus:border-moz-teal";

const statusMessage: Record<PostStatus, string> = {
  DRAFT: "Rascunho — pré-visualiza antes de enviar.",
  PENDING: "Em revisão — aguarda aprovação do administrador.",
  PUBLISHED: "Publicado no blog.",
  REJECTED: "Rejeitado — podes editar e voltar a enviar.",
};

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

  const status = post?.status;
  const canEdit =
    !status || status === "DRAFT" || status === "REJECTED" || isAdmin;
  const locked =
    !isAdmin && (status === "PENDING" || status === "PUBLISHED");

  if (locked && post?.id) {
    return (
      <div className="space-y-6 rounded-lg border border-white/10 bg-white/3 p-6">
        <p className="text-sm text-moz-muted">
          Estado:{" "}
          <span className="text-moz-teal">{statusMessage[status]}</span>
        </p>
        <p className="text-sm text-white/55">
          {status === "PENDING"
            ? "Enquanto o artigo está em revisão, não podes editá-lo."
            : "Artigo já publicado. Só um administrador pode alterar o conteúdo."}
        </p>
        <div className="flex flex-wrap gap-3">
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
    <form action={formAction} className="space-y-8">
      {post?.id && <input type="hidden" name="id" value={post.id} />}

      {status && (
        <p className="text-sm text-moz-muted">
          Estado: <span className="text-moz-teal">{statusMessage[status]}</span>
        </p>
      )}

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moz-muted">
          Título
        </label>
        <input
          name="title"
          required
          defaultValue={post?.title}
          className={inputClass}
          placeholder="Título do artigo"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moz-muted">
          Categoria
        </label>
        <input
          name="category"
          required
          defaultValue={post?.category || "Geral"}
          className={inputClass}
        />
      </div>

      <CoverUpload defaultImage={post?.image} />

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moz-muted">
          Resumo
        </label>
        <textarea
          name="excerpt"
          required
          rows={3}
          defaultValue={post?.excerpt}
          className={`${inputClass} resize-none`}
          placeholder="Curto resumo para a listagem"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-moz-muted">
          Conteúdo
        </label>
        <BlogEditor defaultValue={post?.content} />
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-moz-teal">{state.success}</p>
      )}

      {canEdit && (
        <div className="flex flex-wrap gap-3 border-t border-white/10 pt-6">
          <SubmitButton
            type="submit"
            name="intent"
            value="draft"
            pendingLabel="A guardar…"
            disabled={pending}
            className="rounded-lg border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-moz-teal hover:text-moz-teal"
          >
            Guardar rascunho
          </SubmitButton>
          <SubmitButton
            type="submit"
            name="intent"
            value="preview"
            pendingLabel="A abrir preview…"
            disabled={pending}
            className="rounded-lg bg-moz-teal px-5 py-2.5 text-sm font-semibold text-[#0b0f14] hover:bg-white"
          >
            Pré-visualizar
          </SubmitButton>
        </div>
      )}
    </form>
  );
}
