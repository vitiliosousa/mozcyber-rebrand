import { auth } from "@/auth";
import { StatusBadge } from "@/components/panel/StatusBadge";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [myPosts, pending, published, unread, recent] = userId
    ? await Promise.all([
        prisma.post.count({ where: { authorId: userId, deletedAt: null } }),
        prisma.post.count({
          where: { authorId: userId, status: "PENDING", deletedAt: null },
        }),
        prisma.post.count({
          where: { authorId: userId, status: "PUBLISHED", deletedAt: null },
        }),
        prisma.notification.count({
          where: { userId, read: false },
        }),
        prisma.post.findMany({
          where: { authorId: userId, deletedAt: null },
          orderBy: { updatedAt: "desc" },
          take: 5,
          select: {
            id: true,
            title: true,
            status: true,
            updatedAt: true,
            category: true,
          },
        }),
      ])
    : [0, 0, 0, 0, []];

  const metrics = [
    { label: "Total de artigos", value: myPosts },
    { label: "Em revisão", value: pending },
    { label: "Publicados", value: published },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Olá{session?.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            Resumo da tua actividade editorial na Mozcyber.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {unread > 0 && (
            <Link
              href="/dashboard/notifications"
              className="rounded-lg border border-white/12 bg-white/3 px-3.5 py-2 text-sm text-white/75 hover:border-moz-teal/40 hover:text-moz-teal"
            >
              {unread} notificaç{unread === 1 ? "ão" : "ões"}
            </Link>
          )}
          <Link
            href="/dashboard/blog/new"
            className="rounded-lg bg-moz-teal px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-white"
          >
            Escrever artigo
          </Link>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-xl border border-white/8 bg-[#101820] px-4 py-4"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
              {m.label}
            </p>
            <p className="mt-2 text-2xl font-semibold tabular-nums text-white">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-xl border border-white/8 bg-[#101820]">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 md:px-5">
          <h2 className="text-sm font-medium text-white/90">
            Artigos recentes
          </h2>
          <Link
            href="/dashboard/blog"
            className="text-xs text-moz-teal hover:text-white"
          >
            Ver todos
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="px-5 py-12 text-center">
            <p className="text-sm text-white/50">Ainda não tens artigos.</p>
            <Link
              href="/dashboard/blog/new"
              className="mt-4 inline-flex text-sm font-medium text-moz-teal hover:text-white"
            >
              Criar o primeiro →
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 text-[11px] uppercase tracking-[0.14em] text-white/35">
                  <th className="px-4 py-3 font-medium md:px-5">Título</th>
                  <th className="px-3 py-3 font-medium">Estado</th>
                  <th className="px-3 py-3 font-medium">Actualizado</th>
                  <th className="px-4 py-3 font-medium md:px-5" />
                </tr>
              </thead>
              <tbody>
                {recent.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-white/6 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="max-w-[14rem] truncate px-4 py-3.5 md:max-w-xs md:px-5">
                      <span className="font-medium text-white/90">
                        {post.title}
                      </span>
                      <span className="mt-0.5 block text-xs text-white/35">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-3 py-3.5 text-white/45">
                      {post.updatedAt.toLocaleDateString("pt-MZ")}
                    </td>
                    <td className="px-4 py-3.5 text-right md:px-5">
                      <Link
                        href={`/dashboard/blog/${post.id}`}
                        className="text-xs font-medium text-moz-teal hover:text-white"
                      >
                        Abrir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
