import { auth } from "@/auth";
import { deletePostAction } from "@/lib/actions";
import PanelListFilters, {
  POST_STATUS_FILTER_OPTIONS,
} from "@/components/panel/PanelListFilters";
import { StatusBadge } from "@/components/panel/StatusBadge";
import ActionButton from "@/components/ui/ActionButton";
import Pagination, { parsePage } from "@/components/ui/Pagination";
import { prisma } from "@/lib/prisma";
import type { PostStatus, Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";

const PER_PAGE = 10;

type Props = {
  searchParams: Promise<{ page?: string; q?: string; status?: string }>;
};

export default async function DashboardBlogPage({ searchParams }: Props) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const sp = await searchParams;
  const page = parsePage(sp.page);
  const q = (sp.q || "").trim();
  const status = (sp.status || "").trim() as PostStatus | "";

  const where: Prisma.PostWhereInput = {
    authorId: session.user.id,
    deletedAt: null,
    ...(status ? { status } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
            { category: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const total = await prisma.post.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    skip: (safePage - 1) * PER_PAGE,
    take: PER_PAGE,
  });

  const listParams = new URLSearchParams();
  if (q) listParams.set("q", q);
  if (status) listParams.set("status", status);
  const listQs = listParams.toString();
  const listBase = listQs ? `/dashboard/blog?${listQs}` : "/dashboard/blog";
  const filtering = Boolean(q || status);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Os meus artigos
          </h1>
          <p className="mt-1.5 text-sm text-white/50">
            {total} artigo{total === 1 ? "" : "s"}
            {filtering ? " encontrados" : " · gere rascunhos e publicações"}
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="rounded-lg bg-moz-teal px-4 py-2 text-sm font-semibold text-[#0b0f14] hover:bg-white"
        >
          Novo artigo
        </Link>
      </div>

      <PanelListFilters
        basePath="/dashboard/blog"
        q={q}
        selects={[
          {
            name: "status",
            value: status,
            allLabel: "Todos os estados",
            options: POST_STATUS_FILTER_OPTIONS,
          },
        ]}
      />

      <div className="overflow-hidden rounded-xl border border-white/8 bg-[#101820]">
        {posts.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-sm text-white/50">
              {filtering
                ? "Nenhum artigo com estes filtros."
                : "Ainda não escreveste nada."}
            </p>
            {!filtering && (
              <Link
                href="/dashboard/blog/new"
                className="mt-4 inline-flex text-sm font-medium text-moz-teal hover:text-white"
              >
                Começar a escrever →
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead>
                <tr className="border-b border-white/8 text-[11px] uppercase tracking-[0.14em] text-white/35">
                  <th className="px-4 py-3 font-medium md:px-5">Artigo</th>
                  <th className="px-3 py-3 font-medium">Estado</th>
                  <th className="px-3 py-3 font-medium">Categoria</th>
                  <th className="px-3 py-3 font-medium">Data</th>
                  <th className="px-4 py-3 font-medium md:px-5">Acções</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-white/6 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="max-w-[16rem] px-4 py-4 md:max-w-sm md:px-5">
                      <p className="truncate font-medium text-white/90">
                        {post.title}
                      </p>
                      {post.status === "REJECTED" && post.rejectionReason && (
                        <p className="mt-1 line-clamp-1 text-xs text-red-300/80">
                          {post.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge status={post.status} />
                    </td>
                    <td className="px-3 py-4 text-white/45">{post.category}</td>
                    <td className="px-3 py-4 whitespace-nowrap text-white/45">
                      {post.updatedAt.toLocaleDateString("pt-MZ")}
                    </td>
                    <td className="px-4 py-4 md:px-5">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <Link
                          href={`/dashboard/blog/${post.id}`}
                          className="font-medium text-moz-teal hover:text-white"
                        >
                          Preview
                        </Link>
                        {(post.status === "DRAFT" ||
                          post.status === "REJECTED") && (
                          <Link
                            href={`/dashboard/blog/${post.id}/edit`}
                            className="text-white/55 hover:text-moz-teal"
                          >
                            Editar
                          </Link>
                        )}
                        {post.status === "PUBLISHED" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-white/55 hover:text-moz-teal"
                          >
                            Ver no site
                          </Link>
                        )}
                        {post.status !== "PUBLISHED" &&
                          post.status !== "PENDING" && (
                            <ActionButton
                              action={deletePostAction.bind(null, post.id)}
                              label="Apagar"
                              pendingLabel="…"
                              className="text-red-400/90 hover:text-red-300"
                            />
                          )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Pagination
        page={safePage}
        totalPages={totalPages}
        basePath={listBase}
      />
    </div>
  );
}
