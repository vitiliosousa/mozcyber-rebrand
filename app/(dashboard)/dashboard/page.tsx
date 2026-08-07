import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await auth();
  const myPosts = session?.user?.id
    ? await prisma.post.count({ where: { authorId: session.user.id } })
    : 0;
  const pending = session?.user?.id
    ? await prisma.post.count({
        where: { authorId: session.user.id, status: "PENDING" },
      })
    : 0;

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">
        Olá{session?.user?.name ? `, ${session.user.name}` : ""}
      </h1>
      <p className="mt-3 text-moz-muted">
        Painel da comunidade — gere os teus artigos.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
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
        <Link
          href="/dashboard/blog/new"
          className="flex items-center justify-center border border-moz-teal/40 bg-moz-teal/10 p-6 text-center text-sm font-semibold text-moz-teal transition-colors hover:bg-moz-teal hover:text-[#0b0f14]"
        >
          Escrever artigo →
        </Link>
      </div>
    </div>
  );
}
