import { auth } from "@/auth";
import { deletePostAction } from "@/lib/actions";
import ActionButton from "@/components/ui/ActionButton";
import Pagination, { parsePage } from "@/components/ui/Pagination";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

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

export default async function DashboardBlogPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { page: pageParam } = await searchParams;
  const page = parsePage(pageParam);

  const where = { authorId: session.user.id };
  const total = await prisma.post.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    skip: (safePage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl">Os meus artigos</h1>
          <p className="mt-3 text-moz-muted">
            Rascunhos, envios e publicações.
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="rounded-lg bg-moz-teal px-5 py-2.5 text-sm font-semibold text-[#0b0f14] hover:bg-white"
        >
          Novo artigo
        </Link>
      </div>

      <ul className="mt-10 border-t border-white/10">
        {posts.length === 0 && (
          <li className="py-10 text-moz-muted">Ainda não escreveste nada.</li>
        )}
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 py-5"
          >
            <div>
              <p className="text-lg">{post.title}</p>
              <p className="mt-1 text-sm text-white/45">
                {statusLabel[post.status]} ·{" "}
                {post.updatedAt.toLocaleDateString("pt-MZ")}
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link
                href={`/dashboard/blog/${post.id}`}
                className="text-moz-teal hover:text-white"
              >
                Preview
              </Link>
              {(post.status === "DRAFT" || post.status === "REJECTED") && (
                <Link
                  href={`/dashboard/blog/${post.id}/edit`}
                  className="text-white/70 hover:text-moz-teal"
                >
                  Editar
                </Link>
              )}
              {post.status !== "PUBLISHED" && post.status !== "PENDING" && (
                <ActionButton
                  action={deletePostAction.bind(null, post.id)}
                  label="Apagar"
                  pendingLabel="…"
                  className="text-red-400 hover:text-red-300"
                />
              )}
            </div>
          </li>
        ))}
      </ul>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        basePath="/dashboard/blog"
      />
    </div>
  );
}
