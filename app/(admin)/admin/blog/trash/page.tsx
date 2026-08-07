import {
  permanentDeletePostAction,
  restorePostAction,
} from "@/lib/actions";
import PanelListFilters from "@/components/panel/PanelListFilters";
import ActionButton from "@/components/ui/ActionButton";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function AdminTrashPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = (sp.q || "").trim();

  const where: Prisma.PostWhereInput = {
    deletedAt: { not: null },
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
            { author: { name: { contains: q, mode: "insensitive" } } },
            { author: { email: { contains: q, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const posts = await prisma.post.findMany({
    where,
    orderBy: { deletedAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <Link
        href="/admin/blog"
        className="text-sm text-white/40 hover:text-moz-teal"
      >
        ← Artigos
      </Link>
      <h1 className="mt-6 text-3xl md:text-4xl">Lixeira</h1>
      <p className="mt-3 text-moz-muted">
        Artigos apagados (soft delete). Podes restaurar ou apagar de vez.
      </p>

      <div className="mt-6">
        <PanelListFilters
          basePath="/admin/blog/trash"
          q={q}
          searchPlaceholder="Pesquisar na lixeira…"
        />
      </div>

      <ul className="mt-6 border-t border-white/10">
        {posts.length === 0 && (
          <li className="py-10 text-moz-muted">
            {q ? "Nada encontrado." : "Lixeira vazia."}
          </li>
        )}
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-3 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-base">{post.title}</p>
              <p className="mt-1 text-sm text-white/45">
                {post.author.name || post.author.email} · apagado{" "}
                {post.deletedAt?.toLocaleDateString("pt-MZ")}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <ActionButton
                action={restorePostAction.bind(null, post.id)}
                label="Restaurar"
                pendingLabel="…"
                className="text-moz-teal hover:text-white"
              />
              <ActionButton
                action={permanentDeletePostAction.bind(null, post.id)}
                label="Apagar de vez"
                pendingLabel="…"
                className="text-red-400 hover:text-red-300"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
