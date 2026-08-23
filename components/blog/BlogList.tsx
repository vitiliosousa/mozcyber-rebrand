import RevealStagger from "@/components/animations/RevealStagger";
import CoverImage from "@/components/blog/CoverImage";
import Pagination, { parsePage } from "@/components/ui/Pagination";
import { BLOG_CATEGORIES, publishedWhere, readingTimeMinutes } from "@/lib/blog";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import type { Prisma } from "@prisma/client";

const PER_PAGE = 9;

type Props = {
  page?: string;
  q?: string;
  category?: string;
};

export default async function BlogList({ page: pageParam, q, category }: Props) {
  const page = parsePage(pageParam);
  const query = (q || "").trim();
  const activeCategory = BLOG_CATEGORIES.includes(
    (category || "") as (typeof BLOG_CATEGORIES)[number],
  )
    ? (category as string)
    : "";

  const where: Prisma.PostWhereInput = {
    ...publishedWhere,
    ...(activeCategory ? { category: activeCategory } : {}),
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
            { content: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const total = await prisma.post.count({ where });
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    where,
    orderBy: { publishedAt: "desc" },
    skip: (safePage - 1) * PER_PAGE,
    take: PER_PAGE,
    include: { author: { select: { id: true, name: true } } },
  });

  const params = new URLSearchParams();
  if (query) params.set("q", query);
  if (activeCategory) params.set("category", activeCategory);
  const qs = params.toString();
  const basePath = qs ? `/blog?${qs}` : "/blog";

  function categoryHref(cat: string) {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (cat) p.set("category", cat);
    const s = p.toString();
    return s ? `/blog?${s}` : "/blog";
  }

  return (
    <section className="bg-[#0b0f14] pb-12 md:pb-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <form
          method="get"
          className="mb-6 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end"
        >
          {activeCategory && (
            <input type="hidden" name="category" value={activeCategory} />
          )}
          <div className="flex-1">
            <label className="mb-1.5 block text-[11px] uppercase tracking-[0.2em] text-moz-muted">
              Pesquisar
            </label>
            <input
              name="q"
              defaultValue={query}
              placeholder="Título, tema…"
              className="w-full rounded-lg border border-white/12 bg-white/3 px-3.5 py-2.5 text-sm text-white outline-none focus:border-moz-teal"
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-moz-teal px-4 py-2.5 text-sm font-semibold text-[#0b0f14] hover:bg-white"
          >
            Pesquisar
          </button>
        </form>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href={categoryHref("")}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              activeCategory === ""
                ? "border-moz-teal bg-moz-teal text-[#0b0f14]"
                : "border-white/15 text-white/60 hover:border-moz-teal hover:text-moz-teal"
            }`}
          >
            Todos
          </Link>
          {BLOG_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={categoryHref(cat)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat
                  ? "border-moz-teal bg-moz-teal text-[#0b0f14]"
                  : "border-white/15 text-white/60 hover:border-moz-teal hover:text-moz-teal"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-moz-muted">
            {query || activeCategory
              ? "Nenhum artigo corresponde aos filtros."
              : "Ainda não há artigos publicados."}
          </p>
        ) : (
          <>
            <RevealStagger selector=":scope li" stagger={0.08} variant="list">
              <ul className="border-t border-white/10">
                {posts.map((post) => (
                  <li key={post.slug} className="border-b border-white/10">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid gap-4 py-6 transition-colors md:grid-cols-[12rem_1fr] md:items-center md:gap-8 md:py-7"
                    >
                      <div className="relative aspect-video overflow-hidden bg-white/5">
                        {post.image ? (
                          <CoverImage
                            src={post.image}
                            alt={post.title}
                            sizes="(max-width: 768px) 100vw, 224px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-moz-muted">
                          <time>
                            {(
                              post.publishedAt || post.createdAt
                            ).toLocaleDateString("pt-MZ", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </time>
                          <span className="text-xs uppercase tracking-[0.2em] text-moz-teal">
                            {post.category}
                          </span>
                          <span>{readingTimeMinutes(post.content)} min</span>
                        </div>
                        <h2 className="mt-2 text-lg leading-snug transition-colors group-hover:text-moz-teal md:text-2xl">
                          {post.title}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
                          {post.excerpt}
                        </p>
                        <p className="mt-2 text-sm text-white/40">
                          {post.author.name || "Mozcyber"}{" "}
                          <span className="text-moz-teal group-hover:text-white">
                            · Ler →
                          </span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </RevealStagger>

            <Pagination
              page={safePage}
              totalPages={totalPages}
              basePath={basePath}
            />
          </>
        )}
      </div>
    </section>
  );
}
