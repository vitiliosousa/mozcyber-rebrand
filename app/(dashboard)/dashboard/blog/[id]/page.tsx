import ArticleBody from "@/components/blog/ArticleBody";
import ActionButton from "@/components/ui/ActionButton";
import { auth } from "@/auth";
import { submitForReviewAction } from "@/lib/actions";
import { readingTimeMinutes } from "@/lib/blog";
import { sanitizeHtml } from "@/lib/sanitize";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

const statusLabel: Record<string, string> = {
  DRAFT: "Rascunho",
  PENDING: "Em revisão",
  PUBLISHED: "Publicado",
  REJECTED: "Rejeitado",
};

type Props = { params: Promise<{ id: string }> };

export default async function PostPreviewPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const post = await prisma.post.findFirst({
    where: { id, deletedAt: null },
    include: { author: { select: { name: true, email: true } } },
  });
  if (!post) notFound();
  if (post.authorId !== session.user.id && session.user.role !== "ADMIN") {
    redirect("/dashboard/blog");
  }

  const canEdit =
    session.user.role === "ADMIN" ||
    post.status === "DRAFT" ||
    post.status === "REJECTED";

  const canSubmit =
    post.status === "DRAFT" ||
    post.status === "REJECTED" ||
    session.user.role === "ADMIN";

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-white/8 bg-[#101820] px-4 py-4 md:px-5">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">
            Preview
          </p>
          <h1 className="mt-1 text-xl font-semibold md:text-2xl">
            Pré-visualização
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            Estado:{" "}
            <span className="text-moz-teal">{statusLabel[post.status]}</span>
          </p>
          {(post.status === "DRAFT" || post.status === "REJECTED") && (
            <p className="mt-2 max-w-lg text-sm text-white/40">
              Confirma o resultado. Se estiver bom, envia para revisão.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/blog"
            className="rounded-lg border border-white/12 px-3.5 py-2 text-sm text-white/70 hover:border-moz-teal hover:text-moz-teal"
          >
            Lista
          </Link>
          {canEdit && (
            <Link
              href={`/dashboard/blog/${post.id}/edit`}
              className="rounded-lg border border-white/12 px-3.5 py-2 text-sm text-white/70 hover:border-moz-teal hover:text-moz-teal"
            >
              Editar
            </Link>
          )}
          {canSubmit &&
            post.status !== "PENDING" &&
            post.status !== "PUBLISHED" && (
              <ActionButton
                action={submitForReviewAction.bind(null, post.id)}
                label="Enviar para revisão"
                pendingLabel="A enviar…"
                className="rounded-lg bg-moz-teal px-3.5 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-white"
              />
            )}
          {post.status === "PUBLISHED" && (
            <Link
              href={`/blog/${post.slug}`}
              className="rounded-lg border border-moz-teal/35 px-3.5 py-2 text-sm text-moz-teal hover:bg-moz-teal/10"
            >
              Ver no site
            </Link>
          )}
        </div>
      </div>

      {post.status === "REJECTED" && post.rejectionReason && (
        <div className="mt-6 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          <p className="font-semibold">Motivo da rejeição</p>
          <p className="mt-1 text-red-100/80">{post.rejectionReason}</p>
          <p className="mt-2 text-xs text-red-100/60">
            Edita o artigo e volta a enviar para revisão.
          </p>
        </div>
      )}

      {post.status === "PENDING" && (
        <p className="mt-6 rounded-lg border border-moz-teal/30 bg-moz-teal/10 px-4 py-3 text-sm text-moz-teal">
          Artigo enviado para revisão. O administrador vai avaliar em breve.
        </p>
      )}

      <p className="mt-2 max-w-2xl text-sm text-white/40">
        Assim é que o artigo vai aparecer publicado no blog.
      </p>

      <article className="-mx-4 mt-6 bg-[#0b0f14] px-4 pt-10 pb-12 md:-mx-5 md:px-10">
        <div className="mx-auto max-w-3xl">
          <ArticleBody
            category={post.category}
            title={post.title}
            dateLabel={(post.publishedAt || post.updatedAt).toLocaleDateString(
              "pt-MZ",
            )}
            authorName={post.author.name || "Mozcyber"}
            minutes={readingTimeMinutes(post.content)}
            image={post.image}
            html={sanitizeHtml(post.content)}
          />
        </div>
      </article>
    </div>
  );
}
