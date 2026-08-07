import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const [users, pending, published, drafts, recentPosts, recentAudit] =
    await Promise.all([
      prisma.user.count(),
      prisma.post.count({ where: { status: "PENDING", deletedAt: null } }),
      prisma.post.count({ where: { status: "PUBLISHED", deletedAt: null } }),
      prisma.post.count({ where: { status: "DRAFT", deletedAt: null } }),
      prisma.post.findMany({
        where: { status: "PUBLISHED", deletedAt: null },
        orderBy: { publishedAt: "desc" },
        take: 5,
        select: { title: true, slug: true, publishedAt: true },
      }),
      prisma.auditLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { actor: { select: { name: true, email: true } } },
      }),
    ]);

  const metrics = [
    ["Utilizadores", users],
    ["Pendentes", pending],
    ["Publicados", published],
    ["Rascunhos", drafts],
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Visão geral
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            Métricas do blog e actividade recente.
          </p>
        </div>
        <Link
          href="/admin/blog"
          className="rounded-lg bg-moz-teal px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-white"
        >
          Rever artigos
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-white/8 bg-[#101820] px-4 py-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              {label}
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="overflow-hidden rounded-xl border border-white/8 bg-[#101820]">
          <div className="border-b border-white/8 px-4 py-3 md:px-5">
            <h2 className="text-sm font-medium">Publicados recentemente</h2>
          </div>
          <ul>
            {recentPosts.length === 0 && (
              <li className="px-5 py-8 text-sm text-white/40">Sem dados.</li>
            )}
            {recentPosts.map((p) => (
              <li
                key={p.slug}
                className="flex items-center justify-between gap-4 border-b border-white/6 px-4 py-3 text-sm last:border-0 md:px-5"
              >
                <Link
                  href={`/blog/${p.slug}`}
                  className="truncate text-white/80 hover:text-moz-teal"
                >
                  {p.title}
                </Link>
                <span className="shrink-0 text-white/40">
                  {p.publishedAt?.toLocaleDateString("pt-MZ")}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="overflow-hidden rounded-xl border border-white/8 bg-[#101820]">
          <div className="border-b border-white/8 px-4 py-3 md:px-5">
            <h2 className="text-sm font-medium">Actividade recente</h2>
          </div>
          <ul>
            {recentAudit.length === 0 && (
              <li className="px-5 py-8 text-sm text-white/40">Sem registos.</li>
            )}
            {recentAudit.map((log) => (
              <li
                key={log.id}
                className="border-b border-white/6 px-4 py-3 text-sm last:border-0 md:px-5"
              >
                <p className="text-white/80">
                  <span className="text-moz-teal">{log.action}</span>
                  {" · "}
                  {log.actor.name || log.actor.email}
                </p>
                <p className="mt-0.5 text-xs text-white/35">
                  {log.createdAt.toLocaleString("pt-MZ")}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
