import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const [myPosts, pending, published, totalViews, unread] = userId
    ? await Promise.all([
        prisma.post.count({ where: { authorId: userId, deletedAt: null } }),
        prisma.post.count({
          where: { authorId: userId, status: "PENDING", deletedAt: null },
        }),
        prisma.post.count({
          where: { authorId: userId, status: "PUBLISHED", deletedAt: null },
        }),
        prisma.post.aggregate({
          where: { authorId: userId, deletedAt: null },
          _sum: { views: true },
        }),
        prisma.notification.count({
          where: { userId, read: false },
        }),
      ])
    : [0, 0, 0, { _sum: { views: 0 } }, 0];

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">
        Olá{session?.user?.name ? `, ${session.user.name}` : ""}
      </h1>
      <p className="mt-3 text-moz-muted">
        Painel da comunidade — gere os teus artigos.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Artigos
          </p>
          <p className="mt-3 text-3xl text-moz-teal">{myPosts}</p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Em revisão
          </p>
          <p className="mt-3 text-3xl text-moz-teal">{pending}</p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Publicados
          </p>
          <p className="mt-3 text-3xl text-moz-teal">{published}</p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Views
          </p>
          <p className="mt-3 text-3xl text-moz-teal">
            {totalViews._sum.views || 0}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <Link
          href="/dashboard/blog/new"
          className="rounded-lg bg-moz-teal px-5 py-2.5 text-sm font-semibold text-[#0b0f14] hover:bg-white"
        >
          Escrever artigo →
        </Link>
        <Link
          href="/dashboard/notifications"
          className="rounded-lg border border-white/20 px-5 py-2.5 text-sm text-white/80 hover:border-moz-teal hover:text-moz-teal"
        >
          Notificações
          {unread > 0 ? ` (${unread})` : ""}
        </Link>
      </div>
    </div>
  );
}
