import {
  permanentDeletePostAction,
  restorePostAction,
} from "@/lib/actions";
import ActionButton from "@/components/ui/ActionButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminTrashPage() {
  const posts = await prisma.post.findMany({
    where: { deletedAt: { not: null } },
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

      <ul className="mt-10 border-t border-white/10">
        {posts.length === 0 && (
          <li className="py-10 text-moz-muted">Lixeira vazia.</li>
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
