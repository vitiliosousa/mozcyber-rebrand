import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const [
    users,
    pending,
    published,
    drafts,
    totalViews,
    topPosts,
    recentAudit,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.post.count({ where: { status: "PENDING", deletedAt: null } }),
    prisma.post.count({ where: { status: "PUBLISHED", deletedAt: null } }),
    prisma.post.count({ where: { status: "DRAFT", deletedAt: null } }),
    prisma.post.aggregate({
      where: { deletedAt: null },
      _sum: { views: true },
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { views: "desc" },
      take: 5,
      select: { title: true, slug: true, views: true },
    }),
    prisma.auditLog.findMany({
      orderBy: { createdAt: "desc" },
      take: 8,
      include: { actor: { select: { name: true, email: true } } },
    }),
  ]);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Administração</h1>
      <p className="mt-3 text-moz-muted">Visão geral do site e do blog.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          ["Utilizadores", users],
          ["Pendentes", pending],
          ["Publicados", published],
          ["Rascunhos", drafts],
          ["Views totais", totalViews._sum.views || 0],
        ].map(([label, value]) => (
          <div key={String(label)} className="border border-white/10 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
              {label}
            </p>
            <p className="mt-3 text-3xl text-moz-teal">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl">Mais lidos</h2>
          <ul className="mt-4 border-t border-white/10">
            {topPosts.length === 0 && (
              <li className="py-6 text-sm text-moz-muted">Sem dados.</li>
            )}
            {topPosts.map((p) => (
              <li
                key={p.slug}
                className="flex justify-between gap-4 border-b border-white/10 py-3 text-sm"
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className="text-white/80 hover:text-moz-teal"
                >
                  {p.title}
                </Link>
                <span className="text-moz-muted">{p.views}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl">Actividade recente</h2>
          <ul className="mt-4 border-t border-white/10">
            {recentAudit.length === 0 && (
              <li className="py-6 text-sm text-moz-muted">Sem registos.</li>
            )}
            {recentAudit.map((log) => (
              <li key={log.id} className="border-b border-white/10 py-3 text-sm">
                <p className="text-white/80">
                  <span className="text-moz-teal">{log.action}</span> ·{" "}
                  {log.actor.name || log.actor.email}
                </p>
                <p className="mt-1 text-xs text-white/40">
                  {log.createdAt.toLocaleString("pt-MZ")}
                  {log.meta ? ` · ${log.meta.slice(0, 80)}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        href="/admin/blog"
        className="mt-8 inline-block text-sm font-semibold text-moz-teal hover:text-white"
      >
        Revisão de artigos →
      </Link>
    </div>
  );
}
