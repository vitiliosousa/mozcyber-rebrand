import {
  approvePostAction,
  deletePostAction,
  rejectPostAction,
  unpublishPostAction,
} from "@/lib/actions";
import ActionButton from "@/components/ui/ActionButton";
import Pagination, { parsePage } from "@/components/ui/Pagination";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PER_PAGE = 10;

const statusLabel: Record<string, string> = {
  DRAFT: "Rascunho",
  PENDING: "Em revisão",
  PUBLISHED: "Publicado",
  REJECTED: "Rejeitado",
};

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminBlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const pending = await prisma.post.findMany({
    where: { status: "PENDING" },
    orderBy: { updatedAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  const total = await prisma.post.count();
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
    skip: (safePage - 1) * PER_PAGE,
    take: PER_PAGE,
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Artigos</h1>
      <p className="mt-3 text-moz-muted">
        Revisa, publica, despublica ou apaga artigos da comunidade.
      </p>

      <h2 className="mt-10 text-xl text-moz-teal">
        Pendentes ({pending.length})
      </h2>
      <ul className="mt-4 border-t border-white/10">
        {pending.length === 0 && (
          <li className="py-8 text-moz-muted">Nada por rever.</li>
        )}
        {pending.map((post) => (
          <li key={post.id} className="border-b border-white/10 py-6">
            <p className="text-lg">{post.title}</p>
            <p className="mt-1 text-sm text-white/45">
              {post.author.name || post.author.email} · {post.category}
            </p>
            <p className="mt-3 line-clamp-2 text-sm text-white/55">
              {post.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/dashboard/blog/${post.id}/edit`}
                className="text-sm text-white/70 hover:text-moz-teal"
              >
                Ver / editar
              </Link>
              <ActionButton
                action={approvePostAction.bind(null, post.id)}
                label="Aprovar"
                pendingLabel="A aprovar…"
                className="text-sm font-semibold text-moz-teal hover:text-white"
              />
              <ActionButton
                action={rejectPostAction.bind(null, post.id)}
                label="Rejeitar"
                pendingLabel="A rejeitar…"
                className="text-sm text-red-400 hover:text-red-300"
              />
              <ActionButton
                action={deletePostAction.bind(null, post.id)}
                label="Apagar"
                pendingLabel="A apagar…"
                className="text-sm text-red-400 hover:text-red-300"
              />
            </div>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl">Todos os artigos</h2>
      <ul className="mt-4 border-t border-white/10">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-3 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-base">{post.title}</p>
              <p className="mt-1 text-sm text-white/45">
                {statusLabel[post.status]} ·{" "}
                {post.author.name || post.author.email}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                href={`/dashboard/blog/${post.id}/edit`}
                className="text-moz-teal hover:text-white"
              >
                Editar
              </Link>
              {post.status === "PUBLISHED" ? (
                <ActionButton
                  action={unpublishPostAction.bind(null, post.id)}
                  label="Despublicar"
                  pendingLabel="…"
                  className="text-white/70 hover:text-moz-teal"
                />
              ) : post.status === "PENDING" ? (
                <ActionButton
                  action={approvePostAction.bind(null, post.id)}
                  label="Aprovar"
                  pendingLabel="…"
                  className="text-moz-teal hover:text-white"
                />
              ) : (
                <ActionButton
                  action={approvePostAction.bind(null, post.id)}
                  label="Publicar"
                  pendingLabel="…"
                  className="text-moz-teal hover:text-white"
                />
              )}
              <ActionButton
                action={deletePostAction.bind(null, post.id)}
                label="Apagar"
                pendingLabel="…"
                className="text-red-400 hover:text-red-300"
              />
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        basePath="/admin/blog"
      />
    </div>
  );
}
