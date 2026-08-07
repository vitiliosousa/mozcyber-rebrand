import {
  approvePostAction,
  deletePostAction,
  unpublishPostAction,
} from "@/lib/actions";
import RejectPostForm from "@/components/blog/RejectPostForm";
import ActionButton from "@/components/ui/ActionButton";
import Pagination, { parsePage } from "@/components/ui/Pagination";
import { BLOG_CATEGORIES } from "@/lib/blog";
import { prisma } from "@/lib/prisma";
import type { PostStatus, Prisma } from "@prisma/client";
import Link from "next/link";

const PER_PAGE = 10;
const PENDING_PER_PAGE = 10;

const statusLabel: Record<string, string> = {
  DRAFT: "Rascunho",
  PENDING: "Em revisão",
  PUBLISHED: "Publicado",
  REJECTED: "Rejeitado",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    pendingPage?: string;
    status?: string;
    category?: string;
    q?: string;
  }>;
};

export default async function AdminBlogPage({ searchParams }: Props) {
  const sp = await searchParams;
  const page = parsePage(sp.page);
  const pendingPage = parsePage(sp.pendingPage);
  const status = (sp.status || "").trim() as PostStatus | "";
  const category = (sp.category || "").trim();
  const q = (sp.q || "").trim();

  const pendingWhere: Prisma.PostWhereInput = {
    status: "PENDING",
    deletedAt: null,
  };
  const pendingTotal = await prisma.post.count({ where: pendingWhere });
  const pendingPages = Math.max(1, Math.ceil(pendingTotal / PENDING_PER_PAGE));
  const safePendingPage = Math.min(pendingPage, pendingPages);

  const pending = await prisma.post.findMany({
    where: pendingWhere,
    orderBy: { updatedAt: "desc" },
    skip: (safePendingPage - 1) * PENDING_PER_PAGE,
    take: PENDING_PER_PAGE,
    include: { author: { select: { name: true, email: true } } },
  });

  const where: Prisma.PostWhereInput = {
    deletedAt: null,
    ...(status ? { status } : {}),
    ...(category ? { category } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
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
    include: { author: { select: { name: true, email: true } } },
  });

  const listParams = new URLSearchParams();
  if (status) listParams.set("status", status);
  if (category) listParams.set("category", category);
  if (q) listParams.set("q", q);
  const listQs = listParams.toString();
  const listBase = listQs ? `/admin/blog?${listQs}` : "/admin/blog";

  return (
    <div>
      <h1 className="text-3xl md:text-4xl">Artigos</h1>
      <p className="mt-3 text-moz-muted">
        Revisa, publica, despublica ou apaga artigos da comunidade.
      </p>
      <Link
        href="/admin/blog/trash"
        className="mt-3 inline-block text-sm text-white/50 hover:text-moz-teal"
      >
        Ver lixeira →
      </Link>

      <h2 className="mt-10 text-xl text-moz-teal">
        Pendentes ({pendingTotal})
      </h2>
      <ul className="mt-4 border-t border-white/10">
        {pending.length === 0 && (
          <li className="py-8 text-moz-muted">Nada por rever.</li>
        )}
        {pending.map((post) => (
          <li key={post.id} className="border-b border-white/10 py-6">
            <p className="text-lg">{post.title}</p>
            <p className="mt-1 text-sm text-white/45">
              {post.author.name || post.author.email} · {post.category}
            </p>
            <p className="mt-3 line-clamp-2 text-sm text-white/55">
              {post.excerpt}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={`/dashboard/blog/${post.id}`}
                className="text-sm text-white/70 hover:text-moz-teal"
              >
                Preview
              </Link>
              <Link
                href={`/dashboard/blog/${post.id}/edit`}
                className="text-sm text-white/70 hover:text-moz-teal"
              >
                Editar
              </Link>
              <ActionButton
                action={approvePostAction.bind(null, post.id)}
                label="Aprovar"
                pendingLabel="A aprovar…"
                className="text-sm font-semibold text-moz-teal hover:text-white"
              />
              <ActionButton
                action={deletePostAction.bind(null, post.id)}
                label="Apagar"
                pendingLabel="A apagar…"
                className="text-sm text-red-400 hover:text-red-300"
              />
            </div>
            <RejectPostForm postId={post.id} />
          </li>
        ))}
      </ul>
      <Pagination
        page={safePendingPage}
        totalPages={pendingPages}
        basePath="/admin/blog"
        pageParam="pendingPage"
      />

      <h2 className="mt-12 text-xl">Todos os artigos</h2>
      <form
        method="get"
        className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end"
      >
        <input
          name="q"
          defaultValue={q}
          placeholder="Pesquisar…"
          className="rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm outline-none focus:border-moz-teal sm:w-48"
        />
        <select
          name="status"
          defaultValue={status}
          className="rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm outline-none focus:border-moz-teal"
        >
          <option value="" className="bg-[#0b0f14]">
            Todos os estados
          </option>
          {Object.entries(statusLabel).map(([k, v]) => (
            <option key={k} value={k} className="bg-[#0b0f14]">
              {v}
            </option>
          ))}
        </select>
        <select
          name="category"
          defaultValue={category}
          className="rounded-lg border border-white/15 bg-white/3 px-3 py-2 text-sm outline-none focus:border-moz-teal"
        >
          <option value="" className="bg-[#0b0f14]">
            Todas categorias
          </option>
          {BLOG_CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#0b0f14]">
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-moz-teal px-4 py-2 text-sm font-semibold text-[#0b0f14]"
        >
          Filtrar
        </button>
      </form>

      <ul className="mt-4 border-t border-white/10">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-3 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="text-base">{post.title}</p>
              <p className="mt-1 text-sm text-white/45">
                {statusLabel[post.status]} ·{" "}
                {post.author.name || post.author.email} · {post.views} views
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Link
                href={`/dashboard/blog/${post.id}`}
                className="text-white/60 hover:text-moz-teal"
              >
                Preview
              </Link>
              <Link
                href={`/dashboard/blog/${post.id}/edit`}
                className="text-moz-teal hover:text-white"
              >
                Editar
              </Link>
              {post.status === "PUBLISHED" ? (
                <ActionButton
                  action={unpublishPostAction.bind(null, post.id)}
                  label="Despublicar"
                  pendingLabel="…"
                  className="text-white/70 hover:text-moz-teal"
                />
              ) : (
                <ActionButton
                  action={approvePostAction.bind(null, post.id)}
                  label={post.status === "PENDING" ? "Aprovar" : "Publicar"}
                  pendingLabel="…"
                  className="text-moz-teal hover:text-white"
                />
              )}
              <ActionButton
                action={deletePostAction.bind(null, post.id)}
                label="Apagar"
                pendingLabel="…"
                className="text-red-400 hover:text-red-300"
              />
            </div>
          </li>
        ))}
      </ul>

      <Pagination page={safePage} totalPages={totalPages} basePath={listBase} />
    </div>
  );
}
