import RevealStagger from "@/components/animations/RevealStagger";
import CoverImage from "@/components/blog/CoverImage";
import Pagination, { parsePage } from "@/components/ui/Pagination";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const PER_PAGE = 9;

type Props = {
  page?: string;
};

export default async function BlogList({ page: pageParam }: Props) {
  const page = parsePage(pageParam);

  const total = await prisma.post.count({ where: { status: "PUBLISHED" } });
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    skip: (safePage - 1) * PER_PAGE,
    take: PER_PAGE,
    include: { author: { select: { name: true } } },
  });

  return (
    <section className="bg-[#0b0f14] pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {posts.length === 0 ? (
          <p className="text-moz-muted">Ainda não há artigos publicados.</p>
        ) : (
          <>
            <RevealStagger selector=":scope li" stagger={0.08} variant="list">
              <ul className="border-t border-white/10">
                {posts.map((post) => (
                  <li key={post.slug} className="border-b border-white/10">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="group grid gap-5 py-8 transition-colors md:grid-cols-[14rem_1fr] md:items-center md:gap-10 md:py-10"
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
                        </div>
                        <h2 className="mt-3 text-xl leading-snug transition-colors group-hover:text-moz-teal md:text-3xl">
                          {post.title}
                        </h2>
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 md:text-base">
                          {post.excerpt}
                        </p>
                        <p className="mt-3 text-sm text-white/40">
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
              basePath="/blog"
            />
          </>
        )}
      </div>
    </section>
  );
}
