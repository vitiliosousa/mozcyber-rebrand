import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const [users, pending, published] = await Promise.all([
    prisma.user.count(),
    prisma.post.count({ where: { status: "PENDING" } }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
  ]);

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Administração</h1>
      <p className="mt-3 text-moz-muted">Visão geral do site e do blog.</p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Utilizadores
          </p>
          <p className="mt-3 text-3xl text-moz-teal">{users}</p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Pendentes
          </p>
          <p className="mt-3 text-3xl text-moz-teal">{pending}</p>
        </div>
        <div className="border border-white/10 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-moz-muted">
            Publicados
          </p>
          <p className="mt-3 text-3xl text-moz-teal">{published}</p>
        </div>
      </div>

      <Link
        href="/admin/blog"
        className="mt-8 inline-block text-sm font-semibold text-moz-teal hover:text-white"
      >
        Ir à revisão de artigos →
      </Link>
    </div>
  );
}
