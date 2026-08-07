import CoverImage from "@/components/blog/CoverImage";
import ActionButton from "@/components/ui/ActionButton";
import { auth } from "@/auth";
import { submitForReviewAction } from "@/lib/actions";
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

  const post = await prisma.post.findUnique({
    where: { id },
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
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-moz-teal">
            Preview
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl">Pré-visualização</h1>
          <p className="mt-3 text-sm text-moz-muted">
            Estado:{" "}
            <span className="text-moz-teal">{statusLabel[post.status]}</span>
          </p>
          {(post.status === "DRAFT" || post.status === "REJECTED") && (
            <p className="mt-2 max-w-lg text-sm text-white/50">
              Confirma o resultado. Se estiver bom, envia para revisão. Se
              quiseres alterar, volta a editar.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/blog"
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-moz-teal hover:text-moz-teal"
          >
            Lista
          </Link>
          {canEdit && (
            <Link
              href={`/dashboard/blog/${post.id}/edit`}
              className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white/80 hover:border-moz-teal hover:text-moz-teal"
            >
              Editar
            </Link>
          )}
          {canSubmit && post.status !== "PENDING" && post.status !== "PUBLISHED" && (
            <ActionButton
              action={submitForReviewAction.bind(null, post.id)}
              label="Enviar para revisão"
              pendingLabel="A enviar…"
              className="rounded-lg bg-moz-teal px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-white"
            />
          )}
          {post.status === "PUBLISHED" && (
            <Link
              href={`/blog/${post.slug}`}
              className="rounded-lg border border-moz-teal/40 px-4 py-2 text-sm text-moz-teal hover:bg-moz-teal/10"
            >
              Ver no site
            </Link>
          )}
        </div>
      </div>

      {post.status === "PENDING" && (
        <p className="mt-6 rounded-lg border border-moz-teal/30 bg-moz-teal/10 px-4 py-3 text-sm text-moz-teal">
          Artigo enviado para revisão. O administrador vai avaliar em breve.
        </p>
      )}

      <article className="mt-10 border-t border-white/10 pt-10">
        <p className="text-xs uppercase tracking-[0.2em] text-moz-teal">
          {post.category}
        </p>
        <h2 className="mt-3 text-3xl leading-tight md:text-5xl">{post.title}</h2>
        <p className="mt-4 text-sm text-moz-muted">
          {post.author.name || post.author.email} ·{" "}
          {post.updatedAt.toLocaleDateString("pt-MZ")}
        </p>
        <p className="mt-4 max-w-2xl text-base text-white/55">{post.excerpt}</p>

        {post.image && (
          <div className="relative mt-8 aspect-video max-w-3xl overflow-hidden rounded-lg">
            <CoverImage
              src={post.image}
              alt={post.title}
              className="object-cover"
            />
          </div>
        )}

        <div
          className="blog-article-content mt-10 max-w-3xl text-base leading-relaxed text-white/75"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
